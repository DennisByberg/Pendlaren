interface StopCardProps {
  nameOfStop: string;
  extId: string;
  distanceFromLocation: number;
}

interface StopLocationData {
  StopLocation: {
    extId: string;
    name: string;
    dist: number;
  };
}

interface DestinationData {
  direction: string;
  stopid: string;
  time: string;
  name: string;
}

export { StopCardProps, StopLocationData, DestinationData };
