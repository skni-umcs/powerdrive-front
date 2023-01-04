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
  },
};

export let LANGUAGE = LANGUAGES.PL;

export const setLanguage = (lang: Language) => {
  console.log("Setting language to: ", lang);
  LANGUAGE = LANGUAGES[lang as keyof typeof LANGUAGES];
};
