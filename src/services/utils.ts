export const getDate = (date: Date) => {
  const today: Date = new Date();
  const theDate: Date = new Date(date);
  let hours: number | string = theDate.getHours();
  let minutes: number | string = theDate.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  today.setHours(0, 0, 0, 0);
  theDate.setHours(0, 0, 0, 0);
  let day: number | string = (+today - +theDate) / (24 * 60 * 60 * 1000);
  if (day === 0) {
    day = "Сегодня";
  } else if (day === 1) {
    day = "Вчера";
  } else if (day > 1) {
    day = day + " дн. назад";
  }
  const time: number = theDate.getTimezoneOffset() / 60;
  return day + ", " + hours + ":" + minutes + " i-GMT" + (time > 0 ? time : "+" + time * -1);
};
