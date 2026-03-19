import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/cart";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";

const ProductDetailCard = ({ open, setOpen, data }) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist)

  console.log(data);
  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleMessageSubmit = () => { };
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      console.log("iaitemexist")
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        console.log("data.stock < count")
        toast.error("Product stock limited!");
      } else {
        console.log("crtfaat")
        const cartData = { ...data, qty: count };
        dispatch(addToCart (cartData));
        toast.success("Item added to cart successfully!");
      }
    }


  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true)
    } else {
      setClick(false)
    }
  }, [wishlist])

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));

  }

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data))
  }
  return (
    <div className="bg-[#fff]">
      <h1>lololololololollll</h1>
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={data.image_Url && data.image_Url[0]?.url} alt="" />
                {/* Shop url */}
                <div className="flex">
                  <img
                    src={data.shop?.shop_avatar?.url}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div className="">
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px] ">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11 `}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center ">
                    Send Message <AiOutlineMessage className="ml-1 " />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.total_sell}) Sold out
                </h5>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px] ">
                <h1 className={`${styles.productTitle} text-[20px]  `}>
                  {data.name}
                </h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
              </div>
              <div className="flex items-center mt-12 justify-between pr-3">
                <div className="">
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                    {count}
                  </span>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>

                {/* Heart icon */}
                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => {
                        removeFromWishlistHandler(data)
                      }}
                      color={click ? "red" : "#333"}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addToWishListHandler(data)}
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>
              <div
                className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                onClick={() => addToCartHandler(data._id)}
              >
                <span className="text-[#fff] flex items-center">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
            </div>
            {/* right side of card */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailCard;
