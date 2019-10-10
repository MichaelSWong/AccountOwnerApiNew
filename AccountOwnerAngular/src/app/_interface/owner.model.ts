import { Account } from './account.model';

export interface Owner {
  id: string;
  name: string;
  dateOfBirth: Date;
  address: string;
  hireDate: Date;
  terminationDate?: Date;

  accounts?: Account;
}
