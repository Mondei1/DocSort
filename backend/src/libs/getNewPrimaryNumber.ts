import { Document } from '../entity/document';

/**
 * Scans all documents and returns the highest primary number plus one. 
 */
export async function getNewPrimaryNumber() {
    let { primaryNumber } = await Document.findOne({
        select: ["primaryNumber"],
        order: { primaryNumber: "DESC" }
    });
    return primaryNumber + 1;
}