import { Column, PrimaryGeneratedColumn } from 'typeorm';

export default abstract class EntityBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('timestamp', { default: (): string => 'LOCALTIMESTAMP' })
    created: Date;

    @Column('timestamp', { default: (): string => 'LOCALTIMESTAMP' })
    modified: Date;
}
