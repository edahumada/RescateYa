import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async getCurrentPosition(): Promise<Position> {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      });
      return position;
    } catch (error) {
      console.error('Error getting location', error);
      throw error;
    }
  }

  async watchPosition(callback: (position: Position) => void): Promise<string> {
    try {
      const watchId = await Geolocation.watchPosition({
        enableHighAccuracy: true,
        timeout: 10000
      }, (position, err) => {
        if (err) {
          console.error('Error watching position', err);
          return;
        }
        if (position) {
          callback(position);
        }
      });
      return watchId;
    } catch (error) {
      console.error('Error starting position watch', error);
      throw error;
    }
  }

  async clearWatch(watchId: string): Promise<void> {
    await Geolocation.clearWatch({ id: watchId });
  }

  async checkPermissions(): Promise<any> {
    return await Geolocation.checkPermissions();
  }

  async requestPermissions(): Promise<any> {
    return await Geolocation.requestPermissions();
  }
}
