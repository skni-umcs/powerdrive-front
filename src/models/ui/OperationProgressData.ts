import { FileData } from "../api/FileData";
import { OperationTypeEnum } from "../../enums/OperationTypeEnum";

export interface OperationProgressData {
  operationId: number;
  progress: number;
  fileData?: FileData | null;
  file?: File | null;
  filename: string;
  isDir: boolean;
  abortController: AbortController;
  operationType: OperationTypeEnum;
}
