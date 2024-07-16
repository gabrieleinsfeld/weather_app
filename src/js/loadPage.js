import getData from "./getData";

export default async function loadPage() {
  const data = await getData("porto+alegre");
  console.log(data.getDays());
}
