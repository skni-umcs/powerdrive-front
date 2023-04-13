import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { bind } from "react-rxjs";
import { language$ } from "services/LanguageService";

const [useLanguage] = bind(language$);

interface FormValues {
  name: string;
  email: string;
  surname: string;
  firstname: string;
}

interface Props {
  onSubmit: (values: FormValues) => void;
}

const AccountSettingsForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState("PowerDriveEnjoyer");
  const [email, setEmail] = useState("iLovePowerDrive@umcs.com");
  const [firstname, setFirstname] = useState("Johnatan");
  const [surname, setSurname] = useState("Hamilton");

  const LANGUAGE = useLanguage();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ name, email, firstname, surname });
  };

  return (
    <div className="app__settings__form">
      <TextField
        fullWidth
        margin="dense"
        label={LANGUAGE.SETTINGS.FORM.EMAIL}
        variant="filled"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        margin="dense"
        label={LANGUAGE.SETTINGS.FORM.USERNAME}
        variant="filled"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        margin="dense"
        label={LANGUAGE.SETTINGS.FORM.FIRSTNAME}
        variant="filled"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        fullWidth
        margin="dense"
        label={LANGUAGE.SETTINGS.FORM.SURNAME}
        variant="filled"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <LoadingButton type="submit">
        {LANGUAGE.SETTINGS.FORM.UPDATE}
      </LoadingButton>
    </div>
  );
};

export default AccountSettingsForm;
