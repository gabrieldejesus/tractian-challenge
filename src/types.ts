import { ReactNode } from 'react';

export type DefaultProviderProps = { children: ReactNode };

export interface DefaultContextProps {
  assets: AssetProps[];
  users: UserProps[];
  companies: CompanyProps[];
  units: UnitProps[];
  modalSelected: string;
  workorders: WorkOrderProps[];
  handleUsers: (value: UserProps[]) => void;
  handleCompanies: (value: CompanyProps[]) => void;
  handleUnits: (value: UnitProps[]) => void;
  handleModalSelected: (value: string) => void;
  handleWorkOrders: (value: WorkOrderProps[]) => void;
  handleAssets: (value: AssetProps[]) => void;
}

export interface HealthHistoryProps {
  status: string;
  timestamp: string;
}

export interface MetricsProps {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
}

export interface SpecificationsProps {
  maxTemp: number;
}

export interface AssetProps {
  id: number;
  name: string;
  model: string;
  image: string;
  status: string;
  unitId: number;
  sensors: string[];
  companyId: number;
  healthscore: number;
  metrics: MetricsProps;
  assignedUserIds: number[];
  healthHistory: HealthHistoryProps[];
  specifications: SpecificationsProps;
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

export interface WorkOrderProps {
  id: number;
  title: string;
  status: string;
  assetId: number;
  priority: string;
  description: string;
  checklist: ChecklistProps[];
}

export interface HomeProps {
  assets: AssetProps[];
  users: UserProps[];
  companies: CompanyProps[];
  units: UnitProps[];
  workorders: WorkOrderProps[];
}
