import React, { useEffect } from 'react'
import styles from '../../styles/styles'
import EventCard from './EventCard'
import { useSelector } from 'react-redux'

const Events = () => {
    const { allEvents, isLoading } = useSelector((state) => state.events)


    return (
        <div>
            {
                !isLoading && (
                    <div className={`${styles.section}`}>
                        <div className={`${styles.heading}`}>
                            <h1>Popular Events</h1>
                        </div>

                        <div className="w-full grid gap-8">
                            {
                                allEvents.length !== 0 && (
                                    allEvents.map((event) => (
                                        <EventCard key={event._id} data={event} />
                                    ))
                                )
                            }
                            <h4>{
                                allEvents?.length === 0 && (
                                    'No Events have!'
                                )
                            }

                            </h4>
                        </div>

                    </div>
                )
            }
        </div>

    )
}

export default Events
