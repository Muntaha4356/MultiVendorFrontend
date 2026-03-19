import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import styles from "../../styles/styles";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { backend_url } from "../../server.js";
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const {allProducts} = useSelector((state) =>  state.products)
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setSearchData(filteredProducts);
    console.log(searchData);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // cleanup
    };
  }, []);

  useEffect(() => {
    console.log("Active changed:", active);
  }, [active]);
  return (
    <>
      {loading ? null : (
        <header className="hidden lg:block w-screen bg-white shadow-md">
          <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between px-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://res.cloudinary.com/dflbje6qn/image/upload/b_rgb:C2C9D6/c_pad,w_140,h_55/v1756942450/download_18_vprvfq.jpg"
                alt="logo"
                className="h-[50px] object-contain"
              />
            </Link>

            {/* Search Bar */}
            <div className="w-[45%] relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[45px] w-full pl-5 pr-12 border rounded-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
              />
              <AiOutlineSearch
                size={22}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-600"
              />
              {searchData && searchData.length !== 0 ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                  {searchData &&
                    searchData.map((i, index) => {
                      const product_id = i._id;
                      console.log("iiii", i)
                      return (
                        <Link to={`/product/${product_id}`}>
                          <div className="w-full flex items-start-py-3">
                            <img
                              src={
                                i.images && i.images.length > 0
                                  ? i.images[0]
                                  : "https://res.cloudinary.com/dflbje6qn/image/upload/b_rgb:C2C9D6/c_pad,w_140,h_55/v1756942450/download_18_vprvfq.jpg"
                              }
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1
                              onClick={() => {
                                navigate(`/product/${product_id}`);
                                window.location.reload(true);
                              }}
                            >
                              {i.name}
                            </h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>

            <div className={`${styles.button}`}>
              <Link to="/shop-create">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller{" "}
                  <IoIosArrowForward className="ml-1 "></IoIosArrowForward>
                </h1>
              </Link>
            </div>
          </div>
          <div
            className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
              } transition 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
          >
            <div
              className={`${styles.section} relative ${styles.normalFlex} justify-between`}
            >
              {/* cATEGORIES */}
              <div className="">
                <div className="relative h-[60px] mt-[10px] w-[270px] 1000px:block ">
                  <BiMenuAltLeft size={30} className="absolute top-3 left-2 " />
                  <button
                    className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md `}
                  >
                    All Categories
                  </button>
                  <IoIosArrowDown
                    size={20}
                    className="absolute right-2 top-4 cursor-pointer"
                    onClick={() => setDropDown(!dropDown)}
                  />
                  {dropDown ? (
                    <DropDown
                      categoriesData={categoriesData}
                      setDropDown={setDropDown}
                    />
                  ) : null}
                </div>
              </div>
              {/* navitems */}
              <div className={`${styles.normalFlex}`}>
                <Navbar active={activeHeading} />
              </div>
              <div className="flex">
                <div className={`${styles.normalFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart size={30} color="rgb[255 255 255 / 83%]" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center ">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <div className={`${styles.normalFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenCart(true)}
                  >
                    <AiOutlineShoppingCart
                      size={30}
                      color="rgb[255 255 255 / 83%]"
                    />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center ">
                      {" "}
                      {cart && cart.length}
                    </span>
                  </div>
                </div>
                <div className={`${styles.normalFlex}`}>
                  <div className="relative cursor-pointer mr-[15px]">
                    {isAuthenticated ? (
                      <Link to="/profile">
                        <img
                          src={`${backend_url}${user.avatar.public_id}`}
                          className="w-[40px] h-[40px] rounded-full "
                          alt=""
                        />
                      </Link>
                    ) : (
                      <Link to="/login">
                        <CgProfile size={30} color="rgb[255 255 255 / 83%]" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Cart Popup */}
                {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
                {/* Wishlist Popup */}
                {openWishlist ? (
                  <Wishlist setOpenWishlist={setOpenWishlist} />
                ) : null}
              </div>
            </div>
          </div>
        </header>
      )}
      {/* mobile screen  */}

      <div
        className={`
      ${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null}
        lg:hidden w-full h-[70px] fixed bg-[#fff] z-50 top-0 left-0 shadow-sm `}
      >
        <div className="w-full flex items-center justify-between">
          <div className="">
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dflbje6qn/image/upload/b_rgb:C2C9D6/c_pad,w_140,h_55/v1756942450/download_18_vprvfq.jpg"
                alt=""
                className="mt-2 cursor-pointer"
              />
            </Link>
          </div>
          <div className="">
            <div className="relative mr-[20px] ">
              <AiOutlineShoppingCart size={40} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-5 h-5 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center ">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>

        {/* Header SideBar */}
        {open && (
          <div className="fixed w-full  z-20 h-full top-0 left-0 overflow-y-scroll">
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 ">
              <div className="w-full justify-between flex pr-3 ">
                <div>
                  <div className="relative mr-[15px] ">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-5 h-5 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center ">
                      0
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] ">
                <input
                  type="search"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md "
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;
                        const product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${product_name}`}>
                            <div className="w-full flex items-start-py-3">
                              <img
                                src={
                                  i.image_Url && i.image_Url.length > 0
                                    ? i.image_Url[0].url
                                    : "https://res.cloudinary.com/dflbje6qn/image/upload/b_rgb:C2C9D6/c_pad,w_140,h_55/v1756942450/download_18_vprvfq.jpg"
                                }
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1
                                onClick={() => {
                                  navigate(`/product/${product_name}`);
                                  window.location.reload(true);
                                }}
                              >
                                {i.name}
                              </h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
              <Navbar active={activeHeading} />
              <div className={`${styles.button}`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center ml-4 !rounded-[4px]">
                    Become Seller{" "}
                    <IoIosArrowForward className="ml-1"></IoIosArrowForward>
                  </h1>
                </Link>

              </div>
              <br />
              <br />
              <br />
              <div className="flex w-full justify-center ">
                {
                  !isAuthenticated ? (
                    <>
                      <Link to="/login" className="text-[16px] pr-[10px] text-[#0000008a] ">
                        Login /
                      </Link>
                      <Link to="/sign-up" className="text-[16px] text-[#0000008a] ">
                        Signup
                      </Link>
                    </>
                  ) : (
                    <div className="">
                      <Link to="/profile">
                        <img src={`${backend_url}${user.avatar.public_id}`} alt=""
                          className="w-[70px] h-[70px] rounded-full border-[2px] border-[#17bdb4a8]" />
                      </Link>
                    </div>
                  )
                }
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
