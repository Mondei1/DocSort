import * as fs from "fs";
//import * as uuid from 'uuid';
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

       /45.rechnung_von_malediven_2019.png
    */
    //const docUUID = uuid.v4();
    const user = await User.findOne({where: {id: getUserIDFromJWT(req.headers.token.toString())}});
    const primaryNumber = await getNewPrimaryNumber();
    let theTags = JSON.parse(req.body.tags);
    console.log("tags provided:" + JSON.stringify(theTags));
    const document: Document = Document.create({
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

    // Example: ROOT/uploads/3_2.0.pdf
    await document.save();
    fs.writeFileSync(`./uploads/${document.uid}_${primaryNumber}.0_${document.title.replace(" ","_")}.${getFileExtension(req.file.originalname)}`, req.file.buffer);
    
    console.log("file written");
    res.status(200).send();
}