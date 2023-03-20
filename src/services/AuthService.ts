import {
  BehaviorSubject,
  catchError,
  delay,
  from,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  throwError,
} from "rxjs";
import { UserData } from "../models/api/UserData";
import { LoginData } from "../models/api/LoginData";
import { OperationResult } from "../models/api/OperationResult";
import { RegisterData } from "../models/api/RegisterData";
import { SendPasswordResetEmailResult } from "../models/api/SendPasswordResetEmailResult";
import { PasswordResetData } from "../models/api/PasswordResetData";
import { PasswordResetResult } from "../models/api/PasswordResetResult";
import axios from "axios";
import { baseUrl } from "../const/environment";
import { StorageKeysEnum } from "../enums/StorageKeysEnum";
import { isExpired } from "react-jwt";

const loggedUser = new BehaviorSubject<UserData | null>(null);
export const loggedUser$ = loggedUser.asObservable();

const identityUpdated = new Subject<void>();
export const identityUpdated$ = identityUpdated.asObservable();

export const initializeAuth = (): Observable<OperationResult> => {
  const refreshToken = localStorage.getItem(StorageKeysEnum.REFRESH_TOKEN);

  if (!refreshToken) {
    loggedUser.next(null);
    identityUpdated.next();
    return of({ isSuccessful: false });
  }

  return from(
    axios.post(
      baseUrl + "/auth/refresh",
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    )
  ).pipe(
    tap((res) => {
      localStorage.setItem(StorageKeysEnum.TOKEN, res.data["access_token"]);
      localStorage.setItem(
        StorageKeysEnum.REFRESH_TOKEN,
        res.data["refresh_token"]
      );
    }),
    switchMap((res) =>
      from(
        axios.get<UserData>(baseUrl + "/user/me", {
          headers: { Authorization: `Bearer ${res.data["access_token"]}` },
        })
      )
    ),
    map((res) => {
      loggedUser.next(res.data);
      identityUpdated.next();
      return { isSuccessful: true };
    }),
    catchError((_) => {
      localStorage.removeItem(StorageKeysEnum.TOKEN);
      localStorage.removeItem(StorageKeysEnum.REFRESH_TOKEN);
      loggedUser.next(null);
      identityUpdated.next();
      return of({ isSuccessful: false });
    })
  );
};

export const login = (user: LoginData): Observable<OperationResult> => {
  const formData = new FormData();
  formData.append("username", user.username);
  formData.append("password", user.password);

  return from(axios.post(baseUrl + "/auth/login", formData)).pipe(
    tap((res) => {
      localStorage.setItem(StorageKeysEnum.TOKEN, res.data["access_token"]);
      localStorage.setItem(
        StorageKeysEnum.REFRESH_TOKEN,
        res.data["refresh_token"]
      );
    }),
    switchMap((res) =>
      from(
        axios.get<UserData>(baseUrl + "/user/me", {
          headers: { Authorization: `Bearer ${res.data["access_token"]}` },
        })
      )
    ),
    map((res) => {
      loggedUser.next(res.data);
      identityUpdated.next();
      return { isSuccessful: true };
    }),
    catchError((_) => {
      localStorage.removeItem(StorageKeysEnum.TOKEN);
      localStorage.removeItem(StorageKeysEnum.REFRESH_TOKEN);
      loggedUser.next(null);
      identityUpdated.next();
      return of({ isSuccessful: false });
    })
  );
};

export const register = (user: RegisterData): Observable<OperationResult> => {
  console.log("register", user);
  return from(axios.post(baseUrl + "/user/", user)).pipe(
    map((_) => ({ isSuccessful: true })),
    catchError((_) => of({ isSuccessful: false }))
  );
};

export const logout = () => {
  localStorage.removeItem(StorageKeysEnum.TOKEN);
  localStorage.removeItem(StorageKeysEnum.REFRESH_TOKEN);

  loggedUser.next(null);
  identityUpdated.next();
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

export const getToken = (): Observable<string> => {
  const token = localStorage.getItem(StorageKeysEnum.TOKEN);
  const refreshToken = localStorage.getItem(StorageKeysEnum.REFRESH_TOKEN);

  if (token && !isExpired(token)) {
    return of(token);
  }

  if (!refreshToken || isExpired(refreshToken)) {
    localStorage.removeItem(StorageKeysEnum.TOKEN);
    localStorage.removeItem(StorageKeysEnum.REFRESH_TOKEN);

    loggedUser.next(null);
    identityUpdated.next();

    throw throwError("Token expired");
  }

  return from(
    axios.post(
      baseUrl + "/auth/refresh",
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    )
  ).pipe(
    tap((res) => {
      localStorage.setItem(StorageKeysEnum.TOKEN, res.data["access_token"]);
      localStorage.setItem(
        StorageKeysEnum.REFRESH_TOKEN,
        res.data["refresh_token"]
      );
    }),
    map((res) => res.data["access_token"])
  );
};
