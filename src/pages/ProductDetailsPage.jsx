import React, { useEffect, useState } from 'react'
import Header from '../components/Layouts/Header'
import Footer from '../components/Routes/Footer/Footer'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import EventDetails from '../components/Events/EventDetails'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import SuggestedProducts from '../components/ProductDetails/SuggestedProducts'
import { useDispatch, useSelector } from 'react-redux'
import { matchesProductRoute } from '../utils/slugify'
import Loader from '../components/Layout/Loader'
import { getAllEvents } from '../redux/actions/event'
import { getAllProducts } from '../redux/actions/product'

const ProductDetailsPage = ({ forceEventView = false }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const { allProducts, isLoading: productsLoading } = useSelector((state) => state.products);
  const { allEvents, isLoading: eventsLoading } = useSelector((state) => state.events);
  const [searchParams] = useSearchParams();
  const isEventView =
    forceEventView ||
    searchParams.get("isEvent") !== null ||
    location.pathname.startsWith("/event/");

  useEffect(() => {
    if (!allProducts?.length) {
      dispatch(getAllProducts());
    }
    if (!allEvents?.length) {
      dispatch(getAllEvents());
    }
  }, [dispatch, allProducts?.length, allEvents?.length]);

  useEffect(() => {
    if (isEventView) {
      const event =
        allEvents && allEvents.find((item) => matchesProductRoute(item, id));
      setData(event);
      return;
    }

    const product =
      allProducts && allProducts.find((item) => matchesProductRoute(item, id));
    setData(product);
  }, [allProducts, allEvents, id, isEventView]);

  const isLoading = isEventView ? eventsLoading : productsLoading;

  return (
    <div className="bg-white min-h-screen">
      <Header />
      {isLoading && !data ? (
        <Loader />
      ) : !data ? (
        <div className="w-full py-20 text-center text-gray-600">
          {isEventView ? "Event not found." : "Product not found."}
        </div>
      ) : isEventView ? (
        <EventDetails data={data} />
      ) : (
        <>
          <ProductDetails data={data} />
          <SuggestedProducts data={data} />
        </>
      )}
      <Footer />
    </div>
  )
}

export default ProductDetailsPage
