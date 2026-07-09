import React from 'react'
import { useSelector } from 'react-redux'
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import AllRefundOrders from '../../components/Shop/AllRefundOrders'

const ShopAllRefunds = () => {
    const { seller } = useSelector((state) => state.seller)
  return (
    <div className="w-full">
      <DashboardHeader seller={seller} />
      <div className="flex items-start justify-between w-full">
        <div className="w-[88px] md:w-[330px]">
          <DashboardSidebar active={10} />
        </div>
        <div className="w-full justify-center flex ">
          <AllRefundOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopAllRefunds
