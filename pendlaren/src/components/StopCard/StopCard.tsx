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
      <p className="stop-card__distance-from-stop">{distanceFromLocation}m Från hållplats</p> 
      {slicedArray ? (
        <ul className="stop-card__list-of-stops">
          {slicedArray.map((departure: DestinationData) => (
            <li key={departure.stopid} className="stop-card__stop-info">
              {departure.direction}
              <br />
              {departure.time}
              <br />
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
