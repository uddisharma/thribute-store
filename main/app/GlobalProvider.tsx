import React from "react";
import { CartProvider } from "@/context/CartContext";
import { ModalCartProvider } from "@/context/ModalCartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ModalWishlistProvider } from "@/context/ModalWishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { ModalCompareProvider } from "@/context/ModalCompareContext";
import { ModalSearchProvider } from "@/context/ModalSearchContext";
import { ModalQuickviewProvider } from "@/context/ModalQuickviewContext";
import { ModalHomeProvider } from "@/context/ModalHomeContext";
import { UserProvider } from "@/context/UserContext";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CartProvider>
      <ModalCartProvider>
        <WishlistProvider>
          <ModalWishlistProvider>
            <CompareProvider>
              <ModalCompareProvider>
                <ModalSearchProvider>
                  <ModalHomeProvider>
                    <UserProvider>
                      <ModalQuickviewProvider>
                        {children}
                      </ModalQuickviewProvider>
                    </UserProvider>
                  </ModalHomeProvider>
                </ModalSearchProvider>
              </ModalCompareProvider>
            </CompareProvider>
          </ModalWishlistProvider>
        </WishlistProvider>
      </ModalCartProvider>
    </CartProvider>
  );
};

export default GlobalProvider;
