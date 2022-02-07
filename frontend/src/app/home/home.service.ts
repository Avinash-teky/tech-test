import { Injectable } from '@angular/core';
import {
  HttpClient,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
const baseUrl = environment.baseApiUrl;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getCakes(): Observable<any> {
    return this.http.get<any>(baseUrl + `/get-cakes`);
  }

  crateCake(formData: any): Observable<any> {
    return this.http.post<any>(baseUrl + "/create-cake", formData);
  }

  deleteCake(formData: any): Observable<any> {
    return this.http.request("delete", baseUrl + `/delete-cake`, { body: formData });
  }

  uploadFileFormatter(contentType: any, extension: any) {
    return this.http.get<any>(
      baseUrl +
      `/upload-file?contenttype=${contentType}&extension=${extension}`
    );
  }

  uploadRawFile(file: any, resFields: any, key: any) {
    const formData = new FormData();
    formData.append("key", key);
    formData.append("Content-Type", file.type);
    formData.append("Policy", resFields.fields.Policy);
    formData.append("X-Amz-Algorithm", resFields.fields["X-Amz-Algorithm"]);
    formData.append("X-Amz-Credential", resFields.fields["X-Amz-Credential"]);
    formData.append("X-Amz-Date", resFields.fields["X-Amz-Date"]);
    formData.append("X-Amz-Signature", resFields.fields["X-Amz-Signature"]);
    formData.append("acl", resFields.fields["acl"]);
    formData.append("bucket", resFields.fields["bucket"]);
    formData.append("file", file);
    return this.http.post<any>(resFields.url, formData);
  }
}