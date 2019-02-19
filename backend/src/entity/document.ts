import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, ManyToOne, PrimaryColumn, CreateDateColumn } from "typeorm";
import { Tag } from './tag';
import { User } from "./user";

@Entity('document')
export class Document extends BaseEntity {

    @PrimaryColumn({
        type: 'varchar',
        length: 36
    })
    uid: string;

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
    mimeType: string;

    // OCR
     @Column()
    ocrEnabled: boolean;

    @Column({ nullable: true })
    ocrFinished?: boolean;

    @Column({ nullable: true })
    ocrText?: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn({ nullable: true })
    updatedAt?: Date;

}