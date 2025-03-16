import {create} from 'zustand';

export const useCounterStore = create(set => ({
  weatherData: null,
  forecastData: null,
  citiesWeatherData: [],
  getWeatherData: async ({city = 'Chandigarh'}) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=Your_API_KEY&q=${city}&days=1&aqi=no&alerts=no`,
        // 'https://api.weatherapi.com/v1/current.json?key=Your_API_KEY&q=Chandigarh',
      );
      const data = await response.json();
      // console.log(data, 'daaaaa');

      set({weatherData: data, forecastData: data?.forecast?.forecastday[0]});
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  },
  searchWeatherData: async city => {
    const cities = ['Chandigarh', 'Bengaluru', 'Chennai', 'Delhi'];
    const getWeatherData = async city_name => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=Your_API_KEY&q=${city_name}`,
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
      }
    };

    if (city === '') {
      let weaterResult = [];
      cities.forEach(async item => {
        const data = await getWeatherData(item);

        if (!weaterResult.includes(data)) {
          weaterResult.push(data);
        }
        set({citiesWeatherData: weaterResult});
      });
    } else {
      const data = await getWeatherData(city);
      console.log(data, 'dataaaa');

      set({citiesWeatherData: [data]});
    }
  },
}));

export const isHourMatch = localtime => {
  const now = new Date();
  const currentHour = now.getHours();

  const [datePart, timePart] = localtime.split(' ');
  const [hour] = timePart.split(':').map(Number);

  return currentHour === hour;
};
