import { BehaviorSubject } from "rxjs";
import { LastUsedItemData } from "../models/ui/LastUsedItemData";
import { FileTypeEnum } from "../enums/FileTypeEnum";

const lastUsedFiles = new BehaviorSubject<LastUsedItemData[]>([
  { id: "1", name: "Test file 1", type: FileTypeEnum.FILE },
  { id: "2", name: "Test file 2", type: FileTypeEnum.DOC },
  { id: "3", name: "Test Folder", type: FileTypeEnum.FOLDER },
]);
export const lastUsedFiles$ = lastUsedFiles.asObservable();

const lastUsedNotes = new BehaviorSubject<LastUsedItemData[]>([
  { id: "1", name: "Test note", type: FileTypeEnum.NOTE },
  { id: "2", name: "Test note 2", type: FileTypeEnum.NOTE },
  { id: "3", name: "Test Notes Folder", type: FileTypeEnum.NOTES_FOLDER },
]);
export const lastUsedNotes$ = lastUsedNotes.asObservable();
