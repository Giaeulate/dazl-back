export declare class GeometricCalculatorService {
    isInsideRadio(latitude: number, longitude: number, latitude2: number, longitude2: number, meters: number): boolean;
    calculateDistanceBetweenPoints: (latitudeA: number, longitudeA: number, latitudeB: number, longitudeB: number) => number;
    private deg2rad;
}
