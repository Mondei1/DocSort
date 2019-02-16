import { createConnection } from 'typeorm';
import * as express from 'express';
import * as http from 'http';
import * as crypto from 'crypto';
import { User } from './entity/user';
import { isNullOrUndefined } from 'util';

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

function makeSalt(len: number): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*'?`´|-_.:,;äöüÖÄÜ!§$%&/\()=?";
  
    for (var i = 0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

async function run() {
    // Create connection to SQLite database via TypeORM
    await createConnection().catch((err) => {
        console.log("There is an error while connection to SQLite database:", err)
    });

    // Create Express server
    const app = express();
    const server = http.createServer(app);

    // Write dummy users into database
    for(let i = 0; i < dummyUsers.length; i++) {
        const dummy = dummyUsers[i];
        const salt: string = makeSalt(16);
        crypto.scrypt(dummy.password, salt, 64, (err, key) => {
            if(err) throw err;
            const finalKey = key.toString('base64');
            console.log(`Password hash for user ${dummy.user} is now ${finalKey}`);

            User.create({
                username: dummy.username,
                password: finalKey,
                salt: salt
            }).save()
        })
    }

    // Register routes
    app.get('login', async (req, res) => {
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
        

    })
    
    // Start server
    server.listen(9090, () => {
        console.log("Server started on port 9090!")
    })
}

console.log("DocSort is starting, please stand by ...")
run();