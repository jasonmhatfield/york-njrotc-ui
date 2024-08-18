export const calculateTotalHours = (events, period) => {
  const now = new Date();
  let totalHours = 0;

  events.forEach(event => {
    const eventDate = new Date(event.date);
    switch (period) {
      case 'week':
        if (now - eventDate <= 7 * 24 * 60 * 60 * 1000) totalHours += event.hours;
        break;
      case 'month':
        if (now.getMonth() === eventDate.getMonth() && now.getFullYear() === eventDate.getFullYear()) totalHours += event.hours;
        break;
      case 'quarter':
        if (Math.floor(now.getMonth() / 3) === Math.floor(eventDate.getMonth() / 3) && now.getFullYear() === eventDate.getFullYear()) totalHours += event.hours;
        break;
      case 'semester':
        if (Math.floor(now.getMonth() / 6) === Math.floor(eventDate.getMonth() / 6) && now.getFullYear() === eventDate.getFullYear()) totalHours += event.hours;
        break;
      case 'schoolYear':
        const schoolYearStart = new Date(now.getFullYear(), 8, 1); // September 1st
        if (eventDate >= schoolYearStart || (eventDate < now && eventDate >= new Date(schoolYearStart.getFullYear() - 1, 8, 1))) totalHours += event.hours;
        break;
    }
  });

  return totalHours;
};