// SCSS.
import { useState } from "react";
import "./StopCard.scss";

interface StopCardProps {
  nameOfStop: string;
  extId: string;
  distanceFromLocation: number;
}

function StopCard({ nameOfStop, extId, distanceFromLocation }: StopCardProps) {
  // TODO: FIXA INTERFACE!
  const [departuresArray, setDeparturesArray] = useState<any>([]);
  const [slicedArray, setSlicedArray] = useState<any>([]);

  async function getPoleTimeTables(extId: string) {
    console.log(extId);
    // console.log(API_KEY);

    const URL = `https://api.resrobot.se/v2.1/departureBoard?id=${extId}&format=json&accessId=${
      import.meta.env.VITE_API_KEY
    }`;
    const response = await fetch(URL);

    const data = await response.json();
    setDeparturesArray(data.Departure);
    setSlicedArray(data.Departure.slice(0, 5));

    // console.log(data.Departure);
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
          {slicedArray.map((departure: destinationData) => (
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

interface destinationData {
  direction: string;
  stopid: string;
  time: string;
  name: string;
}

export default StopCard;
