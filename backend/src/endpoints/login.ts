import { Request, Response } from "express";
import { User } from "../entity/user";
import { createPasswordHash } from "../libs/utils";
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export default async function login(req: Request, res: Response) {
    const username = req.header("username");
    const password = req.header("password");

    // Check if username and password are given.
    if(username == null || password == null) {
        res.status(400).send();
        return;
    }

    // Get user from db
    const user: User = await User.findOne({
        where: {
            username: username
        }
    })
    const hashedPassword = await createPasswordHash(password, user.salt);
    if(user.password == hashedPassword) {
        console.log(`User ${username} is now logged in.`);

        const jwtBody = {
            userID: user.id
        }
        const jsonWebToken = jwt.sign(jwtBody, config.secretJWT, {expiresIn: '7d'});
        res.status(200).send({
            jwt: jsonWebToken
        });
        return;
    }
    res.status(401).send();
}