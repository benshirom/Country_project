
export default class Country {
  constructor(_parent, _item, _setFuncCountry) {
    console.log(_item)
    this.getNameByCodeCountry = _setFuncCountry.getNameByCodeCountry;
    this.createCountryByCode = _setFuncCountry.createCountryByCode;
    this.startPreviewCountries = _setFuncCountry.startPreviewCountries;

    this.parent = _parent;
    this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
    this.name = _item.name.common;
    this.capital = _item.capital ? _item.capital : "none";
    this.languages = _item.languages ? Object.values(_item.languages).join(", ") : "none";
    this.flag = _item.flags.png;
    this.lat = _item.latlng[0];
    this.lon = _item.latlng[1];
    this.countryCode = _item.cca3;
    this.borders = _item.borders ? _item.borders : "none.";
  }

  // display full card of country
  render() {
    console.log(this.borders)
    let myDiv = document.createElement("div");
    myDiv.className = "";
    document.querySelector(this.parent).append(myDiv);
    document.querySelector(this.parent).className = "g-3 py-5  justify-content-center justify-content-around align-items-center";
    myDiv.innerHTML = `
    <div class="card border-0" data-aos="zoom-in-up" data-aos-duration="1500">
      <div class="card-body Mycard-body d-md-flex p-0 justify-content-lg-between">
        <div class="card-text partCardBody">
          <h1 class="card-header Mycard-header text-center ">
          <i id="id_home_btn" class="fa fa-home home_btn" aria-hidden="true"></i>
          <span class="  " >${this.name}</span>
          </h1>
          <p class="card-text Mycard-text">Population : ${this.pop}.</p>
          <p class="card-text Mycard-text">Capital : ${this.capital}. </p>
    
          <div class="card-text Mycard-text" id="id_borders">  </div>
          <p class="card-text Mycard-text">Languages : ${this.languages}. </p>
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

// retern to first display btn
    document.querySelector("#id_home_btn").addEventListener("click", () => {
      document.querySelector(this.parent).innerHTML = "";
      document.querySelector("#id_input").value = "";
      document.querySelector("#id_select_country").value = 0;
      this.startPreviewCountries();
    });

    // disply the headline border
    let spanborder = document.createElement("span")
    spanborder.innerHTML = "Borders : ";
    let pBorder = document.querySelector("#id_borders")
    pBorder.append(spanborder);

    let lastborrdername;
    //check if the borders is empty
    if (this.borders != "none.") {
      
      if (this.borders.length == 1) {
        this.borders.forEach(async (item) => {
          const name = await this.getNameByCodeCountry(item)
          let span = document.createElement("span");
          span.className = "borderstyle";
          span.innerHTML = ` ${name}.`;
          pBorder.append(span);

          span.addEventListener("click",async () => {
            document.querySelector("#id_input").value = await name;
            document.querySelector("#id_select_country").value = await name;
            this.createCountryByCode(item);
          });

        });
      }
      else if (this.borders.length > 1) {
        lastborrdername = this.borders.pop();
        let lastCountryName;
        let lastBorder = document.createElement("span")
        this.borders.forEach(async (item) => {

          lastCountryName = await this.getNameByCodeCountry(lastborrdername);
          lastBorder.innerHTML = `${lastCountryName}.`;
          const name = await this.getNameByCodeCountry(item)
          let span = document.createElement("span");
          span.className = "borderstyle";
          span.innerHTML = ` ${name}, `;
          pBorder.append(span);

          span.addEventListener("click", () => {
            document.querySelector("#id_input").value = name;
            document.querySelector("#id_select_country").value = name;
            this.createCountryByCode(item);
          });
          pBorder.append(lastBorder);
        });
        lastBorder.addEventListener("click", () => {
          document.querySelector("#id_input").value = lastCountryName;
          document.querySelector("#id_select_country").value = lastCountryName;
          this.createCountryByCode(lastborrdername);
        });

        lastBorder.className = "borderstyle";
        this.borders.push(lastborrdername);
      }
    }
    else {
      spanborder.innerHTML += this.borders;
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
          <p class="card-text Mycard-text">Name: ${this.name} </p>
          <p class="card-text Mycard-text">Capital :${this.capital} </p>
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
