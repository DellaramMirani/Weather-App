const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const cityDisplay = document.getElementById("cityDisplay");
const tempDisplay = document.getElementById("tempDisplay");
const feelsDisplay = document.getElementById("feelsDisplay");
const humididtyDisplay = document.getElementById("humididtyDisplay");
const descDisplay = document.getElementById("descDisplay");
const emojiDisplay = document.getElementById("emojiDisplay");
const loader = document.getElementById("loader");
const card = document.querySelector(".card");
const apiKey = "2b00f00801e82503f7c057408bff880e";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            showLoader();
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            displayError("Enter A Valid City");
        }
        finally {
            hideLoader();
        }
    }
    else {
        displayError("Please Enter A City")
    }
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
        throw new Error("Could Not Fetch Weather Data")
    }
    return await response.json();
}
function displayWeatherInfo(data) {
    console.log(data);
    const { name: city,
        main: { temp, humidity, feels_like },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
    feelsDisplay.textContent = `Feels like ${(feels_like - 273.15).toFixed(0)}°C`;
    humididtyDisplay.textContent = `Humididy : ${humidity}`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(emojiDisplay);
    card.appendChild(feelsDisplay);
    card.appendChild(descDisplay);
    card.appendChild(humididtyDisplay);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦";
        case (weatherId >= 400 && weatherId < 500):
            return "🌦";
        case (weatherId >= 500 && weatherId < 600):
            return "🌨";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "⁉";
    }
}
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.style.color = "gray";
    errorDisplay.style.fontSize = "2rem";
    errorDisplay.style.fontWeight = "700";
    card.textContent = "";
    card.style.display = "flex"
    card.appendChild(errorDisplay);
}
function showLoader() {
    loader.classList.remove("hidden");
}
function hideLoader() {
    loader.classList.add("hidden");
}