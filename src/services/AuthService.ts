import {BehaviorSubject} from "rxjs";
import {UserData} from "../models/api/UserData";

const loggedUser = new BehaviorSubject<UserData | null>({});
export const loggedUser$ = loggedUser.asObservable();