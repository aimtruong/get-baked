
const addDateSuffix = date => {
    let dateStr = date.toString();
  
    // get last char of date string
    const lastChar = dateStr.charAt(dateStr.length - 1);
  
    if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}/`;
    } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}/`;
    } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}/`;
    } else {
      dateStr = `${dateStr}/`;
    }
  
    return dateStr;
  };
  
  // function to format a timestamp, accepts the timestamp and an `options` object as parameters
  module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {
    // create month object
    const months = {
      0: monthLength === 'short' ? '1/' : 'January',
      1: monthLength === 'short' ? '2/' : 'February',
      2: monthLength === 'short' ? '3/' : 'March',
      3: monthLength === 'short' ? '4/' : 'April',
      4: monthLength === 'short' ? '5/' : 'May',
      5: monthLength === 'short' ? '6/' : 'June',
      6: monthLength === 'short' ? '7/' : 'July',
      7: monthLength === 'short' ? '8/' : 'August',
      8: monthLength === 'short' ? '9/' : 'September',
      9: monthLength === 'short' ? '10/' : 'October',
      10: monthLength === 'short' ? '11/' : 'November',
      11: monthLength === 'short' ? '12/' : 'December'
    };
  
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
  
    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();
  
    const year = dateObj.getFullYear();
    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() / 2)
        : dateObj.getHours();
  
    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) {
      hour = 12;
    }
  
    const minutes = dateObj.getMinutes();
  
    // set `am` or `pm`
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
  
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth} ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
  };
  