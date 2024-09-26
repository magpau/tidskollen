// src/hooks/useDayNightMode.js
import { useEffect } from 'react';

export default function useDayNightMode() {
  // Function to determine whether it's day or night based on the current hour
  const checkDayOrNight = () => {
    const now = new Date();
    const hours = now.getHours();

    // 6 AM - 6 PM is considered day, otherwise night
    const isNight = hours < 6 || hours >= 18;

    // Apply or remove the night mode class based on time
    if (isNight) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
  };

  // Set up the check on component mount and update it every minute
  useEffect(() => {
    checkDayOrNight(); // Initial check when the component mounts
    const intervalId = setInterval(checkDayOrNight, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clean up the interval when unmounting
  }, []);
}