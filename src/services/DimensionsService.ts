import { BehaviorSubject } from "rxjs";

const mobileView = new BehaviorSubject<boolean>(false);
export const mobileView$ = mobileView.asObservable();

export const updateView = (width: number) => {
  const isMobile = mobileView.getValue();
  if (isMobile && width >= 1024) mobileView.next(false);
  else if (!isMobile && width < 1024) mobileView.next(true);
};
