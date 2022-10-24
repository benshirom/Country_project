import { createCountry, createCountryByCode, startPreviewCountries, searchPreviewCountry } from "./CountryManager.js";

export const declareEvents = () => {

    let id_Logo = document.querySelector("#id_home")
    let parent = document.querySelector("#id_parent")
    let select_box = document.querySelector("#id_select_country")
    let search_btn = document.querySelector("#id_search_btn")
    let input_search = document.querySelector("#id_input")
   
    let israel_li = document.querySelector(".id_israel")
    let USA_li = document.querySelector("#id_USA_li")
    let France_li = document.querySelector("#id_France_li")
    let UK_li = document.querySelector("#id_UK_li")
    let thailand_li = document.querySelector("#id_thailand_li")
    
    
    
    id_Logo.addEventListener("click", () => {
        parent.innerHTML = "";
        startPreviewCountries();
        select_box.value=0;
    })

    select_box.addEventListener("change", () => {
        if (select_box.value != "0") {
            parent.innerHTML = "";
            createCountry(select_box.value);
            input_search.value = select_box.value;
        }
    })
    
    search_btn.addEventListener("click", () => {
        if (input_search.value === "" || input_search.value === " ") {
            console.log("Empty")
        } else {
            parent.innerHTML = "";
            select_box.value= searchPreviewCountry(input_search.value);
            
        }
    })
    input_search.addEventListener("keypress",(e)=>{
        if (input_search.value === "" || input_search.value === " ") {
            console.log("Empty")
        }else if(e.key=="Enter"){
            parent.innerHTML = "";
            select_box.value= searchPreviewCountry(input_search.value);
        }
    })

    // Event Listener to specific countries in the nav bar
    israel_li.addEventListener("click", () => {
        parent.innerHTML = "";
        compere(createCountryByCode("isr"));
        
    })
    USA_li.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("USA");
    })
    France_li.addEventListener("click", () => {
        parent.innerHTML = "";
        compere(  createCountryByCode("fra"));
    })
    UK_li.addEventListener("click", () => {
        parent.innerHTML = "";
        compere( createCountryByCode("gbr"));
    })
    thailand_li.addEventListener("click", () => {
        parent.innerHTML = "";
        compere( createCountryByCode("tha"));
    })

// Compere The Input search and The Select Box value
    const compere = (_input) => {
        input_search.value=_input;
        select_box.value=_input;
    }
}
