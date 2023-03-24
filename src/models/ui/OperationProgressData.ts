import { FileData } from "../api/FileData";

export interface OperationProgressData {
  progress: number;
  filename: string;
  isDir: boolean;
}
