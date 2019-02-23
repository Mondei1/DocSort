import { Document } from "./entity/document";
import { Tag } from "./entity/tag";
import { User } from "./entity/user";
import { createRandomString } from "./libs/createRandomString";
import { createPasswordHash } from "./libs/createPasswordHash";


export async function insertDummyData() {
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
    // Write dummy users into database
    for(let dummyUser of dummyUsers) {
        const salt: string = createRandomString(16);
        const hashedPW: string = await createPasswordHash(dummyUser.password, salt);

        await User.create({
            username: dummyUser.username,
            password: hashedPW,
            salt: salt
        }).save();
    }
    const user: User = await User.findOne({where: {username: "Mondei1"}});
    // 1. save document
    let highestDoc = await Document.findOne({
        select: ["primaryNumber"],
        order: { primaryNumber: "DESC" }
    })
    let doc1 = new Document();
    if(highestDoc == null) {
        doc1.primaryNumber = 1;
    } else {
        doc1.primaryNumber = highestDoc.primaryNumber + 1;
    }
    doc1.secondaryNumber = 1;
    doc1.user = user;
    doc1.fileExtension = "png";
    doc1.title = "Rechnung TUI Flitterwochen 2019";
    doc1.note = "Rechnung von den Flitterwochen zu den Malediven (Fushifaru) Ende 2019";
    // CRYPT: doc1.iv = "0A2wp3fgzhWquOlz";

    let tagRechnung = await Tag.create({name: "Rechnung"}).save();
    let tagReise = await Tag.create({name: "Reise"}).save();
    let tagMahnung = await Tag.create({name: "Mahnung"}).save();

    let doc1Tags = [];
    doc1Tags.push(tagRechnung, tagReise);

    let tags1 = await doc1.tags;
    tags1 = doc1Tags;
    doc1.mimeType = "image/png";
    await doc1.save();

    // 2. Document speichern
    let doc2 = new Document();
    doc2.primaryNumber = doc1.primaryNumber;
    doc2.secondaryNumber = doc1.secondaryNumber + 1;
    doc2.fileExtension = "png";
    doc2.title = "Mahnung TUI";
    doc2.note = "Mahnung von TUI von den Flitterwochen zu den Malediven (Fushifaru) Ende 2019";
    doc2.user = user;
    // CRYPT: doc2.iv = "yUlW6tqGiIG4Ms1K";
    let doc2Tags = [];
    doc2Tags.push(tagRechnung);
    doc2Tags.push(tagMahnung);
    let tags2 = await doc2.tags;
    tags2 = doc2Tags;
    doc2.mimeType = "image/png";
    await doc2.save();
}