import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, ManyToOne } from "typeorm";
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

    @Column()
    title: string;

    @Column({ nullable: true })
    note?: string;

    @ManyToOne(type => User, user => user.documents)
    user: User;

    @ManyToMany(type => Tag, tag => tag.documents)
    @JoinTable()
    tags: Promise<Tag[]>;

    @Column()
    fileExtension: string;

    // OCR
     @Column()
    ocrEnabled: boolean;

    @Column({ nullable: true })
    ocrFinished?: boolean;

    @Column({ nullable: true })
    ocrText?: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt?: Date;

}