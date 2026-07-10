import React, { useState } from 'react'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar'
import ShopSettings from '../../components/Shop/ShopSettings'
import { useSelector } from 'react-redux'

const ShopSettingsPage = () => {
    const {seller} = useSelector((state) => state.seller)
  return (
    <div className='w-full'>
      <DashboardHeader seller={seller} />
      <div className="flex items-start justify-between w-full">
        <div className=" w-[88px] md:w-[330px] ">
          <DashboardSidebar active={11} />
        </div>
        <div className="w-full justify-center flex ">
          <ShopSettings />
        </div>
        
      </div>
    </div>
  )
}

export default ShopSettingsPage
