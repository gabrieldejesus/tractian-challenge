import { ReactNode } from 'react';

export type DefaultProviderProps = { children: ReactNode };

export interface DefaultContextProps {
  users: UserProps[];
  companies: CompanyProps[];
  units: UnitProps[];
  handleUsers: (value: UserProps[]) => void;
  handleCompanies: (value: CompanyProps[]) => void;
  handleUnits: (value: UnitProps[]) => void;
}

export interface UserProps {
  id: number;
  name: string;
  email: string;
  unitId: number;
  companyId: number;
}

export interface CompanyProps {
  id: number;
  name: string;
}

export interface UnitProps {
  companyId: number;
  id: number;
  name: string;
}

export interface HomeProps {
  users: UserProps[];
  companies: CompanyProps[];
  units: UnitProps[];
}
