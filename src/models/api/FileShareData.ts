export interface FileShareData {
  id?: string;
  file_id: string;
  user_id: string;
  read: boolean;
  write: boolean;
  delete: boolean;
  share: boolean;
}
