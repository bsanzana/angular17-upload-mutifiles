import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  upload(file: File, user:any, proyect:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('files', file);
    formData.append('user', user);
    formData.append('directory', proyect);

    const req = new HttpRequest('POST', `${this.baseUrl}/api/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles() {
    return this.http.get<any>(`${this.baseUrl}/api/upload/getFiles/`);
  }
}