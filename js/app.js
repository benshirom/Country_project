import { getCountries,fillSelectBox,startPreviewCountries, } from "./CountryManager.js";
import { declareEvents } from "./Events.js";

const init = () => {

  doApi();
  declareEvents();
  
};
const doApi = async () => {
  let url = "https://restcountries.com/v3.1/all";
  let resp = await fetch(url);
  let data = await resp.json();

  //get data to arr and sort by name
  getCountries(data);

  //first pre of 5 countreis
  startPreviewCountries();

  fillSelectBox();
};

init();
