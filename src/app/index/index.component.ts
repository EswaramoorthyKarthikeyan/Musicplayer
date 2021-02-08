import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { AppServiceService } from '../app-service.service';
import { Playlist, songs } from '../playlist.interface';
import { AlertService } from 'ngx-alerts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(
    private ngxService: NgxUiLoaderService,
    private appService: AppServiceService,
    private alertService: AlertService,
    private router: Router
  ) {}

  public songsearch = new FormControl('');
  public playlistSearch = new FormControl('');

  public songs: songs[] = [];

  public tempStorage: songs[] = [];

  public submitted: boolean = false;

  public playlists: Playlist[] = [];
  
  createplaylist = new FormGroup({
    playlistName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
  });

  singerList: string[] = [
    'Jonita Gandhi',
    'Chitra',
    'Harini',
    'Hariharan',
    'Haricharan',
    'S. P. Charan',
    'Benny Dayal',
    'Shankar Mahadevan',
    'S. P. Balasubrahmanyam',
    'Sujatha Mohan',
  ];

  timingList: string[] = ['05:13', '06:01', '03:53', '04:33', '05:01'];

  ngOnInit(): void {
    this.ngxService.start();

    setTimeout(() => {
      this.ngxService.stop();
    }, 2000);

    // check localstorage
    let getAlbum: songs[] = JSON.parse(localStorage.getItem('album'));

    if (!getAlbum) {
      // this.appService.getData('https://jsonplaceholder.typicode.com/albums').subscribe((data: any) => {
      //   // Stroing Data in local storage
      //   localStorage.setItem('album',JSON.stringify(data));
      //   this.songs = data;
      // });
      this.appService
        .getData('https://jsonplaceholder.typicode.com/photos')
        .subscribe((data: any) => {
          this.tempStorage = data;
          this.tempStorage.map((data) => {
            data.singer = this.singerList[
              Math.floor(Math.random() * this.singerList.length)
            ];
            data.duration = this.timingList[
              Math.floor(Math.random() * this.timingList.length)
            ];
          });
          localStorage.setItem('album', JSON.stringify(this.tempStorage));
          this.loadSongs();
        });
    } else {
      this.tempStorage = getAlbum;
      this.loadSongs();
    }

    this.appService.playList.subscribe((data: Playlist[]) => {
      this.playlists = data;
    });

    let getPlaylists: Playlist[] = JSON.parse(localStorage.getItem('playlist'));
    if (getPlaylists) {
      this.playlists = getPlaylists;
    }
  }

  loadSongs(targetLength: number = 12) {
    this.ngxService.startBackground('do-background-things');
    // get more songs
    let addSongs = this.tempStorage.slice(this.songs.length, targetLength);

    // merging songs
    this.songs = [...this.songs, ...addSongs];

    // Do something here...
    this.ngxService.stopBackground('do-background-things');
  }

  search(e: any, type: string) {
    let searchVal = e.target.value;

    if (searchVal) {
      if (type == 'songs') {
        this.songs = [];
        // restore value
        this.tempStorage = JSON.parse(localStorage.getItem('album'));

        this.tempStorage = this.tempStorage.filter((row) => {
          // get object values
          let values = Object.values(row).map((v) => {
            return ('' + v).toLowerCase();
          });
          let status = false;

          // check value include in current object or not
          values.map((val) => {
            return val.includes(this.songsearch.value.toLowerCase())
              ? (status = true)
              : null;
          });
          return status;
        });
        this.loadSongs();
      } else {
        // restore value
        this.playlists = JSON.parse(localStorage.getItem('playlist'));

        this.playlists = this.playlists.filter((row) => {
          // get object values
          let values = Object.values(row).map((v) => {
            return ('' + v).toLowerCase();
          });
          let status = false;
          // check value include in current object or not
          values.map((val) => {
            return val.includes(this.playlistSearch.value.toLowerCase())
              ? (status = true)
              : null;
          });
          return status;
        });
      }
    } else {
      if (type == 'songs') {
        this.songs = [];
        this.tempStorage = JSON.parse(localStorage.getItem('album'));
        this.loadSongs();
      } else {
        this.playlists = JSON.parse(localStorage.getItem('playlist'));
      }
    }
  }

  /**
   * @desc Create playlist and stored it in localstorage
   */
  createPLaylist(): void {
    this.submitted = true;
    if (this.createplaylist.valid) {
      $('#create').modal('hide');
      this.submitted = false;
      let duplicatePlaylist = this.playlists.filter(
        (data) =>
          data.name.replace(' ', '').toLocaleLowerCase() ==
          this.createplaylist.controls['playlistName'].value
            .replace(' ', '')
            .toLocaleLowerCase()
      );

      if (duplicatePlaylist.length > 0) {
        this.alertService.danger(
          `Playlist ${this.createplaylist.controls['playlistName'].value} already exist`
        );
      } else {
        // set today date
        var date = new Date();

        // dd-mm-yyyy HH:mm format set
        var dateStr =
          ('00' + date.getDate()).slice(-2) +
          '-' +
          ('00' + (date.getMonth() + 1)).slice(-2) +
          '-' +
          date.getFullYear();

        // form playlist object
        let playList: Playlist = {
          name: this.createplaylist.controls['playlistName'].value,
          createdDate: dateStr,
          songs: [],
        };

        this.createplaylist.reset();

        this.playlists.push(playList);

        this.appService.playList.next(this.playlists);

        localStorage.setItem('playlist', JSON.stringify(this.playlists));
        this.alertService.success(
          ` Playlist ${playList.name} created successfully`
        );
      }
    }
  }

  /**
   * @desc Deleted selected playlist
   * @param index :selected playlist
   */

  deletePlaylist(index: number): void {
    // get selected song
    let getPlaylist = this.playlists.filter((data, i) => i == index);

    // remove deleted song
    this.playlists = this.playlists.filter((data, i) => i != index);

    this.appService.playList.next(this.playlists);

    // update to storage
    localStorage.setItem('playlist', JSON.stringify(this.playlists));

    this.alertService.success(
      ` Playlist ${getPlaylist[0]['name']} deleted successfully`
    );
  }

  selectPlaylist(index: number) {
    if (this.playlists[index]['songs'].length > 0) {
      this.appService.selectedPlaylist.next(index);
      this.router.navigate(['/selectedplaylist']);
    } else
      this.alertService.info(
        `no songs found in ${this.playlists[index].name} `
      );
  }
}
