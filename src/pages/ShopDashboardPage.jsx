import React from 'react'
import DashboardHeader from '../components/Dashboard/Shop/DashboardHeader'
import { useSelector } from 'react-redux'
import DashboardSidebar from '../components/Dashboard/Shop/Layout/DashboardSidebar'

const ShopDashboardPage = () => {
  const { seller } = useSelector((state) => state.seller)
  return (
    <div className="w-full">
      <DashboardHeader seller={seller} />
      <div className="flex items-start justify-between w-full">
        <div className="md:w-[330px] w-[80px]">
          <DashboardSidebar active={1} />
        </div>
      </div>
    </div>
  )
}

export default ShopDashboardPage
