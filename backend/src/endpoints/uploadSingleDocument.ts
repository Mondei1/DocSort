import * as fs from "fs";
import { Request, Response } from "express";
import { Document } from "../entity/document";
import { getNewPrimaryNumber, getUserIDFromJWT, getFileExtension } from "../libs/utils";
import { User } from "../entity/user";
import { Tag } from "../entity/tag";
import { isUndefined, isNullOrUndefined } from "util";

interface IRequest {
    existing: boolean,
    value?: number,
    name?: string,
    fg?: string,
    bg?: string
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
        //const docUUID = uuid.v4();
        const user = await User.findOne({where: {id: getUserIDFromJWT(req.headers.token.toString())}});
        const primaryNumber = await getNewPrimaryNumber();
    
        // Get tag database references
        let tagRefs: Tag[] = [];
        const givenTags: Array<IRequest> = JSON.parse(req.body.tags);
        for(let i = 0; i < givenTags.length; i++) {
            const currentTag: IRequest = givenTags[i];
            console.log(currentTag)

            // Create tag If 'existing' is false
            if(!currentTag.existing) {
                // Just double check If tag exist already. (the user can lie always)
                console.log("Create", currentTag.name)
                const newTag = await Tag.create({
                    name: currentTag.name,
                    colorBackground: currentTag.bg,
                    colorForeground: currentTag.fg
                }).save();
                tagRefs.push(await Tag.findOne({where: {id: newTag.id}}));
            }
            tagRefs.push(await Tag.findOne({where: {id: currentTag.value}}));
        }
        console.log(tagRefs);
    
        const document: Document = Document.create({
            primaryNumber: primaryNumber,
            title: req.body.title,
            note: req.body.note,
            user: user,
            tags: tagRefs,
            mimeType: req.file.mimetype,
            ocrEnabled: false,
            ocrFinished: false,
            ocrText: null
        });
    
        // Example: ROOT/uploads/3_2.0.pdf
        await document.save();
        fs.writeFileSync(`./uploads/${document.uid}_${primaryNumber}.0_${document.title.replace(" ","_")}.${getFileExtension(req.file.originalname)}`, req.file.buffer);
        
        console.log("file written");
        res.status(200).send({
            newID: document.uid
        });
    } catch(err) {
        res.status(500).send({message: "Please see console output for error message."});
        console.error(err);
    }
}