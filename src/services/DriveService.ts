import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
  zip,
} from "rxjs";
import { DriveViewModeEnum } from "../enums/DriveViewModeEnum";
import { SortTypeEnum } from "../enums/SortTypeEnum";
import { FileData } from "../models/api/FileData";
import { SortModeEnum } from "../enums/SortModeEnum";
import { getToken, identityUpdated$, loggedUser$ } from "./AuthService";
import axios from "axios";
import { baseUrl } from "../const/environment";
import { OperationResult } from "../models/api/OperationResult";
import { saveAs } from "file-saver";
import { OperationProgressData } from "../models/ui/OperationProgressData";
import { notify, notifyError } from "./NotificationService";
import { ErrorCodeEnum } from "../enums/ErrorCodeEnum";
import { NotificationTypeEnum } from "../enums/NotificationTypeEnum";
import { SuccessCodeEnum } from "../enums/SuccessCodeEnum";
import { OperationTypeEnum } from "../enums/OperationTypeEnum";

const directoryTree = new BehaviorSubject<FileData | null>(null);
export const directoryTree$ = directoryTree.asObservable();

const viewMode = new BehaviorSubject<DriveViewModeEnum>(DriveViewModeEnum.GRID);
export const viewMode$ = viewMode.asObservable();

const splitViewEnabled = new BehaviorSubject<boolean>(false);
export const splitViewEnabled$ = splitViewEnabled.asObservable();

const sortType = new BehaviorSubject<SortTypeEnum | null>(null);
export const sortType$ = sortType.asObservable();

const sortMode = new BehaviorSubject<SortModeEnum | null>(null);
export const sortMode$ = sortMode.asObservable();

const primaryFilesViewPath = new BehaviorSubject<FileData[] | null>(null);
export const primaryFilesViewPath$ = primaryFilesViewPath.asObservable();

const secondaryFilesViewPath = new BehaviorSubject<FileData[] | null>(null);
export const secondaryFilesViewPath$ = secondaryFilesViewPath.asObservable();

const primaryFilesViewFiles = new BehaviorSubject<FileData[]>([]);

export const primaryFilesViewFiles$ = primaryFilesViewFiles.asObservable();

const secondaryFilesViewFiles = new BehaviorSubject<FileData[]>([]);
export const secondaryFilesViewFiles$ = secondaryFilesViewFiles.asObservable();

const selectedFiles = new BehaviorSubject<FileData[]>([]);
export const selectedFiles$ = selectedFiles.asObservable();

const driveOperationInProgress = new BehaviorSubject<number[]>([]);
export const driveOperationInProgress$ =
  driveOperationInProgress.asObservable();

const downloadProgress = new BehaviorSubject<
  Map<number, OperationProgressData>
>(new Map<number, OperationProgressData>());
export const downloadProgress$ = downloadProgress.asObservable();

const uploadProgress = new BehaviorSubject<Map<number, OperationProgressData>>(
  new Map<number, OperationProgressData>()
);
export const uploadProgress$ = uploadProgress.asObservable();

export const initializeDrive = (): Observable<any> => {
  return identityUpdated$.pipe(
    switchMap((_) => loggedUser$),
    tap((user) => {
      if (!user) directoryTree.next(null);
    }),
    filter(Boolean),
    switchMap((_) => getToken()),
    switchMap((token) =>
      from(
        axios.get<FileData>(baseUrl + "/file/dir_tree", {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    tap((tree) => directoryTree.next(tree.data)),
    catchError((err) => {
      console.error(err);
      return of(null);
    })
  );
};
export const setViewMode = (mode: DriveViewModeEnum) => {
  if (mode !== viewMode.getValue()) viewMode.next(mode);
};

export const setSplitViewEnabled = (status: boolean) => {
  if (status) {
    setSecondaryFilesViewPath(primaryFilesViewPath.getValue());
  }
  if (status !== splitViewEnabled.getValue()) splitViewEnabled.next(status);
};

export const setPrimaryFilesViewPath = (path: FileData[] | null) => {
  primaryFilesViewPath.next(path);
};
export const setSecondaryFilesViewPath = (path: FileData[] | null) => {
  secondaryFilesViewPath.next(path);
};

export const setSortType = (type: SortTypeEnum | null) => {
  if (type !== sortType.getValue()) sortType.next(type);
};

export const setSortMode = (mode: SortModeEnum | null) => {
  if (mode !== sortMode.getValue()) sortMode.next(mode);
};

export const setSelectedFiles = (files: FileData[]) => {
  selectedFiles.next(files);
};

export const downloadDirectoryContent = (
  directoryId: string,
  downloadRequestorPath: string
): Observable<OperationResult<void>> => {
  const operationId = Math.random();

  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue(),
    operationId,
  ]);

  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.get(baseUrl + `/file/${directoryId}/list`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    map((res) => res.data),
    tap((files) => {
      const primaryFilesViewPathValue = primaryFilesViewPath.getValue()!;
      const secondaryFilesViewPathValue = secondaryFilesViewPath.getValue()!;

      if (
        primaryFilesViewPathValue[primaryFilesViewPathValue!.length - 1]
          .path === downloadRequestorPath
      ) {
        primaryFilesViewFiles.next(files);
      }

      if (
        secondaryFilesViewPathValue[secondaryFilesViewPathValue!.length - 1]
          .path === downloadRequestorPath
      ) {
        secondaryFilesViewFiles.next(files);
      }
    }),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => {
      notifyError(ErrorCodeEnum.DIRECTORIES_DOWNLOAD_FAILED);
      return of({ isSuccessful: false, error: err });
    }),
    finalize(() =>
      driveOperationInProgress.next([
        ...driveOperationInProgress
          .getValue()
          .filter((op) => op !== operationId),
      ])
    )
  );
};

export const uploadFile = (
  fileData: File | null,
  path: string,
  isDir: boolean,
  notifyResult: boolean = true
): Observable<OperationResult<void>> => {
  const operationId = Math.random();
  const abortController = new AbortController();

  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue(),
    operationId,
  ]);

  const fileMeta = {
    path: path,
    is_dir: isDir,
  };

  const formData = new FormData();
  if (fileData) formData.append("file_data", fileData);
  formData.append("file_meta", JSON.stringify(fileMeta));

  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.post(baseUrl + "/file", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: abortController.signal,
          onUploadProgress: (progressEvent) => {
            uploadProgress.next(
              new Map(
                uploadProgress.getValue().set(operationId, {
                  operationId: operationId,
                  progress: progressEvent.progress
                    ? progressEvent.progress * 100
                    : 0,
                  filename: fileData?.name ? fileData.name : "",
                  isDir: isDir,
                  file: fileData,
                  abortController: abortController,
                  operationType: OperationTypeEnum.UPLOAD,
                })
              )
            );
          },
        })
      )
    ),
    map((res) => res.data),
    tap((file) => {
      const primaryFilesViewPathValue = primaryFilesViewPath.getValue()!;
      const secondaryFilesViewPathValue = secondaryFilesViewPath.getValue()!;

      let primaryPath =
        primaryFilesViewPathValue[primaryFilesViewPathValue!.length - 1].path;
      let secondaryPath =
        secondaryFilesViewPathValue[secondaryFilesViewPathValue!.length - 1]
          .path;

      if (isDir) {
        const lastSeparatorIndex = path.lastIndexOf("/");

        if (lastSeparatorIndex !== -1) {
          path = path.substring(0, lastSeparatorIndex);
        }

        if (lastSeparatorIndex === 0) {
          path = "/";
        }
      }

      if (primaryPath === path) {
        primaryFilesViewFiles.next([...primaryFilesViewFiles.getValue(), file]);
      }

      if (secondaryPath === path) {
        secondaryFilesViewFiles.next([
          ...secondaryFilesViewFiles.getValue(),
          file,
        ]);
      }
    }),
    tap((_) => {
      if (notifyResult)
        notify({
          type: NotificationTypeEnum.SUCCESS,
          message: SuccessCodeEnum.FILE_UPLOAD_SUCCESSFUL,
        });
    }),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => {
      if (notifyResult) notifyError(ErrorCodeEnum.FILE_UPLOAD_FAILED);
      return of({ isSuccessful: false, error: err });
    }),
    finalize(() => deleteUploadOperation(operationId))
  );
};

export const uploadFiles = (
  filesData: File[],
  path: string
): Observable<any> => {
  return zip(
    filesData.map((file) => uploadFile(file, path, false, false))
  ).pipe(
    tap((_) =>
      notify({
        type: NotificationTypeEnum.SUCCESS,
        message: SuccessCodeEnum.FILES_UPLOAD_SUCCESSFUL,
      })
    ),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => {
      notifyError(ErrorCodeEnum.FILES_UPLOAD_FAILED);
      return of({ isSuccessful: false, error: err });
    })
  );
};

const renameUpdateFiles = (responseFile: FileData) => {
    const primaryFilesViewPathValue = primaryFilesViewPath.getValue()!;
    const secondaryFilesViewPathValue = secondaryFilesViewPath.getValue()!;
    const primaryFilesViewPathValueActualPath = primaryFilesViewPathValue[primaryFilesViewPathValue!.length - 1].path
    const secondaryFilesViewPathValueActualPath = secondaryFilesViewPathValue[secondaryFilesViewPathValue!.length - 1].path

    if (primaryFilesViewPathValueActualPath === responseFile.path) {
        primaryFilesViewFiles.next(
            primaryFilesViewFiles.getValue().map(file => file.id === responseFile.id ? responseFile : file)
        );
    }
    if (secondaryFilesViewPathValueActualPath === responseFile.path) {
        secondaryFilesViewFiles.next(
            secondaryFilesViewFiles.getValue().map(file => file.id === responseFile.id ? responseFile : file)
        );
    }
    selectedFiles.next(
        selectedFiles.getValue().map(file => file.id === responseFile.id ? responseFile : file)
    );
}

export const renameFile = (file: FileData, newName: string): Observable<OperationResult<void>> => {
  const operationId = Math.random();

  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue(),
    operationId,
  ]);

  const changedFile = {...file, filename: newName};

  return getToken().pipe(
      switchMap((token) =>
          from(
              axios.put<FileData>(baseUrl + "/file", changedFile, {
                headers: { Authorization: `Bearer ${token}` },
              })
          )
      ),
      tap((response) => {
        const responseFile = response.data;
        renameUpdateFiles(responseFile);
      }),
      map((_) => ({ isSuccessful: true })),
      catchError((err) => of({ isSuccessful: false, error: err })),
      finalize(() =>
          driveOperationInProgress.next([
            ...driveOperationInProgress
                .getValue()
                .filter((op) => op !== operationId),
          ])
      )
  );
};

const moveUpdateFiles = (originalFile: FileData, responseFile: FileData) => {
    const primaryFilesViewPathValue = primaryFilesViewPath.getValue()!;
    const secondaryFilesViewPathValue = secondaryFilesViewPath.getValue()!;
    const primaryFilesViewPathValueActualPath = primaryFilesViewPathValue[primaryFilesViewPathValue!.length - 1].path
    const secondaryFilesViewPathValueActualPath = secondaryFilesViewPathValue[secondaryFilesViewPathValue!.length - 1].path

    if (originalFile.path === primaryFilesViewPathValueActualPath) {
        primaryFilesViewFiles.next(
            primaryFilesViewFiles.getValue().filter(file => file.id !== originalFile.id)
        );
    }
    if (originalFile.path === secondaryFilesViewPathValueActualPath) {
        secondaryFilesViewFiles.next(
            secondaryFilesViewFiles.getValue().filter(file => file.id !== originalFile.id)
        );
    }
    if (responseFile.path === primaryFilesViewPathValueActualPath) {
        primaryFilesViewFiles.next(
            [...primaryFilesViewFiles.getValue(), responseFile]
        );
    }
    if (responseFile.path === secondaryFilesViewPathValueActualPath) {
        secondaryFilesViewFiles.next(
            [...secondaryFilesViewFiles.getValue(), responseFile]
        );
    }
}

export const moveFile = (file: FileData, newPath: string): Observable<OperationResult<void>> => {
    const operationId = Math.random();

    driveOperationInProgress.next([
        ...driveOperationInProgress.getValue(),
        operationId,
    ]);

    const changedFile = {...file, path: newPath};

    return getToken().pipe(
        switchMap((token) =>
            from(
                axios.put<FileData>(baseUrl + "/file", changedFile, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            )
        ),
        tap((response) => {
            const responseFile = response.data;
            moveUpdateFiles(file, responseFile);
        }),
        map((_) => ({ isSuccessful: true })),
        catchError((err) => of({ isSuccessful: false, error: err })),
        finalize(() =>
            driveOperationInProgress.next([
                ...driveOperationInProgress
                    .getValue()
                    .filter((op) => op !== operationId),
            ])
        )
    );
};

export const deleteFile = (
  fileId: string
): Observable<OperationResult<void>> => {
  const operationId = Math.random();

  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue(),
    operationId,
  ]);

  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.delete(baseUrl + "/file/" + fileId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    ),
    tap((_) => {
      primaryFilesViewFiles.next(
        primaryFilesViewFiles.getValue().filter((file) => file.id !== fileId)
      );
      secondaryFilesViewFiles.next(
        secondaryFilesViewFiles.getValue().filter((file) => file.id !== fileId)
      );
      selectedFiles.next(
        selectedFiles.getValue().filter((file) => file.id !== fileId)
      );
    }),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err })),
    finalize(() =>
      driveOperationInProgress.next([
        ...driveOperationInProgress
          .getValue()
          .filter((op) => op !== operationId),
      ])
    )
  );
};

export const downloadFile = (
  file: FileData,
  notifyResult: boolean = true
): Observable<OperationResult<void>> => {
  // @ts-ignore
  for (const [key, value] of downloadProgress.getValue()) {
    if (value.filename === file.filename) {
      return of({ isSuccessful: true });
    }
  }

  const operationId = Math.random();
  const abortController = new AbortController();

  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue(),
    operationId,
  ]);

  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.get(baseUrl + "/file/" + file.id + "/download", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
          signal: abortController.signal,
          onDownloadProgress: (progressEvent) => {
            downloadProgress.next(
              new Map(
                downloadProgress.getValue().set(operationId, {
                  operationId: operationId,
                  progress: progressEvent.progress
                    ? progressEvent.progress * 100
                    : 0,
                  filename: file.filename,
                  isDir: file.is_dir,
                  fileData: file,
                  abortController: abortController,
                  operationType: OperationTypeEnum.DOWNLOAD,
                })
              )
            );
          },
        })
      )
    ),
    map((response) => response.data),
    map((fileContent) => saveAs(fileContent, file.filename)),
    tap((_) => {
      if (notifyResult)
        notify({
          type: NotificationTypeEnum.SUCCESS,
          message: SuccessCodeEnum.FILE_DOWNLOAD_SUCCESSFUL,
        });
    }),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => {
      if (notifyResult) notifyError(ErrorCodeEnum.FILE_DOWNLOAD_FAILED);
      return of({ isSuccessful: false, error: err });
    }),
    finalize(() => deleteDownloadOperation(operationId))
  );
};

export const downloadSelectedFiles = (): Observable<OperationResult<void>> => {
  return zip(
    selectedFiles
      .getValue()
      .filter((file) => !file.is_dir)
      .map((file) => downloadFile(file, false))
  ).pipe(
    tap((_) =>
      notify({
        type: NotificationTypeEnum.SUCCESS,
        message: SuccessCodeEnum.FILES_DOWNLOAD_SUCCESSFUL,
      })
    ),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => {
      notifyError(ErrorCodeEnum.FILES_DOWNLOAD_FAILED);
      return of({ isSuccessful: false, error: err });
    })
  );
};

export const deleteSelectedFiles = (): Observable<OperationResult<void>> => {
  return zip(selectedFiles.getValue().map((file) => deleteFile(file.id))).pipe(
    tap((_) => selectedFiles.next([])),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err }))
  );
};

export const cancelOperation = (operation: OperationProgressData) => {
  operation.abortController.abort();

  if (operation.operationType === OperationTypeEnum.DOWNLOAD) {
    deleteDownloadOperation(operation.operationId);
  } else {
    deleteUploadOperation(operation.operationId);
  }
};

const deleteDownloadOperation = (operationId: number) => {
  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue().filter((op) => op !== operationId),
  ]);

  const updatedDownloadMap = downloadProgress.getValue();
  updatedDownloadMap.delete(operationId);

  downloadProgress.next(new Map(updatedDownloadMap));
};

const deleteUploadOperation = (operationId: number) => {
  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue().filter((op) => op !== operationId),
  ]);

  const updatedUploadMap = uploadProgress.getValue();
  updatedUploadMap.delete(operationId);

  uploadProgress.next(new Map(updatedUploadMap));
};
