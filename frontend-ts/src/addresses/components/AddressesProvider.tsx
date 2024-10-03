"use client";

import React, { useState } from "react";
import { AddressInfo } from "@/addresses/types/AddressInfo";

export type AddressesContextType = Readonly<{
  addresses: ReadonlyArray<AddressInfo>;
  setAddresses: (addresses: ReadonlyArray<AddressInfo>) => void;
}>;

const AddressesContext = React.createContext<AddressesContextType>({
  addresses: [],
  setAddresses: () => {},
});

export const AddressesProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [addresses, setAddresses] = useState<ReadonlyArray<AddressInfo>>([]);

  return (
    <AddressesContext.Provider
      value={{
        addresses,
        setAddresses,
      }}
    >
      {children}
    </AddressesContext.Provider>
  );
};

export const useAddresses = () => {
  const context = React.useContext(AddressesContext);
  if (!context) {
    throw new Error("useAddresses must be used within an AddressesProvider");
  }
  return context;
};
