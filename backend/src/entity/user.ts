import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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

    /*@Column()
    twoFA: boolean;

    @Column()
    secret?: string;*/

}