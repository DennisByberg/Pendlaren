// React.
import { useState } from "react";
// SCSS.
import "./StopCard.scss";
// Interfaces
import { StopCardProps, DestinationData } from "../../interfaces";

function StopCard({ nameOfStop, extId, distanceFromLocation }: StopCardProps) {
  const [slicedArray, setSlicedArray] = useState<DestinationData[]>([]);

  async function getPoleTimeTables(extId: string) {
    const URL = `https://api.resrobot.se/v2.1/departureBoard?id=${extId}&format=json&accessId=${
      import.meta.env.VITE_API_KEY
    }`;
    const response = await fetch(URL);
    const data = await response.json();
    setSlicedArray(data.Departure.slice(0, 5));
  }

  return (
    <section className="stop-card">
      <h1
        onClick={() => getPoleTimeTables(extId)}
        className="stop-card__name-of-stop"
      >
        {nameOfStop}
      </h1>
      <p>{distanceFromLocation}m från location</p>
      {slicedArray ? (
        <ul>
          {slicedArray.map((departure: DestinationData) => (
            <li key={departure.stopid}>
              {departure.direction}
              {departure.time}
              {departure.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Inget att visa</p>
      )}
    </section>
  );
}

export default StopCard;
