import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { addToCart } from "../../redux/actions/cart";

const EventDetails = ({ data }) => {
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  if (!data) return null;

  const addToCartHandler = () => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
      return;
    }

    if (data.stock < 1) {
      toast.error("Event stock limited!");
      return;
    }

    dispatch(addToCart({ ...data, qty: 1, isEvent: true }));
    toast.success("Event added to cart successfully!");
  };

  const shopAvatar =
    data.shop?.avatar?.url || data.shop?.avatar || "";

  return (
    <div className="bg-white w-full min-h-[60vh]">
      <div className={`${styles.section} py-10`}>
        <div className="w-full lg:flex gap-10">
          <div className="w-full lg:w-[50%]">
            <img
              src={data.images?.[select]}
              alt={data.name}
              className="w-full max-h-[520px] object-contain rounded-md bg-gray-50"
            />
            {data.images?.length > 1 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {data.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    className={`h-20 w-20 object-cover rounded cursor-pointer border-2 ${
                      select === index ? "border-blue-500" : "border-gray-200"
                    }`}
                    onClick={() => setSelect(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-[50%] flex flex-col justify-center">
            <span className="inline-block w-fit px-3 py-1 mb-3 text-sm bg-[#475ad2] text-white rounded">
              Limited Event
            </span>
            <h1 className={`${styles.productTitle} text-[30px]`}>{data.name}</h1>
            <p className="py-4 text-gray-700 leading-7">{data.description}</p>

            <div className="flex items-center gap-4 py-2">
              <h5 className="font-bold text-[22px] text-[#d55b45]">
                {data.originalPrice}$
              </h5>
              <h5 className="font-bold text-[28px] text-[#333]">
                {data.discountPrice}$
              </h5>
            </div>

            <p className="text-[#44a55e] font-medium">
              {data.sold_out ?? 0} sold · {data.stock} left in stock
            </p>

            <div className="my-5 p-4 bg-[#f5f6fb] rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Event ends in</p>
              <CountDown finishDate={data.Finish_Date} />
              <p className="text-sm text-gray-600 mt-3">
                {data.start_Date &&
                  new Date(data.start_Date).toLocaleDateString()}{" "}
                -{" "}
                {data.Finish_Date &&
                  new Date(data.Finish_Date).toLocaleDateString()}
              </p>
            </div>

            <button
              type="button"
              className={`${styles.button} mt-2`}
              onClick={addToCartHandler}
            >
              <span className="text-white font-medium">Add to cart</span>
            </button>

            {data.shop && (
              <Link
                to={`/shop/preview/${data.shop._id}`}
                className="flex items-center gap-3 mt-8"
              >
                {shopAvatar && (
                  <img
                    src={shopAvatar}
                    alt={data.shop.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className={`${styles.shop_name} !pb-0`}>
                    {data.shop.name}
                  </h3>
                  <p className="text-sm text-gray-500">Visit shop</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
