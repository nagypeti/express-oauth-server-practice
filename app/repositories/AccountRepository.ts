import { EntityRepository, Repository } from 'typeorm';
import Account from '../entities/Account';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
    findByEmail(email: string) {
        return this.findOne({ email });
    }
}