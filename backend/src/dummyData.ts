import { Document } from "./entity/document";
import { Tag } from "./entity/tag";
import { User } from "./entity/user";


export async function insertDummyData() {
    const user: User = await User.findOne({where: {username: "Mondei1"}});
    // 1. Document speichern
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
    doc1.title = "Rechnung TUI Flitterwochen 2019";
    doc1.note = "Rechnung von den Flitterwochen zu den Malediven (Fushifaru) Ende 2019";
    doc1.iv = "0A2wp3fgzhWquOlz";

    let tagRechnung = await Tag.create({name: "Rechnung"}).save();
    let tagReise = await Tag.create({name: "Reise"}).save();
    let tagMahnung = await Tag.create({name: "Mahnung"}).save();

    let doc1Tags = [];
    doc1Tags.push(tagRechnung, tagReise);

    doc1.tags = doc1Tags;
    doc1.mimeType = "image/png";
    doc1.ocrEnabled = false;
    doc1.createdAt = new Date();
    await doc1.save();
    console.log("doc1 saved");

    // 2. Document speichern
    let doc2 = new Document();
    doc2.primaryNumber = doc1.primaryNumber;
    doc2.secondaryNumber = doc1.secondaryNumber + 1;
    doc2.title = "Mahnung TUI";
    doc2.note = "Mahnung von TUI von den Flitterwochen zu den Malediven (Fushifaru) Ende 2019";
    doc2.ocrEnabled = false;
    doc2.user = user;
    doc2.iv = "yUlW6tqGiIG4Ms1K";
    let doc2Tags = [];
    doc2Tags.push(tagRechnung);
    doc2Tags.push(tagMahnung);
    doc2.tags = doc2Tags;
    doc2.mimeType = "image/png";
    doc2.createdAt = new Date();
    await doc2.save();
    console.log("doc2 saved");

}