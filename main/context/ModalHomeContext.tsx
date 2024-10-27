"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalHomeContextProps {
  children: ReactNode;
}

interface ModalHomeContextValue {
  isModalOpen: boolean;
  openModalHome: () => void;
  closeModalHome: () => void;
}

const ModalHomeContext = createContext<ModalHomeContextValue | undefined>(
  undefined
);

export const useModalHomeContext = (): ModalHomeContextValue => {
  const context = useContext(ModalHomeContext);
  if (!context) {
    throw new Error(
      "useModalHomeContext must be used within a ModalHomeProvider"
    );
  }
  return context;
};

export const ModalHomeProvider: React.FC<ModalHomeContextProps> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHome = () => {
    setIsModalOpen(true);
  };

  const closeModalHome = () => {
    setIsModalOpen(false);
  };

  const contextValue: ModalHomeContextValue = {
    isModalOpen,
    openModalHome,
    closeModalHome,
  };

  return (
    <ModalHomeContext.Provider value={contextValue}>
      {children}
    </ModalHomeContext.Provider>
  );
};
