import { getNameByCodeCountry, createCountryByCode } from "./CountryManager.js";

export default class Country {
  constructor(_parent, _item) {
    this.parent = _parent;
    this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
    this.name = _item.name.common;
    this.capital = _item.capital;
    this.languages = Object.values(_item.languages).join();
    this.flag = _item.flags.png;
    this.lat = _item.latlng[0];
    this.lon = _item.latlng[1];
    this.countryCode = _item.cca3;
    this.borders = _item.borders ? _item.borders : "none";
  }

  // display full card of country
  render() {
    
    let myDiv = document.createElement("div");
    myDiv.className = "";
    document.querySelector(this.parent).append(myDiv);
    document.querySelector(this.parent).className = "g-3 py-5  justify-content-center justify-content-around align-items-center";
    myDiv.innerHTML = `
    <div class="card border-0" data-aos="zoom-in-up" data-aos-duration="1500">
      <div class="card-body Mycard-body d-md-flex p-0 justify-content-lg-between">
        <div class="card-text partCardBody">
          <h1 class="card-header Mycard-header text-center">${this.name}</h1>
          <p class="card-text Mycard-text">Population : ${this.pop}.</p>
          <p class="card-text Mycard-text">Capital :${this.capital}. </p>
    
          <p class="card-text Mycard-text" id="id_borders">  </p>
          <p class="card-text Mycard-text">languages :${this.languages}. </p>
          <div class="flagImg">
          <img src="${this.flag} " alt="${this.name}" style="width: 100%; height: 100%;">
          </div>
        </div>
      <div class="partCardBody">
        <div class="map">
          <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
           src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=es&z=14&amp;output=embed">
          </iframe>
        </div>
      </div>

     </div>
    </div>`;

    let spanborder = document.createElement("span")
     spanborder.innerHTML = "Borders : ";

    let pBorder = document.querySelector("#id_borders")
    pBorder.append(spanborder);

    let lastborrdername;

    if (this.borders != "none") {
      if (this.borders.length == 1) {
        this.borders.forEach(async (item) => {
          const name = await getNameByCodeCountry(item)
          let span = document.createElement("span");
          span.style = "cursor: pointer";
          span.innerHTML = `${name}.`;
          pBorder.append(span);

          span.addEventListener("click", () => {
            createCountryByCode(item);
          });

        });
      }
      else if (this.borders.length > 1) {
        lastborrdername = this.borders.pop();
        let lastBorder = document.createElement("span")
        this.borders.forEach(async (item) => {
          lastBorder.innerHTML = `${await getNameByCodeCountry(lastborrdername)}.`;

          const name = await getNameByCodeCountry(item)
          let span = document.createElement("span");
          span.className = "borderstyle";
          span.style = "cursor: pointer";
          span.innerHTML = `${name}, `;
          pBorder.append(span);

          span.addEventListener("click", () => {
            createCountryByCode(item);
          });

          lastBorder.addEventListener("click", () => {
            createCountryByCode(lastborrdername);
          });

          lastBorder.className = "borderstyle";
          lastBorder.style = "cursor: pointer";
          pBorder.append(lastBorder);
        });
        
        this.borders.push(lastborrdername);
      }
    }
    else {
      pBorder.innerHTML += "none";
    }
  }

  // display preview card of country
  previewRender() {
    let myDiv = document.createElement("div");
    myDiv.className = "d-flex justify-content-center my-3";
    document.querySelector(this.parent).append(myDiv);
    document.querySelector(this.parent).className = "row row-cols-lg-3 row-cols-md-2 g-3 pt-4 justify-content-center justify-content-around align-items-center";
    myDiv.innerHTML += `
        <div class="card preBox border-0" style="width: 18rem; " data-aos-delay="300" data-aos-duration="1500" data-aos="zoom-in">
        <img src="${this.flag}" class="card-img-top" alt="${this.name}">
        <div class="card-body Myprecard-body ">
          <p class="card-text Mycard-text">Name: ${this.name}. </p>
          <p class="card-text Mycard-text">Capital :${this.capital}. </p>
          <p class="card-text Mycard-text text-center"> click for more info</p>
        </div>
      </div>
        `;
    myDiv.querySelector(".preBox").addEventListener("click", () => {
      document.querySelector("#id_parent").innerHTML = "";
      document.querySelector("#id_input").value = this.name;
      document.querySelector("#id_select_country").value = this.name;
      this.render();
    });
  }
}
