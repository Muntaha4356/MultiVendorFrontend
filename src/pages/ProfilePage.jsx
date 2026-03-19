import React, { useState } from 'react'
import Profile from '../components/Routes/ProfilePage/Profile'
import Header from '../components/Layouts/Header'
import styles from '../styles/styles'
import ProfileSidebar from '../components/Routes/ProfilePage/ProfileSidebar'
import ProfileContent from '../components/Routes/ProfilePage/ProfileContent'

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10 `}>
        <div className="w-[50px] lg:w-[335px] transition-all duration-300 sticky 800px:mt-0 md:mt-[18%] ">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
          <ProfileContent active={active} setActive={setActive}/>
      </div>
      <Profile/>
    </div>
  )
}

export default ProfilePage
