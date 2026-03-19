import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";

import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import { productData } from "../../static/data"
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url } from "../../server";
import { toast } from "react-hot-toast";
import { addToCart } from "../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataTemp, setDataTemp] = useState(null);
  const { products } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true)
    } else {
      setClick(false)
    }
  }, [dispatch, data, wishlist]);

  useEffect(() => {

    const foundProduct = allProducts && allProducts.find((i) => i._id === id);
    setDataTemp(foundProduct);
  }, [products, id])
  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };


  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === id)) {
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



  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=con4443rfdscrt43cdscdcfr");
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`unset ${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="w-full  md:flex 800px:flex">
              <div className="w-full  800px:w-[50%]">
                <img
                  src={data?.images[select]}
                  alt=""
                  className="w-full pr-8 pb-8"
                />
                <div className="w-full flex flex-wrap gap-3 mt-4">
                  {
                    data && data.images.map((img, index) => (
                      <div
                        className={
                          `${select === index ? "border" : "null"
                          } cursor-pointer`
                        }
                        onClick={() => setSelect(index)}
                      >
                        <img
                          src={img}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index + 1)}
                        />
                      </div>
                    ))
                  }
                  <div
                    className={`${select === 1 ? "border" : "null"
                      } cursor-pointer`}
                  >
                    <img
                      src={data?.images[select]}
                      alt=""
                      className="h-[200px] "
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
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
                  className={`${styles.button} mt-6 rounded h-11 flex items-center  `}
                  onClick={() => addToCartHandler(data?._id)}
                >
                  <span className="flex items-center gap-2 text-white">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <Link to={`/shop/preview/${data?.shop?._id}`}>
                  <div className="flex items-center pt-8 ">
                      <img
                        src={`${backend_url}${data?.shop?.avatar}`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    <div className="pr-8">
                      <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                      <h5 className="pb-3 text-[15px]">
                        {4 / 5} Rating
                      </h5>
                    </div>
                    <div
                      className={`${styles.button} bg-[#6443d1] mt-4 rounded !h-11 `}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-white flex items-center">
                        Send Message <AiOutlineMessage className="ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <ProductDetailInfo data={data} products={allProducts} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;

const ProductDetailInfo = ({ data, products }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 loading-5 font-[600] cursor-pointer 800px:text-[20px] "
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 loading-5 font-[600] cursor-pointer 800px:text-[20px] "
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 loading-5 font-[600] cursor-pointer 800px:text-[20px] "
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] loading-8 pb-10 whitespace-pre-line ">
            {data.description}
          </p>

        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 ? (

        <div className="w-full block 800px:flex p-3 flex">
          <div className="w-full 800px:w-[50%]  ">
            <div className="flex items-center">
              <img
                src={`${backend_url}${data?.shop?.avatar}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="pl-3">
                <Link to={`/shop/preview/${data?.shop?._id}`} >
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                </Link>
                <h5 className="pb-2 text-[15px] ">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>

            </div>
            <p className="pt-2">
              {data.shop.description}
            </p>
          </div>
          <div className="w-full 800px:w-[50%] 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-right justify-end flex flex-col items-end">
              <h5 className="font-[300] ">
                Joined On <span className="font-[500]"> {data.shop?.createdAt?.slice(0, 10)} </span>
              </h5>
              <h5 className="font-[300] pt-3">
                TotaL Products <span className="font-[500]"> {products && products.length} </span>
              </h5>
              <h5 className="font-[300] pt-3">
                TotaL Reviews <span className="font-[500]"> {data.reviews.length} </span>
              </h5>
              <Link to={"/"}>
                <div className={`${styles.button} !rounded-[4px] !h-[39px] mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>

      ) : null}
    </div>
  );
};
