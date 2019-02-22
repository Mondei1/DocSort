import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as mime from 'mime-types';
import { config } from '../config';
import { Request, Response } from 'express';
import { isNullOrUndefined } from 'util';
import { Document } from '../entity/document';

/**
 * This function creates an random string.
 * @param len Length of random string
 */
export function makeRandomString(len: number): string {
    var salt = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
        salt += possible.charAt(Math.floor(Math.random() * possible.length));

    return salt;
}

/**
 * This function creates a hash of a given password and salt.
 * This takes about 1.3sek to complete because of 35 hash iterations. 
 * @param password Password to hash
 * @param salt String that get's appended at password
 */
export function createPasswordHash(password: string, salt: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        process.stdout.write("Hashing Password: ");
        let computedHash: string = "";
        const hashRounds = 2;
        crypto.scrypt(password, salt, 64, (err, key) => {
            if(err) reject(err);
            computedHash = key.toString('base64');
            for(let x = 0; x < hashRounds; x++) {
                try {
                    computedHash = crypto.scryptSync(computedHash, salt, 64).toString('base64');
                    //console.log("Hash", x, ":\t", computedHash);
                    process.stdout.write(`${x}.`);
                } catch(err) {
                    reject(err);
                }
            }
            console.log("\r\nFertig:", computedHash);
            resolve(computedHash);
            //resolve(key.toString('base64'));
        })
    })
}

/**
 * Express Middleware to validate user jwt-keys
 */
export function validateJWT(req: Request, res: Response, next: Function): boolean | void {
    if(isNullOrUndefined(req.headers.token)) {
        res.status(401).send({error: "Sorry, but you forgot to give me your token."});
        return false;
    }
    try {
        jwt.verify(req.headers.token.toString(), config.secretJWT);
        next(); // Token is vaild.
    } catch(err) {
        if(err) console.error(err);
        res.status(401).send({error: "Sorry, but your token you gave me is not vaild."})
    }
}

/**
 * Decodes a JWT token and returns user id.
 * @param jsonwebtoken JWT of target user to get id from
 */
export function getUserIDFromJWT(jsonwebtoken: string): number {
    const decoded = jwt.decode(jsonwebtoken, {complete: true, json: true});
    return decoded['userID'];
}

/**
 * Returns file extension of any filename.
 * @param fileName Filename or path of target file.
 */
export function getFileExtension(fileName: string): string {
    return fileName.split(".").pop();
}

/**
 * Returns mime type of any file, If not in database it's named "unknown".
 * @param fileName Filename or path of target file.
 */
export function getMimeType(fileName: string): string {
    const mimeType = mime.lookup(fileName);
    if(mimeType != "false") return mimeType.toString();
    else return "unknown";
}

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

export function encryptDocument(document: Buffer, password: string, iv: string): Buffer {
    console.log("iv=", iv);
    let key = crypto.createHash('sha256').update(password).digest('hex').substr(0, 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const crypted = Buffer.concat([cipher.update(document), cipher.final()]);
    return crypted;
}

export function decryptDocument(document: Buffer, password: string, iv: string): Buffer {
    let key = crypto.createHash('sha256').update(password).digest('hex').substr(0, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(document), decipher.final()]);
    return decrypted;
}