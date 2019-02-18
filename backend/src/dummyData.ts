import { Document } from "./entity/document";
import { Tag } from "./entity/tag";


export async function insertDummyData() {
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
    doc1.title = "Rechnung TUI Flitterwochen 2019";
    doc1.note = "Rechnung von den Flitterwochen zu den Malediven (Fushifaru) Ende 2019";

    let tagRechnung = await Tag.create({name: "Rechnung"}).save();
    let tagReise = await Tag.create({name: "Reise"}).save();

    let existingTags = await doc1.tags;
    existingTags.push(tagRechnung, tagReise);

    doc1.fileExtension = "png";
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
    let doc2Tags = await doc2.tags;
    doc2Tags.push(await Tag.findOne({name: "Reise"}));
    doc2Tags.push(await Tag.create({name: "Mahnung"}).save());
    doc2.fileExtension = "png";
    doc2.createdAt = new Date();
    await doc2.save();
    console.log("doc2 saved");

}