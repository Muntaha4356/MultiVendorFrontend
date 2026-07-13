import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/cart";
import {
  AiFillHeart,
  AiFillStar,
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
    console.log(data, "data")
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
        <div className="fixed inset-0 w-full h-screen bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-50 bg-white/90 hover:bg-gray-100 rounded-full p-2 shadow-sm transition-colors"
            >
              <RxCross1 size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: image + shop trust info */}
              <div className="bg-gray-50 p-6 md:p-8 flex flex-col rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                <div className="rounded-xl overflow-hidden bg-white border border-gray-100 aspect-square flex items-center justify-center">
                  <img
                    src={data?.images?.[0] || ""}
                    alt={data.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>

                <div className="flex items-center gap-3 mt-5">
                  <img
                    src={data.shop?.avatar?.url}
                    alt={data.shop?.name}
                    className="w-11 h-11 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-[15px]">
                      {data.shop.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      <AiFillStar/> {data.shop.ratings} Ratings
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleMessageSubmit}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                >
                  Send Message <AiOutlineMessage size={16} />
                </button>

                <p
                  className={`text-sm font-medium mt-4 ${
                    data.stock < 1 ? "text-red-500" : "text-gray-500"
                 }`}
                >
                  {data.stock < 1
                    ? "Sold out"
                    : `${data.sold_out ?? 0} sold · ${data.stock} in stock`}
                </p>
              </div>

              {/* Right: product info + purchase actions */}
              <div className="p-6 md:p-8 flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                  {data.name}
                </h1>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  {data.description}
                </p>

                <div className="flex items-baseline gap-2 mt-5">
                  <span className="text-2xl font-bold text-teal-600">
                    {data.discountPrice}$
                  </span>
                  {data.originalPrice ? (
                    <span className="text-gray-400 line-through text-sm">
                      {data.originalPrice}$
                    </span>
                  ) : null}
                </div>

                {/* Spacer pushes purchase controls to bottom of column */}
                <div className="flex-1" />

                <div className="mt-8 pt-5 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg overflow-hidden border border-gray-200">
                      <button
                        onClick={decrementCount}
                        aria-label="Decrease quantity"
                        className="px-3.5 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 font-medium text-gray-800 border-x border-gray-200">
                        {count}
                      </span>
                      <button
                        onClick={incrementCount}
                        aria-label="Increase quantity"
                        className="px-3.5 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {click ? (
                      <AiFillHeart
                        size={26}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color="red"
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={26}
                        className="cursor-pointer text-gray-700 hover:text-red-500 transition-colors"
                        onClick={() => addToWishListHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>

                  <button
                    onClick={() => addToCartHandler(data._id)}
                    disabled={data.stock < 1}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-teal-500 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
                  >
                    Add to cart <AiOutlineShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
       ) : null}
     </div>
   );
};

export default ProductDetailCard;
