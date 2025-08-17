export type WeatherData = {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
};

export type Location = {
  lat: number | null;
  long: number | null;
};