import { BehaviorSubject } from "rxjs";

const sidebarOpened = new BehaviorSubject<boolean>(false);
export const sidebarOpened$ = sidebarOpened.asObservable();

export const toggleSidebar = () => {
  sidebarOpened.next(!sidebarOpened.value);
};

export const closeSidebar = () => {
  sidebarOpened.next(false);
};

export const openSidebar = () => {
  sidebarOpened.next(true);
};
