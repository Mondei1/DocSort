import { isNullOrUndefined } from "util";
import { Document } from "../entity/document";

export default async function getDocumentMeta(req: any, res: any) {
    const docID: number = req.params.docID;
    if(isNullOrUndefined(docID)) {
        res.status(400).send();
        return;
    }

    const doc: Document = await Document.findOne({where: {uid: docID}}, {relations: ['tags']});
    res.status(200).send(doc);
}