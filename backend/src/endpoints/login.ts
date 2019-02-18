import { Request, Response } from "express";
import { isNullOrUndefined } from "util";
import { User } from "../entity/user";
import { createPasswordHash } from "../libs/utils";
import * as jwt from 'jsonwebtoken';

export default async function login(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;

    // Check if username and password are given.
    if(isNullOrUndefined(username) && isNullOrUndefined(password)) {
        res.status(400).send();
    }

    // Get user from db
    const user: User = await User.findOne({
        where: {
            username: username
        }
    })
    const hashedPassword = await createPasswordHash(password, user.salt);
    if(user.password == hashedPassword) {
        // Password given from user is correct
        console.log(`User ${username} is now logged in.`);

        const jwtBody = {
            userID: user.id
        }
        const jsonWebToken = jwt.sign(jwtBody, 'someSecretITellYou', {expiresIn: '1d'});
        res.status(200).send({
            jwt: jsonWebToken
        });
    } else {
        res.status(401).send();
    }
}