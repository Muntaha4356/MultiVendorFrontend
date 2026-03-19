import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi"
import {BsCartPlus} from 'react-icons/bs'
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
import {removeFromWishlist} from "../../redux/actions/wishlist"
import {addToCart} from "../../redux/actions/cart"

const Wishlist = ({setOpenWishlist}) => {

  const {wishlist} = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data))
  }

  const addToCartHandler = (data) => {
    const newData = {...data, qty:1};
    dispatch(addToCart(newData));
    setOpenWishlist(false)
  }

  return (
    <div className="fixed top-0 right-0 h-screen w-[400px] bg-white shadow-lg z-50 flex flex-col justify-between">
      <div className="">
        {
          wishlist && wishlist.length === 0 ? (
            <div className="flex w-full justify-end pt-5 pr-5">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenWishlist(false)}
          />
          {/* Items in theCart */}
          {/* {cartData.map((i, index) => (
            .
          ))} */}
          <h5>Wishlist Items is empty!</h5>
        </div>
        
          ) : (
            <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                  ))}
              </div>
            </div>
          </>
          )
        }
        {/* <div className={`${styles.normalFlex} p-4`}>
          <AiOutlineHeart size={25} />
          <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
        </div> */}
      </div>
      {/* Single item
      {cartData &&
        cartData.map((i, index) => (
          <CartSingle key={index} data={i} />
        ))} */}
      
    </div>

  );
};

export default Wishlist;

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  

  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
  <>
      <div
            className="flex w-full pr-14 flex-row mr-6 ml-6 justify-between border-b-1 p-2"
          >
            <div className="flex flex-row">
              <div className="flex flex-col items-center">
              {/* <RxCross1 className="w-full flex items-center"/>  */}
                 <img
                className="w-[90px] h-[90px]"
                src={`${data?.images[0]}`}
                alt=""
              />
              </div>
             
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="font-medium">{data.name}</h5>
              <p className="text-sm text-gray-500">{totalPrice}</p>
            </div>
            <div className="flex flex-col gap-4 justify-start">
                <RxCross1 className="cursor-pointer " onClick={() => removeFromWishlistHandler(data)} />
                <BsCartPlus size={20} className='cursor-pointer ' title='Add to the Cart' onClick={()=>addToCartHandler(data)}
                 />
            </div>
            
            
          </div>
  </>);
};
