import { createContext, useContext, useState } from 'react';

// utils
import {
  UserProps,
  DefaultContextProps,
  DefaultProviderProps,
  CompanyProps,
  UnitProps,
} from '@/types';

const contextDefaultValues: DefaultContextProps = {
  users: [],
  companies: [],
  units: [],
  handleUsers: () => null,
  handleCompanies: () => null,
  handleUnits: () => null,
};

const DefaultContext = createContext<DefaultContextProps>(contextDefaultValues);

export function useDefault() {
  return useContext(DefaultContext);
}

export function DefaultProvider({ children }: DefaultProviderProps) {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [units, setUnits] = useState<UnitProps[]>([]);

  const handleUsers = (value: UserProps[]) => {
    setUsers(value);
  };

  const handleCompanies = (value: CompanyProps[]) => {
    setCompanies(value);
  };

  const handleUnits = (value: UnitProps[]) => {
    setUnits(value);
  };

  const value = {
    users,
    companies,
    units,
    handleUsers,
    handleCompanies,
    handleUnits,
  };

  return (
    <DefaultContext.Provider value={value}>{children}</DefaultContext.Provider>
  );
}
