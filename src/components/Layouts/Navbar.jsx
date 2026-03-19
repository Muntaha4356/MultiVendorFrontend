import React from 'react'
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from 'react-router-dom'

const Navbar = ({active}) => {
  return (
    <div className={`block lg:${styles.normalFlex}`}>
      {
        navItems && navItems.map((i, index)=>{
            return (<div className="flex" key={i.url || index}>
                
                <Link  to={i.url} 
                className={`${active ===index + 1 ? "text-[#17dd11]" : "text-black lg:text-[#fff]"} font-[500] px-6 cursor-pointer `}>
                    {i.title}
                </Link>
            </div>)
        })
      }
    </div>
  )
}

export default Navbar
