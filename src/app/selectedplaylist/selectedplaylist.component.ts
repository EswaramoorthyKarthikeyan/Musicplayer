import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  ngOnInit(): void {
    this.appService.playList.subscribe((playlist) => {
      this.appService.selectedPlaylist.subscribe((playlistIndex: number) => {
        if (playlistIndex == null) {
          this.router.navigate(['/']);
        } else {
          this.playlistIndex = playlistIndex;
          this.currentPlaylist = playlist[playlistIndex];
          this.songs = this.currentPlaylist['songs'];
        }
      });
    });
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
