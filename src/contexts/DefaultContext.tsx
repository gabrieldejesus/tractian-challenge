import { createContext, useContext, useState } from 'react';

// utils
import {
  UserProps,
  DefaultContextProps,
  DefaultProviderProps,
  CompanyProps,
  UnitProps,
  WorkorderProps,
} from '@/types';

const contextDefaultValues: DefaultContextProps = {
  users: [],
  companies: [],
  units: [],
  modalSelected: '',
  workorders: [],
  handleUsers: () => null,
  handleCompanies: () => null,
  handleUnits: () => null,
  handleModalSelected: () => null,
  handleWorkorders: () => null,
};

const DefaultContext = createContext<DefaultContextProps>(contextDefaultValues);

export function useDefault() {
  return useContext(DefaultContext);
}

export function DefaultProvider({ children }: DefaultProviderProps) {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [units, setUnits] = useState<UnitProps[]>([]);
  const [modalSelected, setModalSelected] = useState<string>('');
  const [workorders, setWorkorders] = useState<WorkorderProps[]>([]);

  const handleUsers = (value: UserProps[]) => {
    setUsers(value);
  };

  const handleCompanies = (value: CompanyProps[]) => {
    setCompanies(value);
  };

  const handleUnits = (value: UnitProps[]) => {
    setUnits(value);
  };

  const handleModalSelected = (value: string) => {
    setModalSelected(value);
  };

  const handleWorkorders = (value: WorkorderProps[]) => {
    setWorkorders(value);
  };

  const value = {
    users,
    companies,
    units,
    workorders,
    modalSelected,
    handleUsers,
    handleCompanies,
    handleUnits,
    handleModalSelected,
    handleWorkorders,
  };

  return (
    <DefaultContext.Provider value={value}>{children}</DefaultContext.Provider>
  );
}
