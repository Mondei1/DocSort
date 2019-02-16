import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 32
    })
    username: string;

    @Column('text')
    password: string;

    @Column({
        type: 'varchar',
        length: 16
    })
    salt: string;

    @Column({
        type: 'tinyint',
        nullable: true
    })
    twoFA: boolean;

    @Column({
        type: 'varchar',
        length: 32,
        nullable: true
    })
    secret: string;

}