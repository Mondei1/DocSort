import * as jwt from 'jsonwebtoken';

/**
 * Decodes a JWT token and returns user id.
 * @param jsonwebtoken JWT of target user to get id from
 */
export function getUserIDFromJWT(jsonwebtoken: string): number {
    const decoded = jwt.decode(jsonwebtoken, {complete: true, json: true});
    return decoded['userID'];
}