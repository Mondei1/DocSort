import * as fs from "fs";
import { Request, Response } from "express";
import { Document } from "../entity/document";
import { User } from "../entity/user";
import { Tag } from "../entity/tag";
import { getNewPrimaryNumber } from "../libs/getNewPrimaryNumber";
import { getUserIDFromJWT } from "../libs/getUserIDFromJWT";
import { extractFileExtension } from "../libs/extractFileExtension";
import { encryptDocument } from "../libs/encryptDocument";
import { createRandomString } from "../libs/createRandomString";

interface IRequestTag {
    name: string;
    logo?: string;
    colorForeground?: string;
    colorBackground?: string;
}

interface IRequestBody {
    title: string;
    note: string;
    tags: Array<IRequestTag|number>;
}

export default async function uploadSingleDocument(req: Request, res: Response) {
    try {
        console.log("uploadDocument wurde aufgerufen");
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads");
        }
        /*Attribute von req.file:
           - fieldname
           - originalname
           - encoding
           - mimetype
           - buffer
           - size
        */
        const userId = getUserIDFromJWT(req.headers.token.toString());
        const user = await User.findOne({ where: { id: userId }});
        const primaryNumber = await getNewPrimaryNumber();
        // CRYPT: const iv = makeRandomString(16);

        const requestBody: IRequestBody = req.body;
        const file: Express.Multer.File = req.file;

        const document: Document = new Document();
        document.primaryNumber = primaryNumber;
        document.secondaryNumber = 0;

        // Early saving, so we can access the "id" and the "primaryNumber" is reserved
        await document.save();
        document.title = requestBody.title;
        document.note = requestBody.note;
        document.user = user;
        // CRYPT: document.iv = iv;
        document.mimeType = req.file.mimetype;
        document.ocrEnabled = false;
        document.ocrFinished = false;
        document.ocrText = null;

        // Setting up TAGs
        let documentTags = await document.tags;
        if(requestBody.tags != null) {
            for (const tag of requestBody.tags) {
                if(typeof tag == "number") {
                    let existingTag = await Tag.findOne({ where: { id: tag }});
                    if(existingTag != null) {
                        documentTags.push(existingTag);
                    }
                } else {
                    let newTag = new Tag();
                    newTag.name = tag.name;
                    newTag.logo = tag.logo;
                    newTag.colorBackground = tag.colorBackground;
                    newTag.colorForeground = tag.colorForeground;
                    let tagUser = await newTag.user;
                    tagUser = user;
                    await newTag.save();
                    documentTags.push(newTag);
                }
            }
        }
        
        await document.save();

        // Example: ROOT/uploads/3_2.0.dse
        //await document.save();

        // Encrypt document
        // CRYPT: fs.writeFileSync(`./uploads/${document.uid}_${primaryNumber}.0.dse`, encryptDocument(req.file.buffer, "123Secret", iv));
        fs.writeFileSync(`./uploads/${document.uid}_${primaryNumber}.${extractFileExtension(req.file.originalname)}`, req.file.buffer);
        
        console.log("file written");
        res.status(200).send({
            newID: document.uid
        });
    } catch(err) {
        res.status(500).send({message: "Please see console output for error message."});
        console.error(err);
    }
}