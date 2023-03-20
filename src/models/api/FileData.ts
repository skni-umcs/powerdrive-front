export interface FileData {
  id: string;
  filename: string;
  path: string;
  type: string;
  is_dir: boolean;
  is_deleted?: boolean;
  size: number | null;
  last_modified?: string;
  children?: FileData[];
}
