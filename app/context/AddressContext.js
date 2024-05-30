import React, { createContext, useState, useContext } from 'react';

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const [currentAddress, setCurrentAddress] = useState(null);

  return (
    <AddressContext.Provider value={{ currentAddress, setCurrentAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
