interface Mark {
  text: string;
}

interface Data {
  type: AccountType;
  login: string;
  password: string | null;
}
export type AccountType = 'Локальная' | 'LDAP';

export interface AccountData extends Data {
  marks: Mark[];

}

export interface InputAccountData extends Data {
  marks: string;
}

export interface Account {
  id: string;
  data?: AccountData;
}
