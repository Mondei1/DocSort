import { Document } from "../entity/document";

export default async function getDocumentMeta(req: any, res: any) {
    const docID: number = req.params.docID;
    if(docID == null) {
        res.status(400).send();
        return;
    }

    const doc: Document = await Document.findOne({
        relations: ['tags'],
        where: {
            uid: docID
        }
    });
    res.status(200).send(doc);
}