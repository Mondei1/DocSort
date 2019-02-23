import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Document } from './document';
import { Tag } from "./tag";

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Document, document => document.user)
    documents: Document[];

    @OneToMany(type => Tag, tag => tag.user)
    tags: Promise<Tag[]>;

}