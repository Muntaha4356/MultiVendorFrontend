import React from 'react'
import Header from "../components/Layouts/Header.jsx";
import Hero from "../components/Routes/Hero.jsx";
import Categories from '../components/Routes/Categories.jsx';
import BestDeals from '../components/Routes/BestDeals.jsx';
import FeaturedProducts from '../components/Routes/FeatureProducts/FeaturedProducts.jsx';
import Events from '../components/Events/Events.jsx';
import Sponsored from '../components/Routes/Sponsored.jsx';
import Footer from '../components/Routes/Footer/Footer.jsx';

const HomePage = () => {
  return (
    <div >  
      <Header activeHeading={1}/>
      <Hero /> 
      <Categories/>  
      <BestDeals/>
      <Events/>
      <FeaturedProducts/>
      <Sponsored/>
      <Footer/>
    </div>
  )
}

export default HomePage
