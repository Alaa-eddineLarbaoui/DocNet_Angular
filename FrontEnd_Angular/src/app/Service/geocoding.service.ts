import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/reverse';

  constructor(private http: HttpClient) {}

  reverseGeocode(lat: number, lon: number): Observable<string> {
    const params = {
      format: 'json',
      lat: lat.toString(),
      lon: lon.toString(),
      zoom: '18',
      addressdetails: '1'
    };
    console.log(lat +"LAtttttttttttttttttttg")
    console.log(lon +"LAtttttttttttttttttttg")

    return this.http.get(this.nominatimUrl, { params }).pipe(
      map((response: any) => {
        if (response && response.display_name) {
          return response.display_name;
        } else {
          return 'Adresse non trouvée';
        }
      })
    );
  }
}
