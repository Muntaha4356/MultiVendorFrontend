import React from 'react'
import DashboardHeader from '../components/Dashboard/Shop/DashboardHeader'
import DashboardSidebar from '../components/Dashboard/Shop/Layout/DashboardSidebar'
import { useSelector } from 'react-redux'
import CreateProduct from '../components/Shop/CreateProduct'
const ShopCreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full">
      <DashboardHeader seller={seller} />
      <div className="flex items-start justify-between w-full">
        <div className=" w-[88px] md:w-[330px] ">
          <DashboardSidebar active={4} />
        </div>
        <div className="w-full justify-between flex ">
          <CreateProduct />
        </div>
      </div>
    </div>
  )
}

export default ShopCreateProduct
