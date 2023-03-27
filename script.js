const form = document.querySelector("form")
const submit = document.querySelector("submit-button")
const main = document.querySelector("main")
// const locationInput = document.querySelector("#location-input")
// const info = document.querySelector("#location-name").innerHTML
// console.log(info)

form.addEventListener("submit", (event)=> {
    event.preventDefault()
//Defining The Value Of The Input
    const locationInput = event.target[0].value

    fetch(`https://wttr.in/${locationInput}?format=j1`)
    .then((response) => response.json())
    .then((data) =>  {

// Weather Information Fetched from Link Being Displayed on Webpage
        let near = data.nearest_area[0]
        let region = near.region[0].value
        let country = near.country[0].value
        let currently = data.current_condition[0].FeelsLikeF
        const article = document.querySelector("#current-weather")

        article.innerHTML = `
            <p id="area"><strong>Nearest Area:</strong> ${locationInput}</p>
            <p id="region"><strong>Region:</strong> ${region}</p>
            <p id="country"><strong>Country:</strong> ${country}</p>
            <p id="currently"><strong>Currently:</strong> ${currently}°F</p>
        `

// Removing Previous Search Text & Adding Input Into That Section As a List
        if(locationInput){
            if(document.querySelector("#no-search")){
               document.querySelector("#no-search").remove()
           }
           const unOrdered = document.querySelector(".weather-history ul")
           const search = document.createElement("li")
           const link = document.createElement("a")
           link.setAttribute("href","http://127.0.0.1:5500/index.html?")
           link.innerText = `${locationInput}`
           search.innerText = ` - ${currently}°F`
           unOrdered.prepend(search) 
           search.prepend(link)
       }

// Adding 3-Day Forecast into Aside>Article Section
        const upcoming = document.querySelectorAll(".upcoming")
        const forecast =  data.weather
        const today = forecast[0]
        const tomorrow = forecast[1]
        const after = forecast[2]
    
        upcoming[0].innerHTML = `
            <h4>Today:</h4>
            <h4>Average Temperature:</h4>
            <p>${today.avgtempF}°F</p>
            <h4>Max Temperature:</h4>
            <p>${today.maxtempF}°F</p>
            <h4>Min Temperature:</h4>
            <p>${today.mintempF}°F</p>
        `
        upcoming[1].innerHTML = `
            <h4>Tomorrow:</h4>
            <h4>Average Temperature:</h4>
            <p>${tomorrow.avgtempF}°F</p>
            <h4>Max Temperature:</h4>
            <p>${tomorrow.maxtempF}°F</p>
            <h4>Min Temperature:</h4>
            <p>${tomorrow.mintempF}°F</p>
        `
        upcoming[2].innerHTML = `
            <h4>Day After Tomorrow: </h4>
            <h4>Average Temperature:</h4>
            <p>${after.avgtempF}°F</p>
            <h4>Max Temperature:</h4>
            <p>${after.maxtempF}°F</p>
            <h4>Min Temperature:</h4>
            <p>${after.mintempF}°F</p>
        `
        upcoming.append(main)

    })
    .catch((error) =>{
        console.log(error);
    });
    form.reset();

});
const converter = document.querySelector("#temperature-converter")
const farenheit = document.querySelector("#to-f")
const celsius = document.querySelector("#to-c")
const convertedTemp = document.querySelector("#converted-temperature")
let value = 0

converter.addEventListener("submit", (event)=> {
    event.preventDefault()
    // const convertInput = document.querySelector("temp-to-convert")
   const convertInput = event.target[0].value
    
   if(celsius.checked){
      value += (convertInput * 9/5) + 32
      convertedTemp.innerText = value
    console.log(value)
}
    else { 
        value += (convertInput - 32) * 5/9
        convertedTemp.innerText = value
        console.log(value)
        
}
 })
 