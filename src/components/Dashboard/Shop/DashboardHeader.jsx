import React, { useEffect } from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { Link } from 'react-router-dom'

const DashboardHeader = ({seller}) => {
  
  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
      <div className="flex items-center h-16 w-auto">
        <Link to="/dashboard" className="h-full flex items-center">
          <img src="https://res.cloudinary.com/dflbje6qn/image/upload/v1784024464/anime_stickers_for_printing_4_Pegatinas__Anime_hojw08.jpg" alt="" 
          className="max-h-full w-auto object-contain"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/Coupons" className='md:block hidden'>
            <AiOutlineGift
              color='#555'
              size={30}
              className='mx-5 cursor-pointer'
            />
          </Link>
            
          
          <Link to="/dashboard/events" className='md:block hidden'>
            <MdOutlineLocalOffer
              color='#555'
              size={30}
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to="/dashboard/products" className='md:block hidden'>
            <FiShoppingBag
              color='#555'
              size={30}
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to="/dashboard/orders" className='md:block hidden'>
            <FiPackage
              color='#555'
              size={30}
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to="/dashboard-messages" className='md:block hidden'>
            <BiMessageSquareDetail
              color='#555'
              size={30}
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={
                seller?.avatar?.url ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="Seller avatar"
              className='w-[50px] h-[50px] rounded-full object-cover'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
