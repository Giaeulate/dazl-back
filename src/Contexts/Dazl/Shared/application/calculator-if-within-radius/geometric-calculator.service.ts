import { Injectable } from '@nestjs/common';

@Injectable()
export class GeometricCalculatorService {
  isInsideRadio(
    latitude: number,
    longitude: number,
    latitude2: number,
    longitude2: number,
    meters: number,
  ): boolean {
    const distance = this.calculateDistanceBetweenPoints(
      latitude,
      longitude,
      latitude2,
      longitude2,
    );
    return distance <= meters;
  }

  calculateDistanceBetweenPoints = (
    latitudeA: number,
    longitudeA: number,
    latitudeB: number,
    longitudeB: number,
  ): number => {
    const earthRadius = 6371;
    const dLat = this.deg2rad(latitudeB - latitudeA);
    const dLon = this.deg2rad(longitudeB - longitudeA);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(latitudeA)) *
        Math.cos(this.deg2rad(latitudeB)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (earthRadius * c) / 0.001; // km
  };

  private deg2rad = (number: number) => (number * Math.PI) / 180;
}
