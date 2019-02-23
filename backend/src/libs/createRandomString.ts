/**
 * This function creates an random string.
 * @param len Length of random string
 */
export function createRandomString(length: number): string {
    let salt = "";
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        salt += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));

    return salt;
}