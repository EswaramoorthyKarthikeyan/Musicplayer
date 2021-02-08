import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { AppServiceService } from 'src/app/app-service.service';
import { Playlist, songs } from '../../playlist.interface';
declare var $: any;

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit {
  @Input() getSongs: songs[] = [];

  @Input() delete: boolean = false;

  playlists: Playlist[] = [];

  public tempSongs: songs[] = [];

  selectedPlaylist: number;

  selectAll: boolean = false;

  play: boolean = true;

  selectedSong: songs = {};

  constructor(
    private alertService: AlertService,
    private appService: AppServiceService
  ) {}

  ngOnInit(): void {
    this.appService.playList.subscribe(
      (playlists: Playlist[]) => (this.playlists = playlists)
    );

    this.playlists = JSON.parse(localStorage.getItem('playlist'));

    this.appService.selectedSong.subscribe((song: any) => {
      this.selectedSong = song;
    });
  }

 
  addToPlaylist() {
    this.selectedPlaylist == 0 ? 1 : this.selectedPlaylist;
    if (this.selectedPlaylist) {
      this.tempSongs.map((data: any) => (data.status = 'deactive'));

      // update songs in playlist
      let getUniqueSongs = this.appService.getUniqueListBy(
        [
          ...this.playlists[this.selectedPlaylist - 1]['songs'],
          ...this.tempSongs,
        ],
        'id'
      );

      // get length of the added song(s)
      let addedSongLength = Math.abs(
        this.playlists[this.selectedPlaylist - 1]['songs'].length -
          getUniqueSongs.length
      );

      addedSongLength =
        addedSongLength >= 50
          ? 50 - this.playlists[this.selectedPlaylist - 1]['songs'].length
          : addedSongLength;

      getUniqueSongs =
        getUniqueSongs.length >= 50
          ? getUniqueSongs.slice(0, 50)
          : getUniqueSongs;

      // update valus in playlist variable
      this.playlists[this.selectedPlaylist - 1]['songs'] = getUniqueSongs;

      getUniqueSongs;

      this.appService.playList.next(this.playlists);

      // Update playlist in local storage
      localStorage.setItem('playlist', JSON.stringify(this.playlists));

      let alertMsg =
        addedSongLength == 0
          ? `Selected song(s) already exist in  your playlist ${
              this.playlists[this.selectedPlaylist - 1].name
            } `
          : `${addedSongLength} song(s) added successfully in ${
              this.playlists[this.selectedPlaylist - 1].name
            } playlist`;

      if (addedSongLength == 0) {
        this.alertService.warning(alertMsg);
      } else {
        this.alertService.success(alertMsg);
      }

      // Restting selected songs
      this.tempSongs = [];
      this.selectAll = false;
    } else {
      this.alertService.warning('Kindly select any one of the playlist');
    }
  }

  deleteFromPlaylist(song: any) {
    // Delete song from playlist
    this.getSongs = this.getSongs.filter((data) => data.id != song.id);

    this.appService.selectedPlaylist.subscribe((playlistIndex: number) => {
      this.playlists[playlistIndex]['songs'] = this.getSongs;
      // update deleted song into the storage
      localStorage.setItem('playlist', JSON.stringify(this.playlists));
    });
  }

  selectSong(index: number) {
    this.getSongs.map((data, i) => {
      if (i == index) {
        data.status = data.status != 'active' ? 'active' : 'deactive';
        if (data.status == 'active') {
          this.tempSongs.push(data);
        } else {
          this.tempSongs = this.tempSongs.filter(
            (temp: any) => temp.id != data.id
          );
        }
      }
    });
  }

  selectallSongs() {
    this.selectAll = this.selectAll == true ? false : true;
    this.getSongs.map((data, index) => {
      data.status = this.selectAll ? 'active' : 'deactive';
    });

    this.tempSongs = this.selectAll == true ? this.getSongs : [];
  }

  selectPlaylist(e: any) {
    this.selectedPlaylist = parseInt(e.target.value) + 1;
  }

  playSong(song: any) {
    this.appService.selectedSong.next(song);
  }
}
