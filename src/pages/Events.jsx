import React from 'react'
import Header from '../components/Layouts/Header'
import Footer from '../components/Routes/Footer/Footer'
import EventCard from '../components/Events/EventCard'
import { useSelector } from 'react-redux'
import Loader from '../components/Layout/Loader'
import styles from '../styles/styles'

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events)

  return (
    <div className="bg-white min-h-screen">
      <Header activeHeading={4} />
      <div className={`${styles.section} py-8`}>
        <h1 className={`${styles.heading} text-[30px]`}>All Events</h1>
        {isLoading ? (
          <Loader />
        ) : allEvents?.length ? (
          <div className="flex flex-col gap-8">
            {allEvents.map((event) => (
              <EventCard key={event._id} active data={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-10">No events available right now.</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Events
