export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const timeZoneOffset = (-1 * date.getTimezoneOffset()) / 60;

  date.setHours(date.getHours() + timeZoneOffset);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  const timeZoneOffset = (-1 * date.getTimezoneOffset()) / 60;

  date.setHours(date.getHours() + timeZoneOffset);

  const formattedTime = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return formattedTime;
};

export const formatDateToText = (dateString: string) => {
  const date = new Date(dateString);

  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const timeZoneOffset = (-1 * date.getTimezoneOffset()) / 60;

  // Корректируем часы в соответствии с временной зоной
  date.setHours(date.getHours() + timeZoneOffset);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${day} ${month} ${year} в ${hours}:${minutes}`;

  return formattedDate;
};
