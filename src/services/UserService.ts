import { from, map, Observable, switchMap } from "rxjs";
import { UserData } from "../models/api/UserData";
import axios from "axios";
import { baseUrl } from "../const/environment";
import { getToken } from "./AuthService";

export const getAllUsers = (): Observable<UserData[]> => {
  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.get<UserData[]>(baseUrl + "/user/", {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    map((res) => res.data)
  );
};
