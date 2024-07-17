import fakeData from "./data";
const KEY = "R3LREVKM6R9MKZCD75K3P8TE3";
const url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export default async function getData(location) {
  const dataUrl = `${url}${location}/?key=${KEY}`;

  // Commenting so I don't get more requests than what I have
  try {
    const data = await fetch(dataUrl, { mode: "cors" });
    const dataJSON = await data.json();

    // const dataJSON = await fakeData();
    const getDays = () => dataJSON.days;
    const getHours = (index) => dataJSON.days[index].hours;
    const getDayCondition = (index) => dataJSON.days[index].conditions;
    const getHourTempF = (index) => dataJSON.days[index].temp;
    const getLocation = () => dataJSON.resolvedAddress;
    const getIcon = () => dataJSON.currentConditions.icon;
    const getCurrentTemp = () => dataJSON.currentConditions.temp;
    console.log(dataJSON);
    return {
      dataJSON,
      getDays,
      getHours,
      getDayCondition,
      getHourTempF,
      getLocation,
      getIcon,
      getCurrentTemp,
    };
  } catch {
    console.log("Failed Fetching");

    return 1;
  }
}
