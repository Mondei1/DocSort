import { createConnection } from 'typeorm';
import * as fs from 'fs';
import { insertDummyData } from './dummyData';
import { registerExpressRoutes } from './libs/registerExpressRoutes';
import { createExpressServer } from './libs/createExpressServer';

async function run() {
    console.log("DocSort is starting, please stand by ...");

    if (fs.existsSync("./database.db")) {
        fs.unlinkSync("./database.db");
    }
    console.log("- database cleaned");

    if (!fs.existsSync("./uploads")) {
        fs.mkdirSync("./uploads");
    }
    console.log("- uploads-folder existing");
    
    // Create connection to SQLite database via TypeORM
    try {
        await createConnection();
    } catch (error) {
        console.log("There is an error while connection to SQLite database:", error)
    }
    console.log("- connected to database");

    // Create Express server
    const { app, server } = createExpressServer();

    await insertDummyData();
    console.log("- dummydata inserted");

    // Register routes
    registerExpressRoutes(app);
    console.log("- routes registered");

    // Start server
    server.listen(9090, () => {
        console.log("- Server started on port 9090!");
        console.log("DocSort is ready to use");
    });  
}
run();