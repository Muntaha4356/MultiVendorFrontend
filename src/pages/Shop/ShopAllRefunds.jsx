import React from 'react'
import { useSelector } from 'react-redux'
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import AllRefundOrders from '../../components/Shop/AllRefundOrders'

const ShopAllRefunds = () => {
    const { seller } = useSelector((state) => state.seller)
  return (
    <div>
      <DashboardHeader seller={seller} />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={10} />
        </div>
        <div className="w-full justify-center text-white flex">
          <AllRefundOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopAllRefunds
