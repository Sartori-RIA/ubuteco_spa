import {HttpClient, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Logger} from '@ngrx/data';
import {toFormData} from '../../../shared/util/util';
import {map} from 'rxjs/operators';
import {BaseModel} from '../../models/base.model';


export abstract class BaseService<T extends BaseModel> {
  protected constructor(protected http: HttpClient, protected url: string, protected logger: Logger) {
  }

  index(params?: { [key: string]: string | string[] }): Observable<HttpResponse<T[]>> {
    return this.http.get<T[]>(this.url, {params, observe: 'response'}).pipe();
  }

  search(search: string): Observable<T[]> {
    return this.http.get<T[]>(this.url + '/search', {params: {q: search}}).pipe();
  }

  createWithPicture(data: T, fileName: string, file: File | Blob): Observable<HttpEvent<T>> {
    const form = toFormData<T>(data);
    form.append(fileName, file);
    return this.http.post<T>(this.url, form, {observe: 'response'}).pipe();
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(this.url, data).pipe();
  }

  update(data: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${data.id}`, data).pipe();
  }

  updateWithPicture(data: T, fileName: string, file: File): Observable<HttpEvent<T>> {
    const form = toFormData<T>(data);
    form.append(fileName, file);
    return this.http.put<T>(`${this.url}/${data.id}`, form, {observe: 'response'}).pipe();
  }

  show(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`).pipe();
  }

  destroy(id: number): Observable<{ id: number }> {
    return this.http.delete<{ id: number }>(`${this.url}/${id}`).pipe(map(() => ({id})));
  }
}
