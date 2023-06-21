import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { language$ } from "../../../../../services/LanguageService";
import { FileData } from "../../../../../models/api/FileData";
import { bind } from "react-rxjs";
import { LoadingButton } from "@mui/lab";

interface RenameFileDialogProps {
    open: boolean;
    onClose: (file: FileData | null, filename: string | null) => void;
    file: FileData;
}

const [useLanguage] = bind(language$);

const RenameFileDialog = ({
    open,
    onClose,
    file,
}: RenameFileDialogProps) => {
    const LANGUAGE = useLanguage();
    const [filename, setFilename] = React.useState<string>("");
    const [filenameError, setFilenameError] = React.useState<boolean>(false);

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedFilename = event.target.value;
        setFilename(updatedFilename);
        setFilenameError(
            updatedFilename.length === 0 ||
            updatedFilename.includes("/") ||
            filename.includes(" ") ||
            filename === file.filename
        );
    };

    const handleClose = () => {
        onClose(null, null);
        setFilename("");
        setFilenameError(false);
    }

    const handleSubmit = () => {
        if (
            filename.length === 0 ||
            filename.includes("/") ||
            filename.includes(" ") ||
            filename === file.filename
        ) {
            setFilenameError(true);
            return;
        }

        onClose(file, filename);
        setFilename("");
        setFilenameError(false);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{LANGUAGE.DRIVE.RENAME_FILE_DIALOG.TITLE}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {LANGUAGE.DRIVE.RENAME_FILE_DIALOG.DESCRIPTION}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="filename"
                    label={LANGUAGE.DRIVE.RENAME_FILE_DIALOG.LABEL}
                    type="text"
                    fullWidth
                    value={filename}
                    onChange={handleValueChange}
                    error={filenameError}
                    helperText={
                        filenameError
                            ? LANGUAGE.DRIVE.RENAME_FILE_DIALOG.ERROR
                            : ""
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    {LANGUAGE.DRIVE.RENAME_FILE_DIALOG.CANCEL}
                </Button>
                <LoadingButton
                    onClick={handleSubmit}
                    loading={false}
                    loadingPosition="start"
                    variant="contained"
                    color="primary"
                    disabled={filenameError}
                >
                    {LANGUAGE.DRIVE.RENAME_FILE_DIALOG.RENAME}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default RenameFileDialog;
