import { Column, Entity } from 'typeorm';
import EntityBase from './EntityBase';

@Entity()
export default class Account extends EntityBase {
    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
