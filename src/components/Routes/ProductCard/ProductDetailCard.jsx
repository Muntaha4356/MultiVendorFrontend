import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import { server } from "../../../server";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";

const ProductDetailCard = ({ open, setOpen, data }) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  
  const handleMessageSubmit = async () => {
      if (isAuthenticated) {
        const groupTitle = data._id + user._id;
        const userId = user._id;
        const sellerId = data.shop._id;
        await axios
          .post(
            `${server}/conversation/create-new-conversation`,
            {
              groupTitle,
              userId,
              sellerId,
            },
            { withCredentials: true }
          )
          .then((res) => {
            (res, "res")
            navigate(`/inbox/${res.data.conversation._id}`);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      } else {
        toast.error("Please login to create a conversation");
      }
    };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      ("iaitemexist")
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        ("data.stock < count")
        toast.error("Product stock limited!");
      } else {
        ("crtfaat")
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
                  {data.stock < 1
                    ? "Sold out"
                    : `${data.sold_out ?? 0} sold · ${data.stock} in stock`}
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
