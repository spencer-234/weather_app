# weather_app
## This is a full stack weather app as my first mini project for the Institute of Data.

### Client
The front end portion is made up of html, css, and javascript. These files are served through express from the backend through the public directory.
I used javascript to fetch data from the backend and populate pages based on the data retrieved based on the zip code entered. For the zip code, it
will check local storage for a location variable and if there isn't one, New York will be the default location. After entering a zip code, it will
be saved in local storage to be used again when the user revisits the page.

### Server
The server is made using NodeJS, express, swagger.json, and axios. For retrieving data for requests, I used [Free Weather API](https://www.weatherapi.com/).
This API sends back weather data based on the zip code passed to it. When a request is retrieved by the server, it will take the zip code from the request
parameters and pass that to the API. Once it gets the data back, it will send it to the client.
