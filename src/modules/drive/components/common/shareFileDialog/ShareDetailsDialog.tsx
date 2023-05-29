import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { language$ } from "../../../../../services/LanguageService";
import { bind } from "react-rxjs";
import { UserWithShares } from "../../../../../models/ui/UserWithShares";
import { ShareDetailsDialogTypeEnum } from "../../../../../enums/ShareDetailsDialogTypeEnum";
import SendIcon from "@mui/icons-material/Send";
import { FileData } from "../../../../../models/api/FileData";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import { FileShareData } from "../../../../../models/api/FileShareData";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ShareIcon from "@mui/icons-material/Share";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import FolderDeleteOutlinedIcon from "@mui/icons-material/FolderDeleteOutlined";
import { LoadingButton } from "@mui/lab";

interface ShareDetailsDialogProps {
  open: boolean;
  users: UserWithShares[];
  onClose: (updatedData: UserWithShares[] | null) => void;
  sharedFile: FileData;
  dialogType: ShareDetailsDialogTypeEnum;
  loading: boolean;
}

const [useLanguage] = bind(language$);

const ShareDetailsDialog = ({
  open,
  users,
  onClose,
  sharedFile,
  dialogType,
  loading,
}: ShareDetailsDialogProps) => {
  const LANGUAGE = useLanguage();
  const [updatedUsers, setUpdatedUsers] = useState<UserWithShares[]>([]);
  const [searchResults, setSearchResults] = useState<UserWithShares[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    setSearchOpen(false);
    setSearchResults([]);
    setUpdatedUsers(
      [...users].map((user) => ({
        user: { ...user.user },
        share: user.share ? { ...user.share } : null,
      }))
    );
  }, [open]);

  const handleSearch = (searchPhrase: string) => {
    if (searchPhrase.length < 3) {
      setSearchResults([]);
      return setSearchOpen(false);
    }

    const search = searchPhrase
      .split(" ")
      .map((phrase) => phrase.trim().toLowerCase());

    setSearchResults(
      users
        .filter((user) => !user.share)
        .filter((user) => searchFilter(user, search))
    );
    setSearchOpen(true);
  };

  const searchFilter = (
    user: UserWithShares,
    searchPhrase: string[]
  ): boolean => {
    if (searchPhrase.length === 1) {
      return (
        user.user.username.toLowerCase().includes(searchPhrase[0]) ||
        user.user.first_name.toLowerCase().includes(searchPhrase[0]) ||
        user.user.last_name.toLowerCase().includes(searchPhrase[0]) ||
        user.user.email.toLowerCase().includes(searchPhrase[0])
      );
    } else {
      return (
        user.user.first_name.toLowerCase().includes(searchPhrase[0]) &&
        user.user.last_name.toLowerCase().includes(searchPhrase[1])
      );
    }
  };

  const handleShareWithUser = (user: UserWithShares) => {
    const updated = [...updatedUsers];
    const userIdx = updated.findIndex((u) => u.user.id === user.user.id);
    updated[userIdx] = {
      user: user.user,
      share: {
        file_id: sharedFile.id,
        user_id: user.user.id,
        read: true,
        write: false,
        delete: false,
        share: false,
      },
    };

    setUpdatedUsers(updated);
    setSearchOpen(false);
  };

  const handleUpdatePermission = (
    userId: string,
    permission: keyof FileShareData,
    value: boolean
  ) => {
    const updated = [...updatedUsers];
    const userIdx = updated.findIndex((u) => u.user.id === userId);
    // @ts-ignore
    updated[userIdx].share[permission!] = value;
    setUpdatedUsers(updated);
  };

  const handleDeleteUserShare = (userId: string) => {
    const updated = [...updatedUsers];
    const userIdx = updated.findIndex((u) => u.user.id === userId);
    updated[userIdx].share = null;
    setUpdatedUsers(updated);
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)}>
      <DialogTitle>{LANGUAGE.DRIVE.SHARE_FILE_DIALOG.USERS_SHARES}</DialogTitle>
      <DialogContent>
        <Autocomplete
          getOptionLabel={(option: UserWithShares) => option.user.username}
          filterOptions={(options, state) => options}
          options={searchResults}
          noOptionsText={LANGUAGE.DRIVE.SHARE_FILE_DIALOG.NO_USERS}
          open={searchOpen}
          onInputChange={(event, newInputValue) => handleSearch(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label={LANGUAGE.DRIVE.SHARE_FILE_DIALOG.SEARCH_USERS}
            />
          )}
          renderOption={(props, option) => (
            <div
              key={option.user.id}
              className="app__share-details-dialog__share-item"
              onClick={() => handleShareWithUser(option)}
            >
              <div className="app__share-details-dialog__share-item__info">
                <div className="app__share-details-dialog__share-item__title">
                  {`${option.user.first_name} ${option.user.last_name} (${option.user.username})`}
                </div>
                <div className="app__share-details-dialog__share-item__subtitle">
                  {option.user.email}
                </div>
              </div>
              <SendIcon />
            </div>
          )}
        />
        {updatedUsers.filter((user) => !!user.share).length > 0 && (
          <div className="app__share-details-dialog__share-list">
            {updatedUsers
              .filter((user) => !!user.share)
              .map((user) => (
                <div
                  key={user.user.id}
                  className="app__share-details-dialog__share-list__item"
                >
                  <div className="app__share-details-dialog__share-item__info">
                    <div className="app__share-details-dialog__share-item__title">
                      {`${user.user.first_name} ${user.user.last_name} (${user.user.username})`}
                    </div>
                    <div className="app__share-details-dialog__share-item__subtitle">
                      {user.user.email}
                    </div>
                  </div>
                  <div className="app__share-details-dialog__share-list__item__actions">
                    <div className="app__share-details-dialog__share-list__item__permissions">
                      <Tooltip
                        title={LANGUAGE.DRIVE.SHARE_FILE_DIALOG.CAN_READ}
                        placement="top"
                      >
                        <Checkbox
                          size="small"
                          icon={<AutoStoriesOutlinedIcon />}
                          checkedIcon={<AutoStoriesIcon />}
                          checked={user.share!.read}
                          onClick={(_) =>
                            handleUpdatePermission(
                              user.user.id,
                              "read",
                              !user.share!.read
                            )
                          }
                        />
                      </Tooltip>
                      <Tooltip
                        title={LANGUAGE.DRIVE.SHARE_FILE_DIALOG.CAN_WRITE}
                        placement="top"
                      >
                        <Checkbox
                          size="small"
                          icon={<BorderColorOutlinedIcon />}
                          checkedIcon={<BorderColorIcon />}
                          checked={user.share!.write}
                          onClick={(_) =>
                            handleUpdatePermission(
                              user.user.id,
                              "write",
                              !user.share!.write
                            )
                          }
                        />
                      </Tooltip>
                      <Tooltip
                        title={LANGUAGE.DRIVE.SHARE_FILE_DIALOG.CAN_SHARE}
                        placement="top"
                      >
                        <Checkbox
                          size="small"
                          icon={<ShareOutlinedIcon />}
                          checkedIcon={<ShareIcon />}
                          checked={user.share!.share}
                          onClick={(_) =>
                            handleUpdatePermission(
                              user.user.id,
                              "share",
                              !user.share!.share
                            )
                          }
                        />
                      </Tooltip>

                      <Tooltip
                        title={LANGUAGE.DRIVE.SHARE_FILE_DIALOG.CAN_DELETE}
                        placement="top"
                      >
                        <Checkbox
                          size="small"
                          icon={<FolderDeleteOutlinedIcon />}
                          checkedIcon={<FolderDeleteIcon />}
                          checked={user.share!.delete}
                          onClick={(_) =>
                            handleUpdatePermission(
                              user.user.id,
                              "delete",
                              !user.share!.delete
                            )
                          }
                        />
                      </Tooltip>
                    </div>
                    <IconButton
                      onClick={(_) => handleDeleteUserShare(user.user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)} color="primary">
          {LANGUAGE.DRIVE.SHARE_FILE_DIALOG.CANCEL}
        </Button>
        <LoadingButton
          onClick={() => onClose(updatedUsers)}
          color="primary"
          variant="contained"
          loading={loading}
        >
          {LANGUAGE.DRIVE.SHARE_FILE_DIALOG.SAVE}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ShareDetailsDialog;
