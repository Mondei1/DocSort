import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import { Tag } from './tag';

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