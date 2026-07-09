import React from 'react'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar'
import CreateEvent from '../../components/Shop/CreateEvent'
import { useSelector } from 'react-redux'

const ShopCreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full">
      <DashboardHeader seller={seller} />
      <div className="flex items-start justify-between w-full">
        <div className=" w-[88px] md:w-[330px] ">
            <DashboardSidebar active={6}/>
        </div>
        <div className="w-full justify-center flex">
            <CreateEvent />
        </div>
      </div>
    </div>
  )
}

export default ShopCreateEvent
