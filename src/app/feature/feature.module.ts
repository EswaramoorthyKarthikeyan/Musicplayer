import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs/songs.component';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SongsComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SongsComponent],
})
export class FeatureModule {}
