import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, ManyToOne, CreateDateColumn } from "typeorm";
import { Tag } from './tag';
import { User } from "./user";

@Entity('document')
export class Document extends BaseEntity {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    primaryNumber: number;

    @Column({ nullable: true })
    secondaryNumber?: number;

    @Column({ nullable: true })
    title?: string;

    @Column({ nullable: true })
    note?: string;

    @ManyToOne(type => User, user => user.documents)
    user: User;

    @ManyToMany(type => Tag, tag => tag.documents)
    @JoinTable()
    tags: Promise<Tag[]>;

    @Column({ nullable: true })
    mimeType?: string;

    /* CRYPT: @Column({
        type: 'varchar',
        length: 16
    })
    iv: string;*/

    // OCR
     @Column({ nullable: true })
    ocrEnabled?: boolean;

    @Column({ nullable: true })
    ocrFinished?: boolean;

    @Column({ nullable: true })
    ocrText?: string;

    /*@CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;*/

}