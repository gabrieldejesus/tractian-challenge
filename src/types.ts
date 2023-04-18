import { ReactNode } from 'react';

export type DefaultProviderProps = { children: ReactNode };

export interface DefaultContextProps {
  users: UserProps[];
  companies: CompanyProps[];
  units: UnitProps[];
  modalSelected: string;
  workorders: WorkorderProps[];
  handleUsers: (value: UserProps[]) => void;
  handleCompanies: (value: CompanyProps[]) => void;
  handleUnits: (value: UnitProps[]) => void;
  handleModalSelected: (value: string) => void;
  handleWorkorders: (value: WorkorderProps[]) => void;
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

export interface ChecklistProps {
  completed: boolean;
  task: string;
}

export interface WorkorderProps {
  id: number;
  title: string;
  status: string;
  assetId: number;
  priority: string;
  description: string;
  checklist: ChecklistProps[];
}

export interface HomeProps {
  users: UserProps[];
  companies: CompanyProps[];
  units: UnitProps[];
  workorders: WorkorderProps[];
}
