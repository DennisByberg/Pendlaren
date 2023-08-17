// React.
import { useEffect, useState } from "react";
// SCSS.
import "./Stops.scss";
// Components.
import StopCard from "../StopCard/StopCard";

function Stops() {
  const API_KEY: string = "73f1d3b1-8698-4efb-94d9-f2fb1704bf06"; // API KEY!

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [stopsComponent, setStopsComponent] = useState<JSX.Element[]>([]);

  // 1. Hämta geolocation med geolocation API
  function getPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          console.log("Please enable position to use this app");
        }
      );
    }
  }

  // 2. Gör ett API-anrop mot ReseRobot - reseplanerare med longitud och latitud.
  async function getStops() {
    const URL: string = `https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${latitude}&originCoordLong=${longitude}&format=json&accessId=${API_KEY}`;
    const response = await fetch(URL);
    const data = await response.json();

    const stopsArray = data.stopLocationOrCoordLocation;
    // console.log(stopsArray);

    // TODO... Fixa interface så vi slipper skriva any...
    const stops = stopsArray.map((stop: any) => {
      // console.log(stop.StopLocation.name);
      // console.log(stop.StopLocation.extId);
      // console.log(stop.StopLocation.dist);
      return (
        <StopCard
          key={stop.StopLocation.extId}
          extId={stop.StopLocation.extId}
          nameOfStop={stop.StopLocation.name}
          distanceFromLocation={stop.StopLocation.dist}
        />
      );
    });
    setStopsComponent(stops);
  }

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      getStops();
    }
  }, [latitude, longitude]);

  return (
    <section className="stops">
      <button className="stops__find-stops-btn" onClick={getPosition}>
        Find Stops
      </button>
      <ul>{stopsComponent}</ul>
    </section>
  );
}
export default Stops;
