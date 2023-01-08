import { FileTypeEnum } from "../../enums/FileTypeEnum";

export interface LastUsedItemData {
  id: string;
  name: string;
  type: FileTypeEnum;
}
