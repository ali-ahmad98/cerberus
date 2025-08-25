/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef } from "react";

const dropDownContext = createContext();

export const DropDownContextProvider = ({ children }) => {
  const value = {
    dropDownRef: useRef(),
  };
  return <dropDownContext.Provider value={value}>{children}</dropDownContext.Provider>;
};

export const useDropDownContext = () => {
  const values = useContext(dropDownContext);
  return values;
};
