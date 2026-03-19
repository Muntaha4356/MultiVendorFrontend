import React, { useEffect, useState } from "react";

const CountDown = ({dats}) => {
  const data = {
    Finish_Date: "2025-09-10T23:59:59", // YYYY-MM-DDTHH:mm:ss format
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data.Finish_Date) - +new Date(); //The unary + converts the Date object into its numeric timestamp
    //how many milliseconds are left until the finish date.
    let timeLeft = {};
    if (difference > 0) { // If the finish date is in the future (difference > 0)
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),//dividing difference by ms in a day tells us how many full days are left.
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
     return timeLeft;
  }
  // Object.keys(timeLeft) gives you an array of keys:
  // ["days", "hours", "minutes", "seconds"]
  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if(!timeLeft[interval]){
      return null;
    }
    //// timeLeft[interval] means: "Get the value for this key."(like hour,dayetc)
    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "} 
      </span>
    )
  })
  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's Up</span>
      )}
    </div>
  )
};

export default CountDown;
