import * as crypto from 'crypto';

export function encryptDocument(document: Buffer, password: string, iv: string): Buffer {
    console.log("iv=", iv);
    let key = crypto.createHash('sha256').update(password).digest('hex').substr(0, 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const crypted = Buffer.concat([cipher.update(document), cipher.final()]);
    return crypted;
}