import React from "react";
import { useQuery } from "react-query";
import "chartjs-adapter-moment";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconn from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: iconn,
  shadowUrl: iconShadow,
});

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "quarter",
      },
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const fetchCovidData = async () => {
  const response = await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  const data = await response.json();
  return data;
};

const fetchCountryData = async () => {
  const response = await fetch("https://disease.sh/v3/covid-19/countries");
  const data = await response.json();
  return data;
};

const ChartAndMapPage = () => {
  const { data: covidData, status: covidStatus } = useQuery(
    "covidData",
    fetchCovidData
  );
  const { data: countryData, status: countryStatus } = useQuery(
    "countryData",
    fetchCountryData
  );

  if (covidStatus === "loading" || countryStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (covidStatus === "error" || countryStatus === "error") {
    return <div>Error fetching data</div>;
  }

  const casesData = covidData.cases;
  const xValues = Object.keys(casesData).map((date) => new Date(date));
  const yValues = Object.values(casesData);

  const chartData = {
    labels: xValues,
    datasets: [
      {
        label: "COVID-19 Cases",
        data: yValues,
        borderColor: "blue",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex-grow p-4 md:p-8 md:flex md:flex-col">
      <h2 className="text-xl md:text-2xl mb-4">COVID-19 Cases Fluctuations</h2>
      <div className="md:w-3/4 " style={{ maxWidth: "700px" }}>
        <Line data={chartData} options={options} />
      </div>
      <div className="md:w-3/4 " style={{ maxWidth: "700px" }}>
        <h2 className="text-xl md:text-2xl mb-4 mt-6">COVID-19 Map</h2>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countryData.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <p>Active Cases: {country.active}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ChartAndMapPage;
