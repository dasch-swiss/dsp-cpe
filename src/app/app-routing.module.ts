import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpeComponent } from './cpe/cpe.component';

const routes: Routes = [
  {
    path: '',
    component: CpeComponent
  },
  {
    path: ':edit',
    component: CpeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
