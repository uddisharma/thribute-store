"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useParams } from "next/navigation";
import useLoginPopup from "@/store/useLoginPopup";
import useMenuMobile from "@/store/useMenuMobile";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalSearchContext } from "@/context/ModalSearchContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
import { useCookies } from "react-cookie";
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";
import Toast from "@/components/ui/toast";

interface Props {
  props: string;
}

const MenuSeller: React.FC<Props> = ({ props }) => {
  const router = useRouter();

  const { openLoginPopup, handleLoginPopup } = useLoginPopup();
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();

  const { openModalCart } = useModalCartContext();
  let { wishlistState } = useWishlist();
  const { cartState } = useCart();
  const { openModalWishlist } = useModalWishlistContext();
  const { openModalSearch } = useModalSearchContext();
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

  const [isOpen1, setIsOpen1] = useState(false);

  const openModal1 = () => {
    setIsOpen1(true);
  };

  const closeModal1 = () => {
    setIsOpen1(false);
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
                {/* <div className="heading4">Marks & Spencer</div> */}
                <Image
                  className="w-[150px]"
                  src="/image/logo.png"
                  alt="logo"
                  height={350}
                  width={1300}
                />
              </Link>

              <div
                onClick={openModal}
                style={{ width: "600px" }}
                className="form-search relative max-lg:hidden z-[1]"
              >
                <Icon.MagnifyingGlass
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className=" h-10 rounded-lg border border-line caption2 w-full pl-9 pr-4"
                  readOnly
                  // value={searchKeyword}
                  // onChange={(e) => setSearchKeyword(e.target.value)}
                  // onKeyDown={(e) =>
                  //   e.key === "Enter" && handleSearch(searchKeyword)
                  // }
                />
              </div>
            </div>
            <div className="right flex gap-12">
              <div
                onClick={() => {
                  router.push("/become-a-seller");
                }}
                className="max-md:hidden search-icon flex items-center cursor-pointer relative"
              >
                <Icon.Plus size={24} color="black" />
                <button className="ml-2">Become Seller</button>
                <div className="line absolute bg-line w-px h-6 -right-6 "></div>
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
                {/* <div className="user-icon flex items-center justify-center cursor-pointer">
                  <Icon.User
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
                </div> */}
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

                <div
                  className="max-md:hidden cart-icon flex items-center relative cursor-pointer"
                  onClick={openModalWishlist}
                >
                  <Icon.Heart size={24} color="black" />
                  <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistState?.wishlistArray.length}
                  </span>
                </div>
                <div
                  className="max-md:hidden cart-icon flex items-center relative cursor-pointer"
                  onClick={openModalCart}
                >
                  <Icon.Handbag size={24} color="black" />
                  <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                    {cartState.cartArray.length}
                  </span>
                </div>
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
                  <li
                    onClick={() => {
                      handleMenuMobile();
                      // openModalCart();
                      openModal1();
                    }}
                  >
                    <div
                      className={`text-xl font-semibold flex items-center justify-between`}
                    >
                      Cart
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </div>
                  </li>

                  <li
                    onClick={() => {
                      handleMenuMobile();
                      openModalWishlist();
                    }}
                  >
                    <div className="text-xl font-semibold flex items-center justify-between mt-5">
                      Wishlist
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </div>
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
      <Modal1 isOpen={isOpen1} onClose={closeModal1} />
    </>
  );
};

export default MenuSeller;

const Modal = ({ isOpen, onClose }: any) => {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");
  const params = useParams();
  const handleSearch = (value: string) => {
    router.push(`/${params.seller}/search-result?query=${value}`);
  };

  if (!isOpen) return null;
  return (
    <>
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
            <div className="keyword mt-5">
              <div className="heading6">Feature keywords Today</div>
              <div className="list-keyword flex items-center flex-wrap gap-3 mt-4">
                <div
                  className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                  onClick={() => handleSearch("dress")}
                >
                  Dresses
                </div>
                <div
                  className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                  onClick={() => handleSearch("t-shirt")}
                >
                  T-shirt
                </div>
                <div
                  className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                  onClick={() => handleSearch("underwear")}
                >
                  Underwear
                </div>
                <div
                  className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                  onClick={() => handleSearch("top")}
                >
                  Top
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

const Modal1 = ({ isOpen, onClose }: any) => {
  const { cartState } = useCart();
  function groupByUsername(items: any) {
    return Object.values(
      items.reduce((grouped: any, item: any) => {
        const username = item.sellerId.username;

        if (!grouped[username]) {
          grouped[username] = { username, data: [] };
        }
        grouped[username].data.push(item);
        return grouped;
      }, {})
    );
  }
  const carts: any = groupByUsername(cartState.cartArray);

  if (!isOpen) return null;
  return (
    <>
      <>
        <div className={`modal-cart-block`} onClick={onClose}>
          <div
            className={`modal-cart-main  ${onClose ? "open" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className=" h-screen overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="heading5 px-6 my-5 text-center">Your Carts</div>
              <div className="list px-6">
                {cartState?.cartArray?.length == 0 && (
                  <div
                    style={{ height: "250px", width: "250px", margin: "auto" }}
                  >
                    <img
                      style={{
                        height: "200px",
                        width: "100%",
                        margin: "auto",
                        marginTop: "100px",
                      }}
                      src="https://ouch-cdn2.icons8.com/OFNbuRag1a7KziTLV093IWHSrh3-lC2lVyyTSTkd-kY/rs:fit:368:365/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNDMz/L2I1YjIzMDdhLTlh/MDEtNGNhMS05MDQ2/LTYxNmE0YTdiNzc2/My5wbmc.png"
                      alt=""
                    />
                    <p className="text-center mt-10">No product in cart</p>
                  </div>
                )}
                {carts &&
                  carts.map((product: any, index: number) => (
                    <Link key={index} href={`/${product?.username}/cart`}>
                      <div
                        key={product}
                        className="item py-5 flex items-center justify-between gap-3 border-b border-line"
                      >
                        <div className="infor flex items-center gap-5">
                          <div className="bg-img">
                            <Image
                              src={
                                product?.data &&
                                product?.data[0]?.images &&
                                product?.data[0]?.images[0]
                              }
                              width={300}
                              height={300}
                              alt={"Shop Banner"}
                              className="w-[100px] aspect-square flex-shrink-0 rounded-lg"
                            />
                          </div>
                          <div className="">
                            <div className="name text-button">
                              {product?.username}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="product-price text-title">
                                {product?.data?.length == 1
                                  ? `1 item`
                                  : `${product?.data?.length} items`}
                              </div>
                              <div className="flex items-center gap-2 cursor-pointer underline">
                                <div className="product-origin-price text-title text-secondary2 text-sm relative inline-block">
                                  View Menu
                                  <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                                </div>
                                <div>
                                  <Icon.ArrowRight />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
