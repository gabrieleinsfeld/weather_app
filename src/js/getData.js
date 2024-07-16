const KEY = "R3LREVKM6R9MKZCD75K3P8TE3";
const url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export default async function getData(location) {
  const dataUrl = `${url}${location}/?key=${KEY}`;
  const data = await fetch(dataUrl, { mode: "cors" });
  const dataJSON = await data.json();

  const getDays = () => dataJSON.days;
  const getHours = (index) => dataJSON.days[index];
  const getDayCondition = (index) => dataJSON.days[index].conditions;
  const getHourTemp = (index) => dataJSON.days[index].temp;

  console.log(dataJSON);
  return { dataJSON, getDays, getHours, getDayCondition, getHourTemp };
}
