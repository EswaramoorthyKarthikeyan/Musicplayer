import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Playlist } from './playlist.interface';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  selectedPlaylist = new BehaviorSubject<number>(null);
  playList = new BehaviorSubject<Playlist[]>([]);
  selectedSong = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) {}

  // Get data from url
  getData(url: string) {
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 2000);

    return this.http.get(url);
  }
  getUniqueListBy(arr: any, key: string) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
}
