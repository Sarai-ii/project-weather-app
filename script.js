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
// Removing Previous Search Text & Adding Input Into That Section As a List
    if(locationInput){
        if(document.querySelector("#no-search")){
            document.querySelector("#no-search").remove()
        }
        const unOrdered = document.querySelector(".weather-history ul")
        const search = document.createElement("li")
        search.innerText = locationInput
        unOrdered.prepend(search) 
    }

    fetch(`https://wttr.in/${locationInput}?format=j1`)
    .then((response) => response.json())
    .then((data) =>  {
        let near = data.nearest_area[0]
        let region = near.region[0].value
        let country = near.country[0].value
        let currently = data.current_condition[0].FeelsLikeF
        const article = document.querySelector("#current-weather")

        article.innerHTML = `
            <p id="area">${locationInput}</p>
            <p id="region">${region}</p>
            <p id="country">${country}</p>
            <p id="currently">${currently}°F</p>
        `
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