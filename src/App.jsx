import { useState, useEffect } from 'react';
import './App.css';
import useDayNightMode from "./hooks/useDayNightMode";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';

function App() {
  // Invoke the day/night mode hook
  useDayNightMode();

  // Enable translations
  const { t, i18n } = useTranslation();

  // Helper function to capitalize the first letter
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const getTime = () => {
    return new Intl.DateTimeFormat(i18n.language, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: i18n.language === 'en' // Use am/pm format for English
    }).format(new Date());
  };

  const getDate = () => {
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const month = capitalize(
      new Date().toLocaleDateString(i18n.language, { month: "long" })
    ); // Capitalized month
    return `${day} ${month} ${year}`;
  };

  const getWeekday = () => {
    const weekday = new Date().toLocaleDateString(i18n.language, { weekday: "long" });
    return capitalize(t(weekday.toLowerCase()));
  }

  // Determine the part of the day based on the current hour
  const getTimeOfDay = () => {
    const hours = new Date().getHours();

    if (hours >= 6 && hours < 9) {
      return "morning";
    } else if (hours >= 9 && hours < 12) {
      return "day";
    } else if (hours >= 12 && hours < 17) {
      return "afternoon";
    } else if (hours >= 17 && hours < 23) {
      return "evening";
    } else {
      return "night";
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
      {/* Dynamic Meta Tags and Title with react-helmet */}
      <Helmet>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')}/>
      </Helmet>
      <Analytics />

      <h1>{ctime}</h1>
      <h2>{cweekday}</h2>
      <h2>{cdate}</h2>
      <h3>{t(timeOfDay)}</h3>
    </div>
  );
}


export default App
