import { createConnection } from 'typeorm';
import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { User } from './entity/user';
import { isNullOrUndefined } from 'util';
import { makeRandomString, createPasswordHash, validateJWT } from './libs/utils';
import login from './endpoints/login';
import { insertDummyData } from './dummyData';
import uploadSingleDocument from './endpoints/uploadSingleDocument';
import { Document } from './entity/document';
import getDocumentMeta from './endpoints/getDocumentMeta';
import getDocument from './endpoints/getDocument';
import { Tag } from './entity/tag';
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

export interface TestParameters {
    testName: string,
    function: Function
}

const dummyUsers: Array<any> = [
    {
        username: "Mondei1",
        password: "pass"
    },
    {
        username: "spYro",
        password: "PASS"
    }
]

async function run() {
    // Delete storage at startup
    if (fs.existsSync("./database.db")) {
        fs.unlinkSync("./database.db");
    }

    // Create connection to SQLite database via TypeORM
    try {
        await createConnection();
    } catch (error) {
        console.log("There is an error while connection to SQLite database:", error)
    }

    // Create Express server
    const app = express();
    const server = http.createServer(app);
    app.use(bodyParser.json());
    app.use(cors());

    // Write dummy users into database
    for(let i = 0; i < dummyUsers.length; i++) {
        const dummy = dummyUsers[i];
        const salt: string = makeRandomString(16);
        const hashedPW = await createPasswordHash(dummy.password, salt);

        await User.create({
            username: dummy.username,
            password: hashedPW,
            salt: salt
        }).save();
    }

    await insertDummyData();

    // Register routes
    app.post('/login', login);
    app.post('/uploadSingleDocument', validateJWT, upload.single('singleDocument'), uploadSingleDocument);
    app.get('/getDocumentMeta/:docID', validateJWT, getDocumentMeta);
    app.get('/getDocument/:docID', validateJWT, getDocument);
    app.get('/getAllDocuments', validateJWT, async (req, res) => res.status(200).send(await Document.find()));
    app.get('/getAllTags', validateJWT, async (req, res) => res.status(200).send(await Tag.find()));
    
    // Start server
    server.listen(9090, () => {
        console.log("Server started on port 9090!");
    });
}

console.log("DocSort is starting, please stand by ...");
run();