"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from "next/navigation";
import useLoginPopup from "@/store/useLoginPopup";
import useMenuMobile from "@/store/useMenuMobile";
import { useUser } from "@/context/UserContext";
import { useCookies } from "react-cookie";
import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";
import Image from "next/image";

interface Props {
  props: string;
}

const MenuHome: React.FC<Props> = ({ props }) => {
  const pathname = usePathname();
  const { openLoginPopup, handleLoginPopup } = useLoginPopup();
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const { userState, logoutUser } = useUser();
  const [cookies, _setCookie, removeCookie] = useCookies(["usertoken"]);
  const [auth, setAuth] = useState<boolean>(false);
  const [fixedHeader, setFixedHeader] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
      setLastScrollPosition(scrollPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const user = userState && userState?.user?.name;
  useEffect(() => {
    const cookieValue = cookies.usertoken;
    if (cookieValue && user) {
      setAuth(true);
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <div
        className={`header-menu style-one ${
          fixedHeader ? "fixed" : "absolute"
        } top-0 left-0 right-0 w-full md:h-[74px] h-[56px] ${props}`}
      >
        <div className="container mx-auto h-full">
          <div className="header-main flex justify-between h-full">
            <div
              className="menu-mobile-icon lg:hidden flex items-center"
              onClick={handleMenuMobile}
            >
              <i className="icon-category text-2xl"></i>
            </div>
            <div className="left flex items-center gap-16">
              <Link
                href={"/"}
                className="flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
              >
                {/* <div className="heading4">Anvogue</div> */}
                <Image
                  className="w-[150px]"
                  src="/image/logo.png"
                  alt="logo"
                  height={350}
                  width={1300}
                />
              </Link>
              <div className="menu-main h-full max-lg:hidden">
                <ul className="flex items-center gap-8 h-full">
                  <li className="h-full relative">
                    <Link
                      href="/stores"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                        pathname === "/stores" ? "active" : ""
                      }`}
                    >
                      Stores
                    </Link>
                  </li>
                  <li className="h-full">
                    <Link
                      href="/categories"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                        pathname === "/categories" ? "active" : ""
                      }`}
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="h-full">
                    <Link
                      href="/pricing"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                        pathname === "/pricing" ? "active" : ""
                      }`}
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className="h-full">
                    <Link
                      href="/become-a-seller"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                        pathname === "/become-a-seller" ? "active" : ""
                      }`}
                    >
                      Become a seller
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="right flex gap-12">
              <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                <Icon.MagnifyingGlass
                  size={24}
                  color="black"
                  onClick={openModal}
                />
                <div className="line absolute bg-line w-px h-6 -right-6"></div>
              </div>
              <div className="menu-mobile-icon lg:hidden flex items-center">
                <Icon.MagnifyingGlass
                  size={24}
                  color="black"
                  onClick={openModal}
                />

                <div className="line absolute bg-line w-px h-6 -right-6"></div>
              </div>
              <Modal isOpen={isOpen} onClose={closeModal} />
              <div className="list-action flex items-center gap-4">
                {!auth ? (
                  <div className="user-icon flex items-center justify-center cursor-pointer">
                    <Icon.SignIn
                      size={24}
                      color="black"
                      onClick={handleLoginPopup}
                    />
                    <div
                      className={`login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-small 
                                            ${openLoginPopup ? "open" : ""}`}
                    >
                      <Link
                        href={"/login"}
                        className="button-main w-full text-center"
                      >
                        Login
                      </Link>
                      <div className="text-secondary text-center mt-3 pb-4">
                        Don’t have an account?
                        <Link
                          href={"/register"}
                          className="text-black pl-1 hover:underline"
                        >
                          Register
                        </Link>
                      </div>
                      <div className="bottom pt-4 border-t border-line"></div>
                      <Link
                        href={"/contact-us"}
                        className="body1 hover:underline"
                      >
                        Support
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="user-icon flex items-center justify-center cursor-pointer">
                    <Icon.UserCircle
                      size={24}
                      color="black"
                      onClick={handleLoginPopup}
                    />
                    <div
                      className={`login-popup absolute top-[74px] w-[220px] p-7 rounded-xl bg-white box-shadow-small ${
                        openLoginPopup ? "open" : ""
                      }`}
                    >
                      <Link
                        href={"/my-account"}
                        className="button-main w-full text-center"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logoutUser();
                          removeCookie("usertoken", { path: "/" });
                          location.href = "/";
                          toast.custom((t) => (
                            <div
                              className={`${
                                t.visible ? "animate-enter" : "animate-leave"
                              } `}
                            >
                              <Toast
                                type="success"
                                message="Logout Successfull"
                              />
                            </div>
                          ));
                        }}
                        style={{ border: "1px dashed grey" }}
                        className="mt-2 text-center w-full p-2 rounded-lg hover:bg-red hover:text-white hover:border-none"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <div className="menu-container bg-white h-full">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-center">
                <div
                  className="close-menu-mobile-btn absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={14} />
                </div>
                <Link
                  href={"/"}
                  className="logo text-3xl font-semibold text-center"
                >
                  Anvogue
                </Link>
              </div>

              <div className="list-nav mt-10">
                <ul>
                  <li>
                    <Link
                      href={"/stores"}
                      className={`text-xl font-semibold flex items-center justify-between`}
                    >
                      Stores
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/categories"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      Categories
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/pricing"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      Pricing
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/become-a-seller"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      Become a Seller
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuHome;

const Modal = ({ isOpen, onClose }: any) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const router = useRouter();
  const handleSearch = (keyword: string) => {
    if (keyword == "") return;
    router.push(`/stores/search?q=${keyword}`);
  };

  if (!isOpen) return null;
  return (
    <>
      <div className={`modal-search-block`} onClick={onClose}>
        <div
          className={`modal-search-main md:p-10 p-6 rounded-[32px] ${
            isOpen ? "open" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="form-search relative">
            <Icon.MagnifyingGlass className="absolute heading5 right-6 top-1/2 -translate-y-1/2 cursor-pointer" />
            <input
              type="text"
              placeholder="Searching..."
              className="text-button-lg h-14 rounded-2xl border border-line w-full pl-6 pr-12"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSearch(searchKeyword)
              }
            />
          </div>
          <div className="keyword mt-4">
            <div className="heading6">Demanding Sellers</div>
            <div className="list-keyword flex items-center flex-wrap gap-3 mt-4">
              <div
                className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                onClick={() => handleSearch("boot")}
              >
                List of Trening Sellers
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
