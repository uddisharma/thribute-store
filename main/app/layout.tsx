import { Instrument_Sans } from "next/font/google";
import "@/styles/styles.scss";
import GlobalProvider from "./GlobalProvider";
import ModalCart from "@/components/Modal/ModalCart";
import ModalWishlist from "@/components/Modal/ModalWishlist";
import ModalSearch from "@/components/Modal/ModalSearch";
import ModalQuickview from "@/components/Modal/ModalQuickview";
import ModalCompare from "@/components/Modal/ModalCompare";
import CountdownTimeType from "@/type/CountdownType";
import { countdownTime } from "@/store/countdownTime";
import ModalHome from "@/components/Modal/ModalHome";
import { Toaster } from "react-hot-toast";
import { siteConfig } from "@/config/site-config";

const serverTimeLeft: CountdownTimeType = countdownTime();

const instrument = Instrument_Sans({ subsets: ["latin"] });

export const metadata = siteConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <html lang="en">
        <body className={instrument.className}>
          {children}
          <ModalCart serverTimeLeft={serverTimeLeft} />
          <ModalWishlist />
          <ModalSearch />
          <ModalHome />
          <ModalQuickview />
          <ModalCompare />
          <Toaster position="bottom-left" reverseOrder={false} />
        </body>
      </html>
    </GlobalProvider>
  );
}
