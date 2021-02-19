let yyyymmddhhmmss=(str)=>{
  var yearstr = str.getFullYear() + '-';
  var monthstr = (str.getMonth() + 1 < 10 ? '0' + (str.getMonth() + 1) : str.getMonth() + 1) + '-';
  var datesstr = (str.getDate() < 10 ? '0' + (str.getDate()) : str.getDate()) + ' ';
  var hourstr = (str.getHours() < 10 ? '0' + (str.getHours()) : str.getHours()) + ':';
  var minutestr = (str.getMinutes() < 10 ? '0' + (str.getMinutes()) : str.getMinutes()) + ':';
  var secondstr = (str.getSeconds() < 10 ? '0' + (str.getSeconds()) : str.getSeconds());
  return yearstr + monthstr + datesstr + hourstr + minutestr + secondstr;
}

let hundredDay=(date)=>{
  return Math.floor((new Date(date).getTime()-new Date('2020-11-07 05:20:00').getTime())/(24 * 3600 * 1000))
}
export {
  yyyymmddhhmmss,
  hundredDay
}