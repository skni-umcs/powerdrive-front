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
    INIT: {
      SLOGAN: "Twoje biuro, gdziekolwiek jesteś",
      DESCRIPTION:
        "Załóż konto i zacznij organizować swoją wirtualną przestrzeń",
      CREATE_ACCOUNT_SLOGAN: "Dołącz do nas już dziś!",
      CREATE_ACCOUNT_DESCRIPTION:
        "Załóż konto i zacznij korzystać z naszych usług",
      CREATE_ACCOUNT: "Załóż konto",
      FILES: "Pliki",
      EVENTS: "Wydarzenia",
      NOTES: "Notatki",
      JOIN: "Dołącz teraz!",
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
      LOGIN_ATTEMPT_FAILED: "Nieudana próba logowania",
      LOGIN_ATTEMPT_SUCCESS: "Zalogowano pomyślnie",
      REGISTER_ATTEMPT_FAILED: "Nieudana próba rejestracji",
      REGISTER_ATTEMPT_SUCCESS: "Zarejestrowano pomyślnie",
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
    COMMON: {
      DELETE_DIALOG: {
        CANCEL: "Anuluj",
        DELETE: "Usuń",
      },
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
      DAYS_SHORT: {
        0: "N",
        1: "Pn",
        2: "Wt",
        3: "Śr",
        4: "Cz",
        5: "Pt",
        6: "So",
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
      WEEK_VIEW_MODE: {
        DAY: "Dzień",
        SCHEDULE: "Grafik",
        WEEK: "Tydzień",
      },
      ADD_EDIT_EVENT_DIALOG: {
        ADD_TITLE: "Utwórz wydarzenie",
        EDIT_TITLE: "Edytuj wydarzenie",
        GENERAL_INFO: "Ogólne informacje",
        EVENT_TITLE: "Tytuł wydarzenia",
        DATE: "Data wydarzenia",
        TIME_RANGE: "Czas wydarzenia",
        FROM: "Od",
        TO: "Do",
        IS_REOCCURRING: "Powtarzające się",
        REOCCURRING_TYPE: "Typ powtarzania",
        REOCCURRING_END: "Koniec powtarzania",
        IS_FULL_DAY: "Całodniowe",
        DESCRIPTION: "Opis",
        PLACE: "Miejsce",
        ADD_ACTION: "Utwórz",
        EDIT_ACTION: "Edytuj",
        CANCEL: "Anuluj",
        CALENDAR: "Kalendarz",
      },
      DELETE_EVENT_DIALOG: {
        TITLE: "Czy na pewwno chcesz usunąć to wydarzenie?",
        DESCRIPTION: "Tej operacji nie można cofnąć. Czy chcesz kontynuować?",
        DELETE: "Usuń",
        CANCEL: "Anuluj",
      },
      ADD_EVENT: "Dodaj wydarzenie",
      ADD_CALENDAR: "Dodaj kalendarz",
      ADD_EDIT_CALENDAR_DIALOG: {
        ADD_TITLE: "Utwórz kalendarz",
        EDIT_TITLE: "Edytuj kalendarz",
        NAME: "Nazwa kalendarza",
        DESCRIPTION: "Opis kalendarza",
        COLOR: "Kolor kalendarza",
        CANCEL: "Anuluj",
        ADD_ACTION: "Utwórz",
        EDIT_ACTION: "Edytuj",
      },
    },
    DRIVE: {
      YOUR_FILES: "Twoje pliki",
      FINISHED: "Ukończono",
      PROGRESS: {
        DOWNLOAD_FILES: "Pobierane pliki",
        UPLOAD_FILES: "Przesyłane pliki",
      },
      ACTIONS: {
        SPLIT_VIEW: "Podzielony widok",
        SORT_MODE: "Tryb sortowania",
        VIEW_MODE: "Tryb wyświetlania",
      },
      SELECTED_FILES: {
        TITLE: "Zaznaczonych plików",
        SHARE: "Udostępnij",
        DOWNLOAD: "Pobierz",
        DELETE: "Usuń",
        CLEAR: "Wyczyść",
      },
      SORT_TYPE: {
        NAME: "Nazwa",
        SIZE: "Rozmiar",
        DATE: "Data",
        TYPE: "Typ",
      },
      SORT_MODE: {
        ASC: "Rosnąco",
        DESC: "Malejąco",
      },
      ERRORS: {
        FILE_UPLOAD_ERROR: "Nie udało się przesłać pliku",
        FOLDER_UPLOAD_ERROR: "Nie udało się przesłać folderu",
        FOLDER_CREATE_ERROR: "Nie udało się utworzyć folderu",
        FOLDER_CONTENT_DOWNLOAD_ERROR:
          "Wystąpił błąd podczas pobierania zawartości folderu",
      },
      UPLOAD_FILE: "Prześlij plik",
      UPLOAD_FOLDER: "Prześlij folder",
      CREATE_FOLDER: "Utwórz folder",
      CREATE_FOLDER_DIALOG: {
        TITLE: "Utwórz folder",
        DESCRIPTION: "Wprowadź nazwę folderu",
        ERROR: "Wprowadzona nazwa jest niepoprawna",
        CREATE: "Utwórz",
        CANCEL: "Anuluj",
      },
      FILE_CONTEXT: {
        DOWNLOAD: "Pobierz",
        RENAME: "Zmień nazwę",
        MOVE: "Przenieś",
        SHOW_DETAILS: "Pokaż szczegóły",
        SHARE: "Udostępnij",
        DELETE: "Usuń",
      },
      RENAME_FILE_DIALOG: {
        TITLE: "Zmień nazwę pliku",
        DESCRIPTION: "Wprowadź nową nazwę pliku",
        ERROR: "Wprowadzona nazwa jest niepoprawna",
        RENAME: "Zmień nazwę",
        CANCEL: "Anuluj",
      },
      MOVE_FILE_DIALOG: {
        TITLE: "Przenieś plik",
        DESCRIPTION: "Wybierz folder docelowy",
        ERROR: "Nie można przenieść pliku do folderu",
        MOVE: "Przenieś",
        CANCEL: "Anuluj",
      },
      DELETE_FILE_DIALOG: {
        FILE_TITLE: "Czy na pewwno chcesz usunąć ten plik?",
        FOLDER_TITLE: "Czy na pewwno chcesz usunąć ten folder?",
        DESCRIPTION: "Tej operacji nie można cofnąć. Czy chcesz kontynuować?",
        DELETE: "Usuń",
        CANCEL: "Anuluj",
      },
      SHARE_FILE_DIALOG: {
        TITLE: "Udostępnianie pliku",
        SHARE_LINK: "Link udostępniania",
        USERS: "Użytkownicy",
        SHARE: "Udostępnij",
        CANCEL: "Anuluj",
        NO_USERS: "Nie odnaleziono użytkowników",
        USERS_SHARES: "Udostępniono użytkownikom",
        SAVE: "Zapisz",
        OK: "OK",
        DELETE_TITLE: "Usuwanie udostępnienia",
        DELETE_DESCRIPTION: "Czy na pewno chcesz usunąć to udostępnienie?",
        SHARE_OPTIONS: {
          READ: "Wyświetlanie",
          WRITE: "Edycja",
        },
        SEARCH_USERS: "Wyszukaj użytkowników",
        CAN_READ: "Może wyświetlać",
        CAN_WRITE: "Może edytować",
        CAN_SHARE: "Może udostępniać",
        CAN_DELETE: "Może usuwać",
      },
      DROP: "Upuść pliki tutaj",
    },
  },
  EN: {
    NAVBAR: {
      SEARCH: "Search",
      LOGIN: "Login",
      REGISTER: "Register",
    },
    INIT: {
      SLOGAN: "Organize your virtual space",
      DESCRIPTION:
        "ZWith our application you can easily manage your files, notes and events. Join us now!",
      CREATE_ACCOUNT_SLOGAN: "Join us today!",
      CREATE_ACCOUNT_DESCRIPTION:
        "Create an account and start using our services",
      CREATE_ACCOUNT: "Create account",
      FILES: "Files",
      EVENTS: "Events",
      NOTES: "Notes",
      JOIN: "Join now!",
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
      LOGIN_ATTEMPT_FAILED: "Login attempt failed",
      LOGIN_ATTEMPT_SUCCESS: "Logged in successfully",
      REGISTER_ATTEMPT_FAILED: "Register attempt failed",
      REGISTER_ATTEMPT_SUCCESS: "Registered successfully",
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
    COMMON: {
      DELETE_DIALOG: {
        CANCEL: "Cancel",
        DELETE: "Delete",
      },
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
      DAYS_SHORT: {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat",
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
      WEEK_VIEW_MODE: {
        DAY: "Day",
        SCHEDULE: "Schedule",
        WEEK: "Week",
      },
      ADD_EDIT_EVENT_DIALOG: {
        ADD_TITLE: "Add event",
        EDIT_TITLE: "Edit event",
        GENERAL_INFO: "General info",
        EVENT_TITLE: "Event title",
        DATE: "Event date",
        TIME_RANGE: "Time range",
        FROM: "From",
        TO: "To",
        IS_REOCCURRING: "Is reoccurring",
        REOCCURRING_TYPE: "Reoccurring type",
        REOCCURRING_END: "Reoccurring end",
        IS_FULL_DAY: "Is full day",
        DESCRIPTION: "Description",
        PLACE: "Place",
        ADD_ACTION: "Add",
        EDIT_ACTION: "Edit",
        CANCEL: "Cancel",
        CALENDAR: "Calendar",
      },
      DELETE_EVENT_DIALOG: {
        TITLE: "Are you sure you want to delete this event?",
        DESCRIPTION:
          "This operation cannot be undone. Do you want to continue?",
        DELETE: "Delete",
        CANCEL: "Cancel",
      },
      ADD_EVENT: "Add event",
      ADD_CALENDAR: "Add calendar",
      ADD_EDIT_CALENDAR_DIALOG: {
        ADD_TITLE: "Add calendar",
        EDIT_TITLE: "Edit calendar",
        NAME: "Calendar name",
        DESCRIPTION: "Calendar description",
        COLOR: "Calendar color",
        CANCEL: "Cancel",
        ADD_ACTION: "Add",
        EDIT_ACTION: "Edit",
      },
    },
    DRIVE: {
      YOUR_FILES: "Your files",
      FINISHED: "Finished",
      PROGRESS: {
        DOWNLOAD_FILES: "Downloading files",
        UPLOAD_FILES: "Uploading files",
      },
      ACTIONS: {
        SPLIT_VIEW: "Split view",
        SORT_MODE: "Sort mode",
        VIEW_MODE: "View mode",
      },
      SELECTED_FILES: {
        TITLE: "Selected files",
        SHARE: "Share",
        DOWNLOAD: "Download",
        DELETE: "Delete",
        CLEAR: "Clear",
      },
      SORT_TYPE: {
        NAME: "Name",
        SIZE: "Size",
        DATE: "Date",
        TYPE: "Type",
      },
      SORT_MODE: {
        ASC: "Ascending",
        DESC: "Descending",
      },
      ERRORS: {
        FILE_UPLOAD_ERROR: "Failed to upload file",
        FOLDER_UPLOAD_ERROR: "Failed to upload folder",
        FOLDER_CREATE_ERROR: "Failed to create folder",
        FOLDER_CONTENT_DOWNLOAD_ERROR: "Failed to download folder content",
      },
      UPLOAD_FILE: "Upload file",
      UPLOAD_FOLDER: "Upload folder",
      CREATE_FOLDER: "Create folder",
      CREATE_FOLDER_DIALOG: {
        TITLE: "Create folder",
        DESCRIPTION: "Enter folder name",
        ERROR: "Folder name is incorrect",
        CREATE: "Create Folder",
        CANCEL: "Cancel",
      },
      FILE_CONTEXT: {
        DOWNLOAD: "Download",
        RENAME: "Rename",
        MOVE: "Move",
        SHOW_DETAILS: "Show details",
        SHARE: "Share",
        DELETE: "Delete",
      },
      RENAME_FILE_DIALOG: {
        TITLE: "Rename file",
        DESCRIPTION: "Enter new file name",
        ERROR: "File name is incorrect",
        RENAME: "Rename",
        CANCEL: "Cancel",
      },
      MOVE_FILE_DIALOG: {
        TITLE: "Move file",
        DESCRIPTION: "Select destination folder",
        ERROR: "Destination folder is incorrect",
        MOVE: "Move",
        CANCEL: "Cancel",
      },
      DELETE_FILE_DIALOG: {
        FILE_TITLE: "Are you sure you want to delete this file?",
        FOLDER_TITLE: "Are you sure you want to delete this folder?",
        DESCRIPTION: "This action cannot be undone. Do you want to continue?",
        DELETE: "Delete",
        CANCEL: "Cancel",
      },
      SHARE_FILE_DIALOG: {
        TITLE: "Share file",
        SHARE_LINK: "Share link",
        USERS: "Users",
        SHARE: "Share",
        CANCEL: "Cancel",
        NO_USERS: "No users found",
        USERS_SHARES: "Users shares",
        SAVE: "Save",
        OK: "OK",
        DELETE_TITLE: "Delete share",
        DELETE_DESCRIPTION: "Are you sure you want to delete this share?",
        SHARE_OPTIONS: {
          READ: "Read",
          WRITE: "Write",
        },
        SEARCH_USERS: "Search users",
        CAN_READ: "Can view",
        CAN_WRITE: "Can edit",
        CAN_SHARE: "Can share",
        CAN_DELETE: "Can delete",
      },
      DROP: "Drop files here",
    },
  },
};

const language = new BehaviorSubject<any>(LANGUAGES.PL);
export const language$ = language.asObservable();

export const setLanguage = (lang: Language) => {
  language.next(LANGUAGES[lang as keyof typeof LANGUAGES]);
};
