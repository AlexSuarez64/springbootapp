import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  headers = new HttpHeaders({
    'application-context': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  requestOptions = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`members`, this.requestOptions);
  }

  getMember(data: number): Observable<Member> {
    return this.http.get<Member>(`members/` + data, this.requestOptions);
  }

  postMember(data: Member): Observable<Member> {
    return this.http.post<Member>(`members`, data, this.requestOptions);
  }

  putMember(key: any, data: Member): Observable<Member> {
    return this.http.put<Member>(`members/`+ key, data, this.requestOptions);
  }

  deleteMember(data: number): Observable<any> {
    return this.http.delete(`members/` + data, this.requestOptions);
  }

  handleError(error: any) {
    console.log(error.stringify() + "\n" + error.message);
  }
}
