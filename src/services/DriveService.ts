import {BehaviorSubject} from "rxjs";
import {DriveViewModeEnum} from "../enums/DriveViewModeEnum";
import {SortTypeEnum} from "../enums/SortTypeEnum";
import {FileData} from "../models/api/FileData";

const viewMode = new BehaviorSubject<DriveViewModeEnum>(DriveViewModeEnum.GRID);
export const viewMode$ = viewMode.asObservable();


const primaryPreviewPath = new BehaviorSubject<string | null>(null);
export const primaryPreviewPath$ = primaryPreviewPath.asObservable();


const primaryPreviewFiles = new BehaviorSubject<FileData | null>(null);
export const primaryPreviewFiles$ = primaryPreviewFiles.asObservable();


const secondaryPreviewPath = new BehaviorSubject<string | null>(null);
export const secondaryPreviewPath$ = secondaryPreviewPath.asObservable();


const secondaryPreviewFiles = new BehaviorSubject<FileData | null>(null);
export const secondaryPreviewFiles$ = secondaryPreviewFiles.asObservable();


const sortType = new BehaviorSubject<SortTypeEnum | null>(null);
export const sortType$ = sortType.asObservable();


const selectedFiles = new BehaviorSubject<FileData[]>([]);
export const selectedFiles$ = selectedFiles.asObservable();


export const setViewMode = (mode: DriveViewModeEnum) => {
    viewMode.next(mode);
}

export const setPrimaryPreviewPath = (path: string | null) => {
    primaryPreviewPath.next(path);
}

export const setPrimaryPreviewFiles = (files: FileData | null) => {
    primaryPreviewFiles.next(files);
}

export const setSecondaryPreviewPath = (path: string | null) => {
    secondaryPreviewPath.next(path);
}

export const setSecondaryPreviewFiles = (files: FileData | null) => {
    secondaryPreviewFiles.next(files);
}

export const setSortType = (type: SortTypeEnum | null) => {
    sortType.next(type);
}

export const setSelectedFiles = (files: FileData[]) => {
    selectedFiles.next(files);
}

export const clearSelectedFiles = () => {
    selectedFiles.next([]);
}

export const toggleSelectedFile = (file: FileData) => {
    const files = selectedFiles.getValue();
    const index = files.findIndex(f => f.id === file.id);
    if (index === -1) {
        files.push(file);
    } else {
        files.splice(index, 1);
    }
    selectedFiles.next(files);
}
