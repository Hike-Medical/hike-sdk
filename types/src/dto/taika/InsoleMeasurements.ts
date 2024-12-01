export interface InsoleMeasurements {
  order: {
    _id: string;
    measurements: {
      left: InsoleSideMeasurements;
      right: InsoleSideMeasurements;
    };
  };
}

export interface InsoleSideMeasurements {
  heelCupWidth: number;
  deviceLength: number;
  forefootWidth: number;
  apexHeight: number;
  apexPosition: number;
}
