import * as fs from "fs";

export default async function uploadSingleDocument(req: any, res: any) {
    console.log("uploadDocument wurde aufgerufen");
    /*Attribute von req.file:
       - fieldname
       - originalname
       - encoding
       - mimetype
       - buffer
       - size
    */
    fs.writeFileSync(`./${req.file.originalname}`, req.file.buffer);
    console.log("file written");
}