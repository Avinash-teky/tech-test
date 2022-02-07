import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HomeService } from './home.service';

interface Cake {
  id: number,
  name: string,
  comment: string,
  imageurl: string,
  yumfactor: number
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public allCakes: Array<Cake> = [];
  public isLoading: boolean = false;

  constructor(private router: Router, private homeService: HomeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllCakes();
  }

  goToAddCake(): void {
    this.router.navigate(['/home/add-new-cake']);
  }

  getAllCakes(): void {
    this.homeService.getCakes().subscribe(val => this.allCakes = val.data);
  }

  deleteCake(cake: Cake): void {
    this.isLoading = true;
    this.homeService.deleteCake(cake)
      .pipe(
        catchError((error: any) => {
          this.isLoading = false;
          return error;
        }))
      .subscribe((val: any) => {
        this.snackBar.open(val.message, "Close");
        this.allCakes = this.allCakes.filter(data => data.id != cake.id);
        this.isLoading = false;
      });
  }
}
