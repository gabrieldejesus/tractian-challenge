import { createContext, useContext, useState } from 'react';

// utils
import {
  UserProps,
  DefaultContextProps,
  DefaultProviderProps,
  CompanyProps,
  UnitProps,
  WorkOrderProps,
  AssetProps,
} from '@/types';

const contextDefaultValues: DefaultContextProps = {
  users: [],
  companies: [],
  units: [],
  modalSelected: '',
  workorders: [],
  assets: [],
  handleUsers: () => null,
  handleCompanies: () => null,
  handleUnits: () => null,
  handleModalSelected: () => null,
  handleWorkOrders: () => null,
  handleAssets: () => null,
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
  const [workorders, setWorkorders] = useState<WorkOrderProps[]>([]);
  const [assets, setAssets] = useState<AssetProps[]>([]);

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

  const handleWorkOrders = (value: WorkOrderProps[]) => {
    setWorkorders(value);
  };

  const handleAssets = (value: AssetProps[]) => {
    setAssets(value);
  };

  const value = {
    users,
    companies,
    units,
    workorders,
    assets,
    modalSelected,
    handleUsers,
    handleCompanies,
    handleUnits,
    handleModalSelected,
    handleWorkOrders,
    handleAssets,
  };

  return (
    <DefaultContext.Provider value={value}>{children}</DefaultContext.Provider>
  );
}
