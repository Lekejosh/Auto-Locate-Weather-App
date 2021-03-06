function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "5d9839e1a8f5404983d4d4268519ad5a";

  var i = 0;
  var txt = "Locating..."; /* The text */
  var speed = 100; /* The speed/duration of the effect in milliseconds */
  function typeWriter() {
    if (i < txt.length) {
      location.innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();

  //   location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=metric";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let temp = data.main.temp;
        temperature.innerHTML = temp + "° C";
        location.innerHTML =
          data.name + " (" + latitude + "°, " + longitude + "°)";
        description.innerHTML = data.weather[0].main;
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();
