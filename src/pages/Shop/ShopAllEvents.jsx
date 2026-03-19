import React from 'react'
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import CreateProduct from '../../components/Shop/CreateProduct'
import { useSelector } from 'react-redux'
import AllEvents from '../../components/Shop/AllEvents'

const ShopAllEvents = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full">
      <DashboardHeader seller={seller} />
      <div className="flex items-start justify-between w-full">
        <div className=" w-[88px] md:w-[330px] ">
          <DashboardSidebar active={5} />
        </div>
        <div className="w-full justify-center flex ">
          <AllEvents />
        </div>
      </div>
    </div>
  )
}

export default ShopAllEvents