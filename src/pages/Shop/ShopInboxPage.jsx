import React from 'react'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader';
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar';
import DashboardMessages from '../../components/Shop/DashboardMessages';
import { useSelector } from 'react-redux';


const ShopInboxPage = () => {
  const { seller } = useSelector((state) => state.seller)
  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <DashboardHeader seller={seller} />
      <div className="flex items-start w-full min-h-0 flex-1 overflow-x-hidden">
        <div className="w-[80px] lg:w-[330px]">
          <DashboardSidebar active={8} />
        </div>
        <div className="flex-1 min-w-0">
          <DashboardMessages />
        </div>
      </div>
    </div>
  )
}

export default ShopInboxPage
