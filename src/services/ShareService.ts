import { from, map, Observable, switchMap } from "rxjs";
import { getToken } from "./AuthService";
import axios from "axios";
import { baseUrl } from "../const/environment";
import { FileShareData } from "../models/api/FileShareData";

export const getSharesForFile = (
  fileId: string
): Observable<FileShareData[]> => {
  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.get<FileShareData[]>(baseUrl + "/share/file/forfile/" + fileId, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    map((res) => res.data)
  );
};

export const createShare = (shareData: FileShareData) => {
  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.post(baseUrl + "/share/file", shareData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    map((res) => res.data)
  );
};

export const updateShare = (shareData: FileShareData) => {
  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.put(baseUrl + "/share/file", shareData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    map((res) => res.data)
  );
};

export const deleteShare = (shareId: string) => {
  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.delete(baseUrl + "/share/file/" + shareId, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    map((res) => res.data)
  );
};
