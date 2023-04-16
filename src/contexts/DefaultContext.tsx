import { createContext, useContext, useState } from 'react';

// utils
import { UserProps, DefaultContextProps, DefaultProviderProps } from '@/types';

const contextDefaultValues: DefaultContextProps = {
  users: [],
  handleUsers: () => null,
};

const DefaultContext = createContext<DefaultContextProps>(contextDefaultValues);

export function useDefault() {
  return useContext(DefaultContext);
}

export function DefaultProvider({ children }: DefaultProviderProps) {
  const [users, setUsers] = useState<UserProps[]>([]);

  const handleUsers = (value: UserProps[]) => {
    setUsers(value);
  };

  const value = { users, handleUsers };

  return (
    <DefaultContext.Provider value={value}>{children}</DefaultContext.Provider>
  );
}
