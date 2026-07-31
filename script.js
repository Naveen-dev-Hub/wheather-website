const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const date = document.getElementById("date");
const error = document.getElementById("error");

function formatTime(unixTime) {
    const time = new Date(unixTime * 1000);
    return time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function currentDate() {
    const today = new Date();

    return today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

async function getWeather(city) {

    error.innerHTML = "";

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.innerHTML = `${data.name}, ${data.sys.country}`;

        temperature.innerHTML = `${Math.round(data.main.temp)}°C`;

        description.innerHTML = data.weather[0].description;

        humidity.innerHTML = data.main.humidity + "%";

        wind.innerHTML = data.wind.speed + " km/h";

        sunrise.innerHTML = formatTime(data.sys.sunrise);

        sunset.innerHTML = formatTime(data.sys.sunset);

        date.innerHTML = currentDate();

    } catch (err) {

        cityName.innerHTML = "";
        temperature.innerHTML = "";
        description.innerHTML = "";
        humidity.innerHTML = "";
        wind.innerHTML = "";
        sunrise.innerHTML = "";
        sunset.innerHTML = "";
        date.innerHTML = "";

        error.innerHTML = "City not found.";

    }

}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {

        error.innerHTML = "Please enter a city name.";

        return;
    }

    getWeather(city);

});

cityInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        searchBtn.click();

    }

});

getWeather("Patna");