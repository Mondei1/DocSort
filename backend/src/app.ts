import { createConnection } from 'typeorm';
import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { User } from './entity/user';
import { isNullOrUndefined } from 'util';
import { makeSalt, createPasswordHash } from './libs/utils';
import login from './endpoints/login';
import { insertDummyData } from './dummyData';

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

    // Write dummy users into database
    for(let i = 0; i < dummyUsers.length; i++) {
        const dummy = dummyUsers[i];
        const salt: string = makeSalt(16);
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
    
    // Start server
    server.listen(9090, () => {
        console.log("Server started on port 9090!");
    });
}

console.log("DocSort is starting, please stand by ...");
run();