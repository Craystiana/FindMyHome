import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { UserModel } from "../models/user/user.model";
import { UserRole } from "../common/user-role";
import { RegisterModel } from "../models/user/register.model";
import { API_URL, LOGIN_URL, REGISTER_URL } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  static currentUser: any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(sessionStorage?.getItem('currentUser') ? JSON.parse(sessionStorage?.getItem('currentUser') ?? '') : '');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserName(): string | null {
    if (this.currentUserSubject.value != null) {
      var user = this.currentUserSubject.value;
      return user.lastName + ' ' + user.firstName;
    }
    else {
      return null;
    }
  }

  public get currentUserEmail(): string | null {
    if (this.currentUserSubject.value != null) {
      var user = this.currentUserSubject.value;
      return user.email;
    }
    else {
      return null;
    }
  }

  public currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    //return this.currentUserSubject.value != null;
    return true;
  }

  public isAdmin(): boolean {
    if (this.isAuthenticated()) {
      return this.currentUserSubject.value.userRole === UserRole.Admin;
    } else {
      return false;
    }
  }

  public isUser(): boolean {
    if (this.isAuthenticated() === true) {
      return this.currentUserSubject.value.userRole === UserRole.User;
    } else {
      return false;
    }
  }

  login(email: string, password: String) {
    return this.http.post<UserModel>(API_URL + LOGIN_URL, { email, password }).pipe(
      map((user: UserModel) => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
  }

  register(model: RegisterModel) {
    return this.http.post<boolean>(API_URL + REGISTER_URL, model).pipe(
      map((result: boolean) => {
        return result;
      })
    );
  }

  public getProfile(){
    // return this.http.get(API_URL + PROFILE_URL).pipe(
    //   map((data : RegisterModel) => {
    //     return data;
    //   })
    // );

    return of(new RegisterModel('Ana', 'Maria', 'ana.maria@gmail.com', 'password', 5736282947));
  }

  editProfile(model: RegisterModel){
    // return this.http.post(API_URL + PROFILE_URL, model).pipe(
    //   map((result: boolean) =>{
    //     return result;
    //   })
    // );
    return of(true);
  }
}