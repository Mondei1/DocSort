import login from "../endpoints/login";
import uploadSingleDocument from "../endpoints/uploadSingleDocument";
import getDocumentMeta from "../endpoints/getDocumentMeta";
import getDocument from "../endpoints/getDocument";
import { Tag } from "../entity/tag";
import { Document } from '../entity/document';
import { validateJWT } from "./validateJwt";
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

export function registerExpressRoutes(app) {
    app.get('/login', login);
    app.post('/uploadSingleDocument', validateJWT, upload.single('singleDocument'), uploadSingleDocument);
    app.get('/getDocumentMeta/:docID', validateJWT, getDocumentMeta);
    app.get('/getDocument/:docID', validateJWT, getDocument);
    app.get('/getAllDocuments', validateJWT, async (req, res) => res.status(200).send(await Document.find()));
    app.get('/getAllTags', validateJWT, async (req, res) => res.status(200).send(await Tag.find()));
}