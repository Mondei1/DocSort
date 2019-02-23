import * as mime from 'mime-types';

/**
 * Returns mime type of any file, If not in database it's named "unknown".
 * @param fileName Filename or path of target file.
 */
export function getMimeType(fileName: string): string {
    const mimeType = mime.lookup(fileName);
    if(mimeType == "false") {
        return "unknown";
    }
    return mimeType.toString();
}