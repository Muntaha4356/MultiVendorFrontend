import React from 'react'
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import CreateProduct from '../../components/Shop/CreateProduct'
import { useSelector } from 'react-redux'
import AllCoupons from '../../components/Shop/AllCoupons'


const ShopAllCoupons = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full">
      <DashboardHeader seller={seller} />
      <div className="flex items-start justify-between w-full">
        <div className=" w-[88px] md:w-[330px] ">
          <DashboardSidebar active={9} />
        </div>
        <div className="w-full justify-center flex ">
          <AllCoupons />
        </div>
      </div>
    </div>
  )
}

export default ShopAllCoupons
