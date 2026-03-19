import React from 'react'
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import CreateProduct from '../../components/Shop/CreateProduct'
import { useSelector } from 'react-redux'
import AllProducts from '../../components/Shop/AllProducts'


const ShopAllProducts = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full">
      <DashboardHeader seller={seller} />
      <div className="flex items-start justify-between w-full">
        <div className=" w-[88px] md:w-[330px] ">
          <DashboardSidebar active={3} />
        </div>
        <div className="w-full justify-center flex ">
          <AllProducts />
        </div>
      </div>
    </div>
  )
}

export default ShopAllProducts
