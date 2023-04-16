import { ReactNode } from 'react';

export type DefaultProviderProps = { children: ReactNode };

export interface DefaultContextProps {
  users: UserProps[];
  handleUsers: (value: UserProps[]) => void;
}

export interface UserProps {
  id: number;
  name: string;
  email: string;
  unitId: number;
  companyId: number;
}

export interface HomeProps {
  users: UserProps[];
}
