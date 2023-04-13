import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { bind } from "react-rxjs";
import { language$ } from "services/LanguageService";

const [useLanguage] = bind(language$);

interface FormValues {
  oldPassword: string;
  repeatedOldPassword: string;
  newPassword: string;
  repeatedNewPassword: string;
}

interface Props {
  onSubmit: (values: FormValues) => void;
}

const AccountPasswordResetForm: React.FC<Props> = ({ onSubmit }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [repeatedOldPassword, setRepeatedOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");

  const LANGUAGE = useLanguage();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      oldPassword,
      repeatedOldPassword,
      newPassword,
      repeatedNewPassword,
    });
  };

  return (
    <div className="app__settings__form">
      <TextField
        fullWidth
        type="password"
        margin="dense"
        label={LANGUAGE.SETTINGS.FORM.OLD_PASSWORD}
        variant="filled"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        margin="dense"
        label={LANGUAGE.SETTINGS.FORM.REPEAT_OLD_PASSWORD}
        variant="filled"
        value={repeatedOldPassword}
        onChange={(e) => setRepeatedOldPassword(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        margin="dense"
        label={LANGUAGE.SETTINGS.FORM.NEW_PASSWORD}
        variant="filled"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        margin="dense"
        label={LANGUAGE.SETTINGS.FORM.REPEAT_NEW_PASSWORD}
        variant="filled"
        value={repeatedNewPassword}
        onChange={(e) => setRepeatedNewPassword(e.target.value)}
      />
      <div className="app__m-2">
        <LoadingButton type="submit" variant="contained">
          {LANGUAGE.SETTINGS.FORM.CHANGE_PASSWORD}
        </LoadingButton>
      </div>
    </div>
  );
};

export default AccountPasswordResetForm;
