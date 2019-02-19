import * as crypto from 'crypto';

/**
 * This function creates an random string.
 * @param len Length of random string
 */
export function makeSalt(len: number): string {
    var salt = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*'?`´|-_.:,;äöüÖÄÜ!§$%&/\()=?";

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
        console.log("Hashing Password, please wait ...");
        let computedHash: string = "";
        const hashRounds = 35;
        crypto.scrypt(password, salt, 64, (err, key) => {
            if(err) reject(err);
            computedHash = key.toString('base64');
            for(let x = 0; x < hashRounds; x++) {
                try {
                    computedHash = crypto.scryptSync(computedHash, salt, 64).toString('base64');
                    console.log("Hash", x, ":\t", computedHash);
                } catch(err) {
                    reject(err);
                }
            }
            console.log("Fertig:", computedHash);
            resolve(computedHash);
            //resolve(key.toString('base64'));
        })
    })
}