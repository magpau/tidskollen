import { useState, useEffect } from 'react'
import './App.css'
import useDayNightMode from "./hooks/useDayNightMode"; // Import the custom hook

function App() {
  // Invoke the day/night mode hook
  useDayNightMode();

  // Helper function to capitalize the first letter
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Initial time, date, and weekday setup
  const getTime = () => new Date().toLocaleTimeString();

  const getDate = () => {
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const month = capitalize(
      new Date().toLocaleDateString("sv-SE", { month: "long" })
    ); // Capitalized month
    return `${day} ${month} ${year}`;
  };

  const getWeekday = () =>
    capitalize(new Date().toLocaleDateString("sv-SE", { weekday: "long" }));

  // Determine the part of the day based on the current hour
  const getTimeOfDay = () => {
    const hours = new Date().getHours();

    if (hours >= 6 && hours < 9) {
      return "Morgon"; // Morning
    } else if (hours >= 9 && hours < 12) {
      return "Dag"; // Daytime (late morning)
    } else if (hours >= 12 && hours < 17) {
      return "Eftermiddag"; // Afternoon
    } else if (hours >= 17 && hours < 23) {
      return "Kväll"; // Evening
    } else {
      return "Natt"; // Nighttime
    }
  };

  const [ctime, setTime] = useState(getTime);
  const [cdate, setDate] = useState(getDate);
  const [cweekday, setWeekday] = useState(getWeekday);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay);

  // Function to update time, date, weekday, and time of day
  const UpdateTime = () => {
    setTime(getTime());
    setDate(getDate());
    setWeekday(getWeekday());
    setTimeOfDay(getTimeOfDay());
  };

  useEffect(() => {
    const timerId = setInterval(UpdateTime, 1000); // Update every second
    return () => clearInterval(timerId); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h1>{ctime}</h1>
      <h2>{cweekday}</h2>
      <h2>{cdate}</h2>
      <h3>{timeOfDay}</h3>
    </div>
  );
}


export default App
