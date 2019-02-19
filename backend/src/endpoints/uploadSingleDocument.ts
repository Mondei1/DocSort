import * as fs from "fs";
import * as uuid from 'uuid';
import { Request, Response } from "express";
import { Document } from "../entity/document";
import { getNewPrimaryNumber, getUserIDFromJWT, getFileExtension } from "../libs/utils";
import { User } from "../entity/user";
import { Tag } from "../entity/tag";

export default async function uploadSingleDocument(req: Request, res: Response) {
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
    const docUUID = uuid.v4();
    const user = await User.findOne({where: {id: getUserIDFromJWT(req.headers.token.toString())}});
    const primaryNumber = await getNewPrimaryNumber()
    const document: Document = Document.create({
        uid: docUUID,
        primaryNumber: primaryNumber,
        title: req.body.title,
        note: req.body.note,
        user: user,
        tags: Tag.find({where: {id: req.body.tags}}),
        mimeType: req.file.mimetype,
        ocrEnabled: false,
        ocrFinished: false,
        ocrText: null
    });

    // Example: ROOT/uploads/52233e3f-8a34-4bf1-862c-065e0577ef42_5.2.pdf
    fs.writeFileSync(`./uploads/${docUUID}_${primaryNumber}.0.${getFileExtension(req.file.originalname)}`, req.file.buffer);
    await document.save();
    console.log("file written");
    res.status(200).send();
}