const elapsedTime = timestamp => {
  const ms = {
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000
  };
  let seconds = Math.floor((timestamp / ms.second) % 60);
  let minutes = Math.floor((timestamp / ms.minute) % 60);
  let hours = Math.floor((timestamp / ms.hour) % 24);
  let days = Math.floor(timestamp / ms.day);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const timestampToDateTime = timestamp => {
  const dateObject = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(dateObject);

  return formattedDate;
};
const rndInt = Math.floor(Math.random() * 86400000);
console.log(rndInt);
const now = Date.now();
//172800000
console.log(timestampToDateTime(now - rndInt));

elapsedTime(rndInt);
