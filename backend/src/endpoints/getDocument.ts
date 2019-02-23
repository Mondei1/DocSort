import { Document } from "../entity/document";
import * as fs from 'fs';
//import { decryptDocument } from "../libs/utils";

export default async function getDocument(req: any, res: any) {
    const docID: number = req.params.docID;
    if(docID == null) {
        res.status(400).send();
        return;
    }

    const doc: Document = await Document.findOne({ where: { uid: docID }, relations: ['tags']});
    //const secondaryNumber = doc.secondaryNumber == null ? 0: doc.secondaryNumber;
    //const encryptedDocument = readFileSync(`./uploads/${doc.uid}_${doc.primaryNumber}.${secondaryNumber}.dse`);
    const docFile = fs.readFileSync(`./uploads/${doc.uid}_${doc.primaryNumber}.${doc.secondaryNumber}.dse`);
    //const finalDoc = decryptDocument(encryptedDocument, "123Secret", doc.iv);
    res.status(200).send(docFile);
}