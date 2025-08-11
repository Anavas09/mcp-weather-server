const getLatLonData = async (city: string): Promise<any> => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=es&format=json`
  );

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return false;
  } else {
    return {
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
    };
  }
};

const getWeatherData = async (city: string): Promise<any> => {
  const data = await getLatLonData(city);

  if (!data) {
    return false;
  }

  const { lat, lon } = await data;

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,weather_code,apparent_temperature,precipitation_probability,rain,visibility,wind_speed_10m&forecast_days=1`
  );

  const weatherData = await response.json();

  if (!weatherData) {
    return false;
  }

  return weatherData;
};

export { getWeatherData };
