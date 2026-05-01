import React from 'react'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar'
import AllOrders from '../../components/Shop/AllOrders'
import { useSelector } from 'react-redux'

const ShopAllOrders = () => {
  console.log("it reached me cutie hihihihihi")
  const {seller} = useSelector((state) => state.seller)
  return (
    <div>
      
        <DashboardHeader seller={seller} />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                  <DashboardSidebar active={2} />
                </div>
                <div className="w-full justify-center text-white flex">
                   <AllOrders />
                   
                </div>
        </div>
      
    </div>
  )
}

export default ShopAllOrders
