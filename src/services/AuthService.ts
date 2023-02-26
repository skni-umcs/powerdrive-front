import { BehaviorSubject, delay, Observable, of, tap } from "rxjs";
import { UserData } from "../models/api/UserData";
import { LoginData } from "../models/api/LoginData";
import { LoginResult } from "../models/api/LoginResult";
import { RegisterData } from "../models/api/RegisterData";
import { RegisterResult } from "../models/api/RegisterResult";
import { SendPasswordResetEmailResult } from "../models/api/SendPasswordResetEmailResult";
import { PasswordResetData } from "../models/api/PasswordResetData";
import { PasswordResetResult } from "../models/api/PasswordResetResult";
import { CookiesEnum } from "../enums/CookiesEnum";

const loggedUser = new BehaviorSubject<UserData | null>(null);
export const loggedUser$ = loggedUser.asObservable();

const authInitialized = new BehaviorSubject<boolean>(false);
export const authInitialized$ = authInitialized.asObservable();

export const initializeAuth = (authCookies: any): void => {
  if (authCookies.user) loggedUser.next(JSON.stringify(authCookies.user));
  authInitialized.next(true);
};

export const login = (
  user: LoginData,
  setCookie: any,
  removeCookie: any
): Observable<LoginResult> => {
  return of({
    isSuccessful: true,
  }).pipe(
    delay(1000),
    tap((res) => {
      if (res.isSuccessful) {
        loggedUser.next({} as UserData);
        setCookie(CookiesEnum.USER, JSON.stringify(user));
      } else {
        removeCookie(CookiesEnum.USER);
        loggedUser.next(null);
      }
    })
  );
};

export const register = (
  user: RegisterData,
  setCookie: any,
  removeCookie: any
): Observable<RegisterResult> => {
  return of({
    isSuccessful: true,
  }).pipe(
    delay(1000),
    tap((res) => {
      if (res.isSuccessful) {
        loggedUser.next({} as UserData);
        setCookie(CookiesEnum.USER, JSON.stringify(user));
      } else {
        removeCookie(CookiesEnum.USER);
        loggedUser.next(null);
      }
    })
  );
};

export const logout = () => {
  loggedUser.next(null);
};

export const sendPasswordResetEmail = (
  email: string
): Observable<SendPasswordResetEmailResult> => {
  return of({ isSuccessful: true }).pipe(delay(1000));
};

export const resetPassword = (
  resetData: PasswordResetData
): Observable<PasswordResetResult> => {
  return of({ isSuccessful: true }).pipe(delay(1000));
};
