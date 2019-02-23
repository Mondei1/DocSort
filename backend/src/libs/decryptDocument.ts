import * as crypto from 'crypto';

export function decryptDocument(document: Buffer, password: string, iv: string): Buffer {
    let key = crypto.createHash('sha256').update(password).digest('hex').substr(0, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(document), decipher.final()]);
    return decrypted;
}