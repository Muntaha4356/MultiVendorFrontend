import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";

const EventCard = ({active, data}) => {
  console.log("object.,.,.,.", data)
  return (
    <div className={`w-full block bg-white ${active ? "unset" : "mb-12"} rounded-lg lg:flex p-2`}>
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={`${data.images[0]}`}
          alt=""
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col  justify-center ">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>
          {data.description}
          
        </p>
        <div className="flex py-2 justify-between ">
            <div className="flex">
                <h5 className="font-bold text-[20px] text-[#d55b45] font-Roboto">
                    {data.originalPrice}$  {" "}

                </h5> 
                
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto ">
                    {data.discountPrice}$ 
                </h5>
            </div>
            <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">120 sold</span>
        </div>
        <CountDown  />
      </div>
    </div>
  );
};

export default EventCard;
