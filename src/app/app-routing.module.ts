import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './feature/notfound/notfound.component';
import { IndexComponent } from './index/index.component';
import { SelectedplaylistComponent } from './selectedplaylist/selectedplaylist.component';
const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },

  {
    path: 'selectedplaylist',
    component: SelectedplaylistComponent,
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
