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

  const API_KEY = "73f1d3b1-8698-4efb-94d9-f2fb1704bf06";

  async function getPoleTimeTables(extId: string) {
    console.log(extId);
    console.log(API_KEY);

    const URL = `https://api.resrobot.se/v2.1/departureBoard?id=${extId}&format=json&accessId=${API_KEY}`;
    const response = await fetch(URL);

    const data = await response.json();
    setDeparturesArray(data.Departure);

    console.log(data.Departure);
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
      {departuresArray ? (
        <ul>
          {departuresArray.map((departure: destinationData) => (
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
