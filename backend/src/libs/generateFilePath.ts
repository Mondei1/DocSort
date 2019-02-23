import { Document } from '../entity/document';

export function generateFilePath(document: Document) {
    const filePath = `./uploads/${document.uid}_${document.primaryNumber}.${document.secondaryNumber}.${document.fileExtension}`;
    return filePath;
}