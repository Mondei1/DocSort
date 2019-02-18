import * as crypto from 'crypto';

export function makeSalt(len: number): string {
    var salt = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*'?`´|-_.:,;äöüÖÄÜ!§$%&/\()=?";

    for (var i = 0; i < len; i++)
        salt += possible.charAt(Math.floor(Math.random() * possible.length));

    return salt;
}

export function createPasswordHash(password: string, salt: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (err, key) => {
            if(err) reject(err);
            resolve(key.toString('base64'));
        })
    })
}