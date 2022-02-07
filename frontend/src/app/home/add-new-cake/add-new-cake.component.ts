import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-add-new-cake',
  templateUrl: './add-new-cake.component.html',
  styleUrls: ['./add-new-cake.component.scss']
})
export class AddNewCakeComponent {

  public cakeForm: FormGroup;
  public imageName: string = '';
  private rawImage: any;
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private homeService: HomeService, private snackBar: MatSnackBar) {
    this.cakeForm = this.fb.group({
      name: ["", [Validators.required]],
      comment: ["",],
      yumfactor: [
        "",
        [Validators.required, Validators.pattern("^[1-5]{1}$")],
      ]
    });
  }

  resetForm(): void {
    this.cakeForm.reset();
    const file: any = document.getElementById("fileUpload");
    file.value = "";
    this.imageName = "";
  }

  Uploader(): void {
    const file: any = document.getElementById("fileUpload");
    file.click();
    file.onchange = (res: any, err: any) => {
      if (err) {
        return;
      }
      if (res.target.files[0]) {
        const file = res.target.files[0];
        this.imageName = file.name;
        this.homeService
          .uploadFileFormatter(
            file.type,
            file.name.split(".").pop()
          )
          .subscribe((res: any) => {
            if (res && res.data) {
              const S3Data = res.data.S3Data;
              const key = res.data.key;
              const finalUrl = res.data.finalUrl;
              this.rawImage = { S3Data, file, key, finalUrl };
            }
          }
          );
      }
    }
  }

  submit(): void {
    console.log(this.cakeForm.value);
    if (!this.rawImage) {
      this.snackBar.open("Please upload the image of cake", "Close");
    }
    else if (this.cakeForm.invalid) {
      this.snackBar.open("Please fill all the mandatory fields", "Close");
    } else {
      this.isLoading = true;
      this.homeService
        .uploadRawFile(
          this.rawImage.file,
          this.rawImage.S3Data,
          this.rawImage.key
        ).pipe(
          catchError((error: any) => {
            this.isLoading = false;
            return error;
          }),
          switchMap(() => {
            const formData = { ...this.cakeForm.value };
            formData['imageurl'] = this.rawImage.finalUrl;
            return this.homeService.crateCake(formData);
          })
        ).subscribe((val: any) => {
          this.snackBar.open(val.message, "Close");
          this.isLoading = false;
          this.router.navigate(['/home/list-cakes']);
        });
    }
  }
}
