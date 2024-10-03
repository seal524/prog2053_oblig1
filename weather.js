/**
 * Fetches the weather from the api and adds the current values
 * to the website. 
 * 
 */
function fetchWeather() {
    //API Endpoint: https://api.open-meteo.com/v1/forecast

    // gets the elements where content is going on the website
    let loc = document.getElementById("location");
    let temp = document.getElementById("temp");
    let wind = document.getElementById("wind");

    // adds headers to the elements in the website and also removes previous content
    loc.innerHTML = "<h3>Location</h3>";
    temp.innerHTML= "<h3>Temperature</h3>";
    wind.innerHTML = "<h3>Wind</h3>";

    // diffrent locations and their corresponding api link
    const locations = [["Tokyo, Japan", "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true"],
                       ["Oslo, Norway", "https://api.open-meteo.com/v1/forecast?latitude=59.9127&longitude=10.7461&current_weather=true"],
                       ["Gjøvik, Norway", "https://api.open-meteo.com/v1/forecast?latitude=60.7957&longitude=10.6915&current_weather=true"],
                       ["Kristiansand, Norway", "https://api.open-meteo.com/v1/forecast?latitude=58.1467&longitude=7.9956&current_weather=true"],
                       ["Berlin, Germany", "https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&current_weather=true"],
                       ["Trondheim, Norway", "https://api.open-meteo.com/v1/forecast?latitude=63.4305&longitude=10.3951&current_weather=true"],
                       ["Ålesund, Norway", "https://api.open-meteo.com/v1/forecast?latitude=62.4723&longitude=6.1549&current_weather=true"]
                      ];
    
    // goes through every location and fetches corresponding data
    for (let i = 0; i < locations.length; i++) {
        fetch(locations[i][1]) //uses the url in locations
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then((weather) => {
            let values = weather.current_weather; //gets the values for the cureent weather
            let units = weather.current_weather_units; //gets the units for the current weather
            //creates elements and give them conntent fetched by the api
            let loccont = document.createElement("p");
            loccont.innerHTML = locations[i][0]; //assigns it the location from the array
            let tempcont = document.createElement("p");
            tempcont.innerHTML = `${values.temperature} ${units.temperature}`;
            let windcont = document.createElement("p");
            windcont.innerHTML = `${values.windspeed} ${units.windspeed} ${values.winddirection} ${units.winddirection}`;
            
            // adds the elements to the website
            loc.appendChild(loccont);
            temp.appendChild(tempcont);
            wind.appendChild(windcont);
        })
        .catch(error => {
            // displays any errors on the webpage
            document.getElementById('weatherbox').innerHTML = `<h3>Error: ${error.message}</h3>`;
        });
    }


}

//updates the content on the website every thirty seconds
setInterval('fetchWeather()', 30000);
