interface Mark {
  text: string;
}

export type AccountType = 'Local' | 'LDAP';

export interface Account {
  id: string;
  marks: Mark[];
  type: AccountType;
  login: string;
  password: string | null;
}

export interface LocalAccount {
  id: string;
  marks: string;
  type: AccountType;
  login: string;
  password: string;
}
