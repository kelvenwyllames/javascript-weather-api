document.querySelector("#search").addEventListener("submit", async (event) => {
    event.preventDefault();

    const cityName = document.querySelector("#city-name-search").value;

    if (!cityName) {
        return alert("Você precisa digitar uma cidade válida");
    }

    const apiKey = "2df02c8edcdb674becc3924b7c5b54ee";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        cityName
    )}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            tempIcon: json.weather[0].icon,
            description: json.weather[0].description,
            temp: json.main.temp,
            feelsLike: json.main.feels_like,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            humidity: json.main.humidity,
            windSpeed: json.wind.speed,
            clouds: json.clouds.all,
            pressure: json.main.pressure,
        });
    } else {
        showalert(`Não foi possivel localizar...`);
    }
});

function showInfo(json) {
    document.querySelector(
        "#name-of-the-city"
    ).innerHTML = `${json.city}, ${json.country}`;
    document
        .querySelector("#temp-icon")
        .setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
        );
    document.querySelector("#degrees").innerHTML = `${json.temp.toFixed(0)}`;
    document.querySelector("#description").innerHTML = `${json.description}`;
    document.querySelector("#feels-like").innerHTML = `${json.feelsLike.toFixed(
        0
    )}`;
    document.querySelector("#temp-min").innerHTML = `${json.tempMin}`;
    document.querySelector("#temp-max").innerHTML = `${json.tempMax}`;
    document.querySelector("#humidity").innerHTML = `${json.humidity}`;
    document.querySelector("#wind-speed").innerHTML = `${json.windSpeed}`;
    document.querySelector("#clouds").innerHTML = `${json.clouds}`;
    document.querySelector("#pressure").innerHTML = `${json.pressure}`;
}
