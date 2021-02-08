import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppServiceService } from 'src/app/app-service.service';
import { Playlist, songs } from '../playlist.interface';

@Component({
  selector: 'app-selectedplaylist',
  templateUrl: './selectedplaylist.component.html',
  styleUrls: ['./selectedplaylist.component.scss'],
})
export class SelectedplaylistComponent implements OnInit {
  constructor(private appService: AppServiceService, private router: Router) {}

  songs: songs[] = [];

  playlistIndex: number;

  currentPlaylist: Playlist = {};

  playlistSubscription: Subscription;

  playlistSubscribe: Subscription;

  ngOnInit(): void {
    let getIndex = JSON.parse(localStorage.getItem('selectedPlaylist'));
    if (getIndex == null) {
      this.router.navigate(['/']);
    } else {
      this.playlistIndex = getIndex;
      let getPlaylist = JSON.parse(localStorage.getItem('playlist'));
      this.currentPlaylist = getPlaylist[getIndex];
      this.songs = getPlaylist[getIndex]['songs'];

      this.appService.playList.subscribe((playlist: Playlist[]) => {
        if (playlist.length == 0) {
        } else this.currentPlaylist = playlist[getIndex];
      });
    }
  }

  ShuffleSongs(songs: any, index: number) {
    let getPlaylist = JSON.parse(localStorage.getItem('playlist'));

    const newArr = songs;

    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }

    this.songs = newArr;

    getPlaylist[index]['songs'] = this.songs;

    this.appService.playList.next(getPlaylist);

    // update shuffled songs into playlist storage
    localStorage.setItem('playlist', JSON.stringify(getPlaylist));
  }
}
