import { Subject } from "rxjs";

const navigationStream = new Subject<string>();
export const navigationStream$ = navigationStream.asObservable();

export const navigate = (path: string) => {
  navigationStream.next(path);
};
