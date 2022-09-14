import Country from "./Country.js";
let allCountries_ar = [];
const firstCountries = [
  "israel",
  "united states",
  "france",
  "united kingdom",
  "thailand",
];

export const searchByName = (_input) => {
  let arr = allCountries_ar.filter((item) =>
    item.name.common.toLowerCase().includes(_input.toLowerCase())
  );
  return arr;
}
export const searchByNameCode = (_input) => {
  let arr = allCountries_ar.filter((item) =>
    item.cca3.toLowerCase().includes(_input.toLowerCase())
  );
  return arr;
}
//render country by name 
export const createCountry = (_input) => {
  document.querySelector("#id_parent").innerHTML = "";
  let arr = searchByName(_input);

  if (arr.length > 0) {

    let country = new Country("#id_parent", arr[0],setFuncCountry);
    country.render();

  } else {
    countryNotFound(_input)
  }


  document.querySelector("#id_load").classList.add("d-none");
  if (arr[0] != null) { return arr[0].name.common }
};

//render country by county code "cca3"
export const createCountryByCode = (_input) => {
  document.querySelector("#id_parent").innerHTML = "";

  let arr = searchByNameCode(_input);

  if (arr.length > 0) {
    arr.forEach((item) => {
      let country = new Country("#id_parent", item,setFuncCountry);
      country.render();
    });
  }
  else {
    countryNotFound(_input);

  }
  document.querySelector("#id_load").classList.add("d-none");
  if (arr[0] != null) { return arr[0].name.common }
};

// get data to arr and sort by abc
export const getCountries = (_data) => {
  allCountries_ar = _data;
  mySort();
  // console.log(allCountries_ar);
};

//render to the first preview countries
export const startPreviewCountries = () => {
  document.querySelector("#id_input").value = "";

  document.querySelector("#id_load").classList.add("d-none");
  let tmpArr = [];
  tmpArr = allCountries_ar.filter((item) =>
    firstCountries.includes(item.name.common.toLowerCase())
  );
  tmpArr.forEach((item) => {
    let country = new Country("#id_parent", item,setFuncCountry);
    country.previewRender();
  });
};
// function that is activated in on search and displays the previewRender
export const searchPreviewCountry = (_input) => {
  document.querySelector("#id_parent").innerHTML = "";
  let arr = searchByName(_input)

  if (arr.length > 0) {
    arr.forEach((item) => {
      let country = new Country("#id_parent", item,setFuncCountry);
      country.previewRender();
    });
  }
  else {
    countryNotFound(_input)
  }
  document.querySelector("#id_load").classList.add("d-none");
  if (arr[0] != null) { return arr[0].name.common }
}

// fill the options to select box
export const fillSelectBox = () => {
  let select = document.querySelector("#id_select_country");

  allCountries_ar.forEach((item) => {
    select.innerHTML += `
    <option value="${item.name.common}">${item.name.common}</option>`;
  });
};
//sort by abc
const mySort = () => {
  allCountries_ar.sort(function (a, b) {
    let x = a.name.common.toLowerCase();
    let y = b.name.common.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
};
// 
const countryNotFound = (_input) => {
  let parent = document.querySelector("#id_parent");
  parent.classList.add("row");
  parent.innerHTML = `  
  <div class="card Myprecard-body " style="width: 18rem;">
  <div class="card-body text-center">
    <h5 class="card-title Mycard-text">sorry...</h5>
    <h6 class="card-subtitle mb-2  Mycard-text">Country <b>${_input}</b> is  not found</h6>
    
  </div>
</div> `
    ;
  let btn = document.createElement("button")
  btn.className = "btn btn-light";
  btn.type = "button";
  btn.innerHTML = "OK";
  btn.addEventListener("click", () => {
    document.querySelector(
      "#id_parent"
    ).innerHTML = "";
    startPreviewCountries();
  })
  document.querySelector(".card-body").append(btn);
}
// async func that give the country name 
export const getNameByCodeCountry = async (_code) => {
  let url = `https://restcountries.com/v3.1/alpha/${_code.toLowerCase()}`;
  let resp = await fetch(url);
  let data = await resp.json();
  let { name } = data[0];
  return name.common;

}
/// func used by the country class 
const setFuncCountry={
  getNameByCodeCountry,
  createCountryByCode,
  startPreviewCountries
}

