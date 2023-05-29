import { UserData } from "../api/UserData";
import { FileShareData } from "../api/FileShareData";

export interface UserWithShares {
  user: UserData;
  share: FileShareData | null | undefined;
}
