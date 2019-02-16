import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('document')
export class Document extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100
    })
    title: string;

    @Column('simple-array')
    tags: Array<string>;

    @Column('text')
    file: string;

    // File
    @Column('blob')
    originalFile: Buffer;
    
    @Column('blob')
    thumbnail: Buffer;

    // Meta
    @Column({
        type: 'varchar',
        length: 255
    })
    filename: string;

    @Column({
        type: 'varchar',
        length: 8
    })
    fileExtension: string;

    @Column({
        type: 'varchar',
        length: 30
    })
    contentType: string;

    @Column({
        type: 'tinyint'
    })
    ocrEnabled: boolean;

    @Column({
        type: 'tinyint'
    })
    ocrFinished: boolean;

}