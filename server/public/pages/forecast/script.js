// check local storage for zip code for initial data fetch
let area =
  localStorage.getItem("location") === null
    ? "10001"
    : localStorage.getItem("location");

// select elements to update with data
const forecastContainer = document.querySelector(".forecastContainer");

// select image used as button and fetch data based on input
const button = document.querySelector('#searchBtn');
button.addEventListener('click', () => {
  let input = document.querySelector('#zipcode').value;
  getCurrentWeather(input);
})


// fetch forecast data from server and populate page
const getCurrentWeather = async (zip) => {
  await fetch(`https://yourweather-qm3i.onrender.com/api/weather/forecast/${zip}`)
    .then((res) => res.json())
    .then((data) => {
        clearTemplate();
        populatePage(data);
        localStorage.setItem('location', zip);
    })
    .catch((err) => {
        console.error(err);
        alert('There has been an error')
     });
};

getCurrentWeather(area);

// function to populate api fields on html page based on data
const populatePage = (data) => {
    let forecastDay = data.forecast.forecastday;
    
  for (let i = 0; i < forecastDay.length; i++) {
    const template = document.querySelector('.dayTemplate').content.cloneNode(true);
    const apiFields = template.querySelectorAll(".forecastInfo > .field");
    const forecastCondition = template.querySelector("#forecastCondition");
    const forecastWeatherImg = template.querySelector("#forecastWeatherImg");
    const date = template.querySelector('#date');

    apiFields.forEach(field => {
        field.insertAdjacentText('beforebegin', forecastDay[i].day[field.id]);
    })
    forecastWeatherImg.src = forecastDay[i].day.condition.icon;

    forecastCondition.textContent = forecastDay[i].day.condition.text;

    let apiDate = forecastDay[i].date.split("-");
    date.textContent = `${apiDate[1]}/${apiDate[2]}`;

    forecastContainer.appendChild(template);
  }
};

// function to clear template
const clearTemplate = () => {
    while (forecastContainer.firstChild) {
        forecastContainer.removeChild(forecastContainer.firstChild)
    }
}