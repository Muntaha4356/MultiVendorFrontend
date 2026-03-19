import React from 'react'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar'
import CreateEvent from '../../components/Shop/CreateEvent'
import { useSelector } from 'react-redux'

const ShopCreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div>
      <DashboardHeader seller={seller} />
      <div className="flex items-center justify-between w-full">
        <div className="w-[330px]">
            <DashboardSidebar active={6}/>
        </div>
        <div className="w-full">
            <CreateEvent />
        </div>
      </div>
    </div>
  )
}

export default ShopCreateEvent
