import React from "react";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

import {
  AiOutlineCreditCard,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { server } from "../../../server";
import axios from "axios";
import {toast} from "react-hot-toast"
const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const Logout = () => {
    axios.get(`${server}/user/logout`, {withCredentials: true} ).then((res) => {
      toast.success(res.data.message);
      window.location.reload(true);
      navigate('/login');
      
    }).catch((error)=>{
      console.log(error.response.data.message)
    })
  };
  const profile_option = [
    { label: "Profile", icon: RxPerson },
    { label: "Orders", icon: FiShoppingBag },
    { label: "Refunds", icon: HiOutlineReceiptRefund },
    { label: "Inbox", icon: AiOutlineMessage, link: "/inbox" },
    { label: "Track Orders", icon: MdOutlineTrackChanges },
    { label: "Payment Methods", icon: AiOutlineCreditCard },
    { label: "Address", icon: TbAddressBook },
    { label: "Logout", icon: AiOutlineLogout, function: Logout },
  ];

  return (
    <div className="w-full bg-white shadow-sm ounded-[10px] p-4 pt-8 ">
      {profile_option.map((i, index) => {
        const Icon = i.icon;
        return (
          <div
            key={index}
            className="flex items-center cursor-pointer w-full mb-8 "
            onClick={() => {
              setActive(index + 1);

              if (i.link) {
                navigate(i.link);
              }

              if (i.function) {
                i.function(); // ✅ actually call it
              }
            }}
          >
            <Icon size={25} color={active === index + 1 ? "red" : ""} />
            <span
              className={`pl-3 ${active === index + 1 ? "text-[red]" : ""} hidden lg:inline `}
            >
              {i.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileSidebar;
