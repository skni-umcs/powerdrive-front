import { BehaviorSubject } from "rxjs";

export enum Language {
  PL = "PL",
  EN = "EN",
}

const LANGUAGES = {
  PL: {
    NAVBAR: {
      SEARCH: "Wyszukaj",
      LOGIN: "Zaloguj",
      REGISTER: "Zarejestruj",
    },
    AUTH: {
      LOGIN_TITLE: "Logowanie",
      LOGIN: "Zaloguj",
      REGISTER_TITLE: "Rejestracja",
      EMAIL: "Adres Email",
      NAME: "Imię",
      SURNAME: "Nazwisko",
      USERNAME: "Nazwa użytkownika",
      PASSWORD: "Hasło",
      REPEAT_PASSWORD: "Powtórz hasło",
      REGISTER: "Zarejestruj",
      RETRIEVE_ACCOUNT: "Przywróć konto",
      ACCOUNT_RETRIEVAL: "Przywracanie konta",
      ACCOUNT_RETRIEVAL_INSTRUCTION:
        "Wprowadź email, skojarzony z Twoim kontem. Jeśli adres będzie poprawny, zostanie na niego przesłany link umożliwiający reset hasła.",
      ENTER_EMAIL: "Wprowadź adres email",
      SEND_LINK: "Wyślij link",
      LINK_WAS_SENT: "Link został wysłany",
      LINK_WAS_SENT_INSTRUCTION:
        "Jeżeli wprowadzaony został poprawny adres, otrzymasz email z dalszymi instrukcjami.",
      UPDATE_PASSWORD: "Aktualizuj hasło",
      RESET_PASSWORD: "Zresetuj hasło",
      RESETTING_PASSWORD: "Resetowanie hasła",
      ERRORS: {
        LOGIN_ERROR: "Niepoprawna nazwa użytkownika lub hasło",
        SERVER_ERROR: "Wystąpił błąd serwera",
        REQUIRED: "To pole jest wymagane",
        INVALID_EMAIL: "Niepoprawny adres email",
        PASSWORD_TOO_SHORT: "Hasło jest za krótkie",
        PASSWORDS_MUST_MATCH: "Hasła muszą być takie same",
        EMAIL_ALREADY_IN_USE: "Istnieje już konto z takim adresem email",
        USERNAME_TAKEN: "Ta nazwa użytkownika jest już zajęta",
        ACCOUNT_RETRIEVAL_ERROR:
          "Nie udało się wysłać linku do przywracania konta",
      },
    },
    SIDEBAR: {
      DRIVE: "Dysk",
      NOTES: "Notatki",
      CALENDAR: "Kalendarz",
      YOUR_FILES: "Twoje pliki",
      YOUR_NOTES: "Twoje notatki",
      SHARED: "Udostępnione",
      FAVORITES: "Ulubione",
      DELETED: "Usunięte",
      LAST_USED: "Ostatnio używane",
    },
    CALENDAR: {
      DAYS: {
        0: "Niedziela",
        1: "Poniedziałek",
        2: "Wtorek",
        3: "Środa",
        4: "Czwartek",
        5: "Piątek",
        6: "Sobota",
      },
      MONTHS: {
        0: "Styczeń",
        1: "Luty",
        2: "Marzec",
        3: "Kwiecień",
        4: "Maj",
        5: "Czerwiec",
        6: "Lipiec",
        7: "Sierpień",
        8: "Wrzesień",
        9: "Październik",
        10: "Listopad",
        11: "Grudzień",
      },
      YOUR_CALENDARS: "Twoje kalendarze",
      UPCOMING_EVENTS: "Nadchodzące wydarzenia",
    },
    SETTINGS: {
      SETTINGS: "Ustawienia",
      ACCOUNT_SETTINGS: "USTAWIENIA KONTA",
      PASSWORD_RESET: "ZMIANA HASŁA",
      DRIVE_SETTINGS: "USTAWIENIA DYSKU",
      CALENDAR_SETTINGS: "USTAWIENIA KALENDARZA",
      NOTES_SETTINGS: "USTAWIENIA NOTATEK",
      FORM:{
        EMAIL: "Adres email",
        USERNAME: "Nazwa użytkownika",
        FIRSTNAME: "Imię",
        SURNAME: "Nazwisko",
        UPDATE: "AKTUALIZUJ",
        OLD_PASSWORD: "Stare hasło",
        REPEAT_OLD_PASSWORD: "Powtórz stare hasło",
        NEW_PASSWORD: "Nowe hasło",
        REPEAT_NEW_PASSWORD: "Powtórz nowe hasło",
        CHANGE_PASSWORD: "ZMIEŃ HASŁO",
      }
    }
  },
  EN: {
    NAVBAR: {
      SEARCH: "Search",
      LOGIN: "Login",
      REGISTER: "Register",
    },
    AUTH: {
      LOGIN_TITLE: "Login",
      LOGIN: "Log in",
      REGISTER_TITLE: "Register",
      EMAIL: "Email",
      NAME: "Name",
      SURNAME: "Surname",
      USERNAME: "Username",
      PASSWORD: "Password",
      REPEAT_PASSWORD: "Repeat password",
      REGISTER: "Register",
      RETRIEVE_ACCOUNT: "Retrieve account",
      ACCOUNT_RETRIEVAL: "Account retrieval",
      ACCOUNT_RETRIEVAL_INSTRUCTION:
        "Enter your email address. If address is correct, a link to reset your password will be sent.",
      ENTER_EMAIL: "Enter email address",
      SEND_LINK: "Send link",
      LINK_WAS_SENT: "Link was sent",
      LINK_WAS_SENT_INSTRUCTION:
        "If given address was correct you will receive email with further instructions.",
      UPDATE_PASSWORD: "Update password",
      RESET_PASSWORD: "Reset Password",
      RESETTING_PASSWORD: "Resetting Password",
      ERRORS: {
        LOGIN_ERROR: "Invalid username or password",
        SERVER_ERROR: "Server error occurred",
        REQUIRED: "This field is required",
        INVALID_EMAIL: "Invalid email",
        PASSWORD_TOO_SHORT: "Password is too short",
        PASSWORDS_MUST_MATCH: "Passwords must match",
        EMAIL_ALREADY_IN_USE: "Email already in use",
        USERNAME_TAKEN: "Username taken",
        ACCOUNT_RETRIEVAL_ERROR: "Failed to send link to retrieve account",
      },
    },
    SIDEBAR: {
      DRIVE: "Drive",
      NOTES: "Notes",
      CALENDAR: "Calendar",
      YOUR_FILES: "Your files",
      YOUR_NOTES: "Your notes",
      SHARED: "Shared",
      FAVORITES: "Favorites",
      DELETED: "Deleted",
      LAST_USED: "Last used",
    },
    CALENDAR: {
      DAYS: {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      },
      MONTHS: {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
      },
      YOUR_CALENDARS: "Your calendars",
      UPCOMING_EVENTS: "Upcoming events",
    },
    SETTINGS: {
      SETTINGS: "Settings",
      ACCOUNT_SETTINGS: "ACCOUNT SETTINGS",
      PASSWORD_RESET: "RESET PASSWORD",
      DRIVE_SETTINGS: "DRIVE SETTINGS",
      CALENDAR_SETTINGS: "CALENDAR SETTINGS",
      NOTES_SETTINGS: "NOTES SETTINGS",
      FORM:{
        EMAIL: "Email adress",
        USERNAME: "Username",
        FIRSTNAME: "Firstname",
        SURNAME: "Surname",
        UPDATE: "UPDATE",
        OLD_PASSWORD: "Previous password",
        REPEAT_OLD_PASSWORD: "Confirm previous password",
        NEW_PASSWORD: "New password",
        REPEAT_NEW_PASSWORD: "Confirm new password",
        CHANGE_PASSWORD: "CHANGE PASSWORD",
      }
    }
  },
};

const language = new BehaviorSubject<any>(LANGUAGES.PL);
export const language$ = language.asObservable();

export const setLanguage = (lang: Language) => {
  console.log("Setting language to: ", lang);
  language.next(LANGUAGES[lang as keyof typeof LANGUAGES]);
};
