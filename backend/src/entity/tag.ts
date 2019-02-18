import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from "typeorm";
import { Document } from './document';

@Entity('tag')
export class Tag extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    colorBackground?: string;

    @Column({ nullable: true })
    colorForeground?: string;

    @Column({ nullable: true })
    logo?: string;

    @ManyToMany(type => Document, document => document.tags)
    documents: Promise<Document[]>;

}