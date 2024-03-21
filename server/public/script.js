// check local storage for zip code for initial data fetch
let area =
  localStorage.getItem("location") === null
    ? "10001"
    : localStorage.getItem("location");

// select changing elements so query selector isn't called on every function
const location = document.querySelector("#location");
const condition = document.querySelector('#currentCondition');
const weatherImage = document.querySelector("#currentWeatherImage");
const apiFields = document.querySelectorAll(".current");
const apiFieldContainers = document.querySelectorAll('.info');

// select image used as button and fetch data based on input
const button = document.querySelector('#searchBtn');
button.addEventListener('click', () => {
  let input = document.querySelector('#zipcode').value;
  getCurrentWeather(input);
})

// fetch weather data from server to populate page
const getCurrentWeather = async (zip) => {
  await fetch(`http://localhost:8000/api/weather/current/${zip}`)
    .then((res) => res.json())
    .then((data) => {
      clearFields();
      localStorage.setItem('location', zip);
      location.textContent = `${data.location.name}, ${data.location.region}`;
      condition.textContent = data.current.condition.text;
      weatherImage.src = data.current.condition.icon;
      populateApiFields(data);
    })
    .catch((err) => {
      console.error(err);
      alert('There has been an error')
    });
};

getCurrentWeather(area);

// function to populate api fields based on data
const populateApiFields = (data) => {
  const { current } = data;
  apiFields.forEach(field => {
    field.insertAdjacentText('beforebegin', current[field.id]);
  })
};

// function to clear text in each field before populating page
const clearFields = () => {
  apiFieldContainers.forEach(field => {
    field.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        field.removeChild(node);
      }
    })
  })
}