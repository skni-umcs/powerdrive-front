import {
  BehaviorSubject,
  catchError,
  delay,
  from,
  map,
  Observable,
  of,
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
import { getErrorCode } from "../utils/ApiUtil";
import { notify, notifyError } from "./NotificationService";
import { NotificationTypeEnum } from "../enums/NotificationTypeEnum";
import { SuccessCodeEnum } from "../enums/SuccessCodeEnum";
import { navigate } from "./NavigationService";
import { PathEnum } from "../enums/PathEnum";

const loggedUser = new BehaviorSubject<UserData | null>(null);
export const loggedUser$ = loggedUser.asObservable();

const identityUpdated = new BehaviorSubject<boolean>(false);
export const identityUpdated$ = identityUpdated.asObservable();

export const initializeAuth = (): Observable<OperationResult<void>> => {
  const refreshToken = localStorage.getItem(StorageKeysEnum.REFRESH_TOKEN);

  if (!refreshToken) {
    loggedUser.next(null);
    identityUpdated.next(true);
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
      identityUpdated.next(true);
      return { isSuccessful: true };
    }),
    catchError((_) => {
      localStorage.removeItem(StorageKeysEnum.TOKEN);
      localStorage.removeItem(StorageKeysEnum.REFRESH_TOKEN);
      loggedUser.next(null);
      identityUpdated.next(true);
      return of({ isSuccessful: false });
    })
  );
};

export const login = (user: LoginData): Observable<OperationResult<void>> => {
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
    tap((res) => {
      loggedUser.next(res.data);
      identityUpdated.next(true);
      notify({
        type: NotificationTypeEnum.SUCCESS,
        message: SuccessCodeEnum.LOGIN_SUCCESSFUL,
      });
      navigate("/" + PathEnum.APP + "/" + PathEnum.DRIVE);
    }),
    map((res) => {
      return { isSuccessful: true };
    }),
    catchError((error) => {
      notifyError(getErrorCode(error));
      localStorage.removeItem(StorageKeysEnum.TOKEN);
      localStorage.removeItem(StorageKeysEnum.REFRESH_TOKEN);
      loggedUser.next(null);
      identityUpdated.next(true);
      return of({ isSuccessful: false, error: "" });
    })
  );
};

export const register = (
  user: RegisterData
): Observable<OperationResult<void>> => {
  return from(axios.post<UserData>(baseUrl + "/user/", user)).pipe(
    tap((res) => {
      notify({
        type: NotificationTypeEnum.SUCCESS,
        message: SuccessCodeEnum.REGISTER_SUCCESSFUL,
      });
      navigate("/" + PathEnum.LOGIN);
    }),
    map((res) => {
      return { isSuccessful: true };
    }),
    catchError((error) => {
      notifyError(getErrorCode(error));
      return of({ isSuccessful: false, error: "" });
    })
  );
};

export const logout = () => {
  localStorage.removeItem(StorageKeysEnum.TOKEN);
  localStorage.removeItem(StorageKeysEnum.REFRESH_TOKEN);

  loggedUser.next(null);
  identityUpdated.next(true);
  notify({
    type: NotificationTypeEnum.SUCCESS,
    message: SuccessCodeEnum.LOGOUT_SUCCESSFUL,
  });
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
    identityUpdated.next(true);

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
