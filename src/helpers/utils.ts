export function TimeOfLastMessage(date: string, time: string) {
  const mappedDate = new Date(date);
  const currentDate = new Date(Date.now());
  const currentWeekday: number = new Date(Date.now()).getDay();

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  };

  if (currentDate.getMonth() == mappedDate.getMonth()) {
    if (currentDate.getDate() - mappedDate.getDate() == 0) {
      return time;
    } else if (currentDate.getDate() - mappedDate.getDate() < currentWeekday) {
      return mappedDate.toLocaleDateString('en-US', { weekday: options.weekday });
    }
  } else {
    if (currentDate.getFullYear() == mappedDate.getFullYear()) {
      return mappedDate.toLocaleDateString('en-US', { month: options.month, day: options.day });
    } else {
      return mappedDate.toLocaleDateString('en-US', {
        month: options.month,
        day: options.day,
        year: options.year,
      });
    }
  }
}
