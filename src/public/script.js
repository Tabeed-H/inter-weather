const searchLocation = document.querySelector(".search-btn");
const searchLocationAuto = document.querySelector(".location-btn");

searchLocationAuto.addEventListener("click", (e) => {
  e.preventDefault();
  getGeoLocation();
});

searchLocation.addEventListener("click", (e) => {
  e.preventDefault();
  const location = document.querySelector(".input-text").value;
  getWeather(location);
});

// geolocation api to get the current location of the user
function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(parseCoords);
}

// to parse coordinates to a string used by getWeather as a string
const parseCoords = function ({ coords }) {
  getWeather(`${coords.latitude},${coords.longitude}`);
};

// makes the api call
const getWeather = function (data) {
  const obj = {
    place: data,
  };
  axios
    .post(`${window.location.origin}/getweather/search`, JSON.stringify(obj), {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      setCurrentTemp(res.data);
      setForecast(res.data.forecast);
    })
    .catch((err) => console.log(err.response));
};

const setCurrentTemp = function (data) {
  console.log(data);
  document.querySelector(".current-weather-container").innerHTML = "";
  const htmlDOM = `  <div class="current-weather-temp">
                        <div class="current-weather-temp-img">
                          <img src="${data.current[0].weatherIconUrl[0].value}" alt="" />
                        </div>
                        <div class="current-weather-temp-t">${data.current[0].temp_C}&nbsp;<span class="degree">&#8451;</span></div>
                        <div class="current-weather-address">${data.location[0].query}</div>
                      </div>
                      <div class="current-weather-info">
                        <div class="current-weather-info-feels">Feels Like &nbsp; : &nbsp; ${data.current[0].FeelsLikeC}&nbsp;<span class="degree">&#8451;</span></div>
                        <div class="current-weather-info-wind">Wind Speed &nbsp; : &nbsp; ${data.current[0].windspeedKmph} kmph</div>
                        <div class="current-weather-info-humi">Humidity &nbsp; : &nbsp; ${data.current[0].humidity}</div>
                      </div>`;
  document
    .querySelector(".current-weather-container")
    .insertAdjacentHTML("afterbegin", htmlDOM);
};

const setForecast = function (data) {
  console.log(data);
  document.querySelector(".forecast-card-container").innerHTML = "";

  data.forEach((element) => {
    const date = new Date(String(element.date));
    const formatedDate = `${date.getDate()} - ${
      date.getMonth() + 1
    } - ${date.getFullYear()}`;
    const htmlDOM = ` <div class="forecast-card">
    <div class="forecast-card-date">${formatedDate}</div>
    <div class="forecast-card-img">${element.avgtempC}<span class="degree">&#8451;</span></div>
    <div class="forecast-card-weather">Max : ${element.maxtempC}<span class="degree">&#8451;</span>&nbsp;&nbsp;&nbsp;&nbsp;Min : ${element.mintempC}<span class="degree">&#8451;</span></div>
  </div>`;
    document
      .querySelector(".forecast-card-container")
      .insertAdjacentHTML("beforeend", htmlDOM);
  });
};

window.onload = getGeoLocation();
