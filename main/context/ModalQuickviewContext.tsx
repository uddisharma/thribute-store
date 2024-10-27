"use client";

// ModalQuickviewContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
// import { ProductType } from "@/type/ProductType";

interface ModalQuickviewContextProps {
  children: ReactNode;
}

interface ModalQuickviewContextValue {
  selectedProduct: any | null;
  openQuickview: (product: any) => void;
  closeQuickview: () => void;
}

const ModalQuickviewContext = createContext<
  ModalQuickviewContextValue | undefined
>(undefined);

export const ModalQuickviewProvider: React.FC<ModalQuickviewContextProps> = ({
  children,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const openQuickview = (product: any) => {
    setSelectedProduct(product);
  };

  const closeQuickview = () => {
    setSelectedProduct(null);
  };

  return (
    <ModalQuickviewContext.Provider
      value={{ selectedProduct, openQuickview, closeQuickview }}
    >
      {children}
    </ModalQuickviewContext.Provider>
  );
};

export const useModalQuickviewContext = () => {
  const context = useContext(ModalQuickviewContext);
  if (!context) {
    throw new Error(
      "useModalQuickviewContext must be used within a ModalQuickviewProvider"
    );
  }
  return context;
};
