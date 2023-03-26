const form = document.querySelector("form")
const submit = document.querySelector("submit-button")
const info = document.querySelector("#location-name").innerHTML
console.log(info)

form.addEventListener("submit", (event)=> {
    event.preventDefault()

    const locationInput = event.target[0].value

    if(locationInput){
        if(document.querySelector("#no-search")){
            document.querySelector("#no-search").remove()
        }
        const unOrdered = document.querySelector(".weather-history ul")
        const search = document.createElement("li")
        search.innerText = locationInput
        unOrdered.prepend(search) 
    }


    // const locationInput = document.querySelector("#location-input")
    // console.log(locationInput.value)

    fetch(`https://wttr.in/${locationInput}?format=j1`)
    .then((response) => response.json())
    .then((data) =>  {
        let near = data.nearest_area[0]
        let region = near.region[0].value
        let country = near.country[0].value
        let currently = data.current_condition[0].FeelsLikeF
        const main = document.querySelector("#current-weather")

        main.innerHTML = `
            <p id="area">${locationInput}</p>
            <p id="region">${region}</p>
            <p id="country">${country}</p>
            <p id="currently">${currently}</p>
        `
        console.log(main.textContent)
    })
    .catch((error) =>{
        console.log(error);
    });
form.reset();

});