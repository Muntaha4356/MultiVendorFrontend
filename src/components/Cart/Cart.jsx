import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux'
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi"
import { Link } from "react-router-dom";
import { toast } from "react-toastify"
import { addToCart, removeFromCart } from '../../redux/actions/cart'
const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data))
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );


  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[30%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>

  );
};

export default Cart;

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;
  const increment = (data) => {

    if (data.stock < value) {
      toast.error("Product stock limited")
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  }


  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  }
  const removeItem = () => {

  }
  return (
    <>
      <div
        className="flex w-full flex-row justify-between gap-3 border-b-1 p-2"
      >
        <div className="flex flex-row">
          <div className="flex flex-col items-center">
            <button
              onClick={() => increment(data)}
              className={`rounded-full bg-red-600 w-[25px] h-[25px] text-white flex items-center justify-center`}
            >
              <HiPlus size={18} color="#fff" />
            </button>
            <p>{data.qty}</p>
            <button
              onClick={() => decrement(data)}
              className={`rounded-full bg-gray-400 w-[25px] h-[25px] text-white flex items-center justify-center`}
            >
              <HiOutlineMinus size={18} color="#fff" />
            </button>
          </div>
          <img
            className="w-[90px] h-[90px] ml-2 mr-2 rounded-[5px] "
            src={`${data?.images[0]}`}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="font-medium">{data.name}</h5>
          <p className="text-sm text-gray-500">{data.discountPrice} * {value}</p>
          <h4 className="font-semibold text-[#d02222] ">US${totalPrice}</h4>
        </div>
        <RxCross1 onClick={() => removeFromCartHandler(data)} className="cursor-pointer " />
      </div>
    </>
  );

};
