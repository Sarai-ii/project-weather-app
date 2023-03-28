const form = document.querySelector("form")
const submit = document.querySelector("submit-button")
const main = document.querySelector("main")
// const locationInput = document.querySelector("#location-input")
// const info = document.querySelector("#location-name").innerHTML
// console.log(info)

const searchWeather = (locationInput) => {
    
//Defining The Value Of The Input

    fetch(`https://wttr.in/${locationInput}?format=j1`)
    .then((response) => response.json())
    .then((data) => {
        let near = data.nearest_area[0]
        let region = near.region[0].value
        let country = near.country[0].value
        let currently = data.current_condition[0].FeelsLikeF
        const forecast = data.weather
        const today = forecast[0]
        const tomorrow = forecast[1]
        const after = forecast[2]
        const article = document.querySelector("#current-weather")
        const upcoming = document.querySelectorAll(".upcoming")

    
// Weather Information Fetched from Link Being Displayed on Main
        //Adding Chance of Data
        let hour = data.weather[0].hourly[0]
        let sun = hour.chanceofsunshine
        let rain = hour.chanceofrain
        let snow = hour.chanceofsnow
        let weatherIcon = document.querySelector("img")
            
        if(sun > 50){
            weatherIcon.src="./assets/icons8-summer.gif"
            weatherIcon.alt="sun"
        } else if (rain > 50){
            weatherIcon.src="./assets/icons8-torrential-rain.gif"
            weatherIcon.alt="rain"
        } else if (snow > 50) {
            weatherIcon.src="./assets/icons8-light-snow.gif"
            weatherIcon.alt="snow"
        } else {
            weatherIcon.src="./assets/icons8-wind.gif"
            weatherIcon.alt="wind"
        }
        article.innerHTML = `
                ${weatherIcon.outerHTML}           
            <h2 id="area">${locationInput}</h2>
            <p id="nearest"><strong>Nearest Area:</strong> ${locationInput}</p>
            <p id="region"><strong>Region:</strong> ${region}</p>
            <p id="country"><strong>Country:</strong> ${country}</p>
            <p id="currently"><strong>Currently:</strong> Feels Like ${currently}°F</p>
            <p id="sunshine"><strong>Chance of Sunshine:</strong> ${sun}%</p>
            <p id="rain"><strong>Chance of Rain:</strong> ${rain}%</p>
            <p id="snow"><strong>Chance of Snow:</strong> ${snow}%</p>
        `
        //Imperfect Matching
        const area = near.areaName[0].value
        const temp = document.querySelector("#nearest")
        if (locationInput.toLowerCase() == area.toLowerCase()) {
            temp.innerHTML = `<strong>Area:</strong> <em>${area}</em>`
        } else {
            temp.innerHTML = `<strong>Nearest Area:</strong> <em>${area}</em>`
        }

// Removing Previous Search Text & Adding Input Into That Section As a List
        if(locationInput){
            if(document.querySelector("#no-search")){
               document.querySelector("#no-search").remove()
           }
           const unOrdered = document.querySelector(".weather-history ul")
           const search = document.createElement("li")
           const link = document.createElement("a")
          
        link.addEventListener("click", (event) => {
            searchWeather(locationInput, false)
        })

           link.setAttribute("href", "#")
           link.innerText = `${locationInput}`
           search.innerText = ` (${currently}°F)`
           unOrdered.prepend(search) 
           search.prepend(link)
       }

// Adding 3-Day Forecast into Aside>Article Section
      
        upcoming[0].innerHTML = `
            <h5>Today:</h5>
            <h5>Average Temperature:</h5>
            <p>${today.avgtempF}°F</p>
            <h5>Max Temperature:</h5>
            <p>${today.maxtempF}°F</p>
            <h5>Min Temperature:</h5>
            <p>${today.mintempF}°F</p>
        `
        upcoming[1].innerHTML = `
            <h5>Tomorrow:</h5>
            <h5>Average Temperature:</h5>
            <p>${tomorrow.avgtempF}°F</p>
            <h5>Max Temperature:</h5>
            <p>${tomorrow.maxtempF}°F</p>
            <h5>Min Temperature:</h5>
            <p>${tomorrow.mintempF}°F</p>
        `
        upcoming[2].innerHTML = `
            <h5>Day After Tomorrow: </h5>
            <h5>Average Temperature:</h5>
            <p>${after.avgtempF}°F</p>
            <h5>Max Temperature:</h5>
            <p>${after.maxtempF}°F</p>
            <h5>Min Temperature:</h5>
            <p>${after.mintempF}°F</p>
        `
        upcoming.append(main)
       
    })
    .catch((error) =>{
        console.log(error);
    });
    form.reset();

}
form.addEventListener("submit", (event)=> {
    event.preventDefault()
    const locationInput = event.target[0].value
    searchWeather(locationInput, true)
});


// CONVERTING TEMPERATURE WIDGET

    const converter = document.querySelector("#temperature-converter")
    const fahrenheit = document.querySelector("#to-f")
    const celsius = document.querySelector("#to-c")
    const convertedTemp = document.querySelector("#converted-temperature")
    let value = 0

    converter.addEventListener("submit", (event)=> {
    event.preventDefault()
    //  const convertInput = document.querySelector("temp-to-convert")
        const convertInput = event.target[0].value
        console.log(event)
    
   if(celsius.checked){
      value = (convertInput * 9/5) + 32
      convertedTemp.innerText = value.toFixed(2)
    console.log(value)
}
    else { 
        value = (convertInput - 32) * 5/9
        convertedTemp.innerText = value.toFixed(2)
        console.log(value)
}

 })
