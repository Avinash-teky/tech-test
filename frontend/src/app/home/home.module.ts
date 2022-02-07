import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddNewCakeComponent } from './add-new-cake/add-new-cake.component';
import { HomeService } from './home.service';

const routes: Routes = [
  { path: 'list-cakes', component: HomeComponent },
  { path: 'add-new-cake', component: AddNewCakeComponent },
  { path: '', redirectTo: 'list-cakes', pathMatch: 'full' }
];

@NgModule({
  declarations: [HomeComponent, AddNewCakeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HomeService]
})
export class HomeModule { }
