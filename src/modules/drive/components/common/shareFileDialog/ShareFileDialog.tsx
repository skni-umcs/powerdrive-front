import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
} from "@mui/material";
import { bind } from "react-rxjs";
import { language$ } from "../../../../../services/LanguageService";
import { UserData } from "../../../../../models/api/UserData";
import { FileData } from "../../../../../models/api/FileData";
import { getAllUsers } from "../../../../../services/UserService";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { mobileView$ } from "../../../../../services/DimensionsService";
import {
  finalize,
  from,
  switchMap,
  tap,
  zipWith,
  of,
  map,
  take,
  combineLatestAll,
} from "rxjs";
import {
  createShare,
  deleteShare,
  getSharesForFile,
  updateShare,
} from "../../../../../services/ShareService";
import { UserWithShares } from "../../../../../models/ui/UserWithShares";
import AddIcon from "@mui/icons-material/Add";
import ShareDetailsDialog from "./ShareDetailsDialog";
import { ShareDetailsDialogTypeEnum } from "../../../../../enums/ShareDetailsDialogTypeEnum";
import { baseAppUrl } from "../../../../../const/environment";
import { PathEnum } from "../../../../../enums/PathEnum";
import { loggedUser$ } from "../../../../../services/AuthService";
import { FileShareData } from "../../../../../models/api/FileShareData";
import DeleteDialog from "../../../../common/dialogs/deleteDialog/DeleteDialog";

interface ShareFileDialogProps {
  open: boolean;
  onClose: () => void;
  sharedFile: FileData;
}

const [useLanguage] = bind(language$);
const [useMobileView] = bind(mobileView$);
const [useLoggedUser] = bind(loggedUser$);

const ShareFileDialog = ({
  open,
  onClose,
  sharedFile,
}: ShareFileDialogProps) => {
  const LANGUAGE = useLanguage();
  const mobileView = useMobileView();
  const loggedUser = useLoggedUser();

  const [users, setUsers] = useState<UserWithShares[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shareLink, setShareLink] = useState<string>("");
  const [detailsDialogOpen, setDetailsDialogOpen] = useState<boolean>(false);
  const [detailsDialogType, setDetailsDialogType] =
    useState<ShareDetailsDialogTypeEnum>(ShareDetailsDialogTypeEnum.USERS);
  const [shareDetailsLoading, setShareDetailsLoading] =
    useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteDialogLoading, setDeleteDialogLoading] =
    useState<boolean>(false);
  const [deleteDialogData, setDeleteDialogData] = useState<string>("");

  useEffect(() => {
    if (!open) return;

    setShareLink(
      `${baseAppUrl}/${PathEnum.SHARED}/${PathEnum.FILES}/${sharedFile.id}`
    );

    setShareDetailsLoading(false);
    setDetailsDialogOpen(false);
    setDeleteDialogOpen(false);

    setIsLoading(true);

    getAllUsers()
      .pipe(
        take(1),
        map((users) => users.filter((user) => user.id !== loggedUser!.id)),
        switchMap((users) =>
          getSharesForFile(sharedFile.id).pipe(
            take(1),
            tap((shares) => fillUsersWithShares(users, shares))
          )
        ),
        finalize(() => setIsLoading(false))
      )
      .subscribe();
  }, [open]);

  const fillUsersWithShares = (users: UserData[], shares: FileShareData[]) => {
    const usersWithShares = users.map((user) => {
      const share = shares.find((s) => s.user_id === user.id);
      return {
        user: user,
        share: share,
      };
    });
    setUsers(usersWithShares);
  };

  const handleUpdateShareDetails = (updatedUsers: UserWithShares[] | null) => {
    if (!updatedUsers) {
      return setDetailsDialogOpen(false);
    }

    from(users)
      .pipe(
        zipWith(from(updatedUsers)),
        map(([oldUser, newUser]) => {
          if (oldUser.share && !newUser.share) {
            return deleteShare(oldUser.share.id!).pipe(
              switchMap(() => of(null))
            );
          } else if (!oldUser.share && newUser.share) {
            return createShare(newUser.share);
          } else if (oldUser.share && newUser.share) {
            if (
              oldUser.share.read !== newUser.share.read ||
              oldUser.share.write !== newUser.share.write ||
              oldUser.share.share !== newUser.share.share ||
              oldUser.share.delete !== newUser.share.delete
            ) {
              return updateShare({ ...newUser.share, id: oldUser.share.id! });
            } else {
              return of(oldUser.share);
            }
          }

          return of(null);
        }),
        combineLatestAll()
      )
      .subscribe((shares) => {
        setShareDetailsLoading(false);
        setDetailsDialogOpen(false);
        fillUsersWithShares(
          users.map((user) => user.user),
          shares.filter((share) => share !== null)
        );
      });
  };

  const handleDeleteShare = (shareId: any | null) => {
    if (!shareId) {
      return setDeleteDialogOpen(false);
    }

    setDeleteDialogLoading(true);
    deleteShare(shareId)
      .pipe(
        tap((_) => {
          const updatedUsers = [...users];
          const userIndex = updatedUsers.findIndex(
            (user) => user.share?.id === shareId
          );
          updatedUsers[userIndex].share = null;
          setUsers(updatedUsers);
        })
      )
      .subscribe({
        next: () => {
          setDeleteDialogLoading(false);
          setDeleteDialogOpen(false);
        },
        error: () => {
          setDeleteDialogLoading(false);
          setDeleteDialogOpen(false);
          console.log("Error while deleting share");
        },
      });
  };

  const handleShowShareDetailsDialog = (
    dialogType: ShareDetailsDialogTypeEnum
  ) => {
    if (isLoading) return;
    setDetailsDialogType(dialogType);
    setDetailsDialogOpen(true);
  };

  const handleShowDeleteShareDialog = (shareId: string) => {
    if (isLoading) return;
    setDeleteDialogData(shareId);
    setDeleteDialogOpen(true);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <React.Fragment>
      <Dialog open={open} fullScreen={mobileView} onClose={onClose}>
        <DialogTitle>{LANGUAGE.DRIVE.SHARE_FILE_DIALOG.TITLE}</DialogTitle>
        <DialogContent>
          <div className="app__share-file-dialog__content">
            <div className="app__share-file-dialog__control__section">
              <p className="app__share-file-dialog__control__section__label">
                {LANGUAGE.DRIVE.SHARE_FILE_DIALOG.SHARE_LINK}
              </p>
              <div className="app__share-file-dialog__control__section__container">
                <p>{shareLink}</p>
                <IconButton
                  size="small"
                  onClick={(_) => handleCopyToClipboard()}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </div>
            </div>

            <div className="app__share-file-dialog__control__section">
              <p className="app__share-file-dialog__control__section__label">
                {LANGUAGE.DRIVE.SHARE_FILE_DIALOG.USERS}
              </p>
              <div className="app__share-file-dialog__control__section__container">
                <div className="app__share-file-dialog__control__chips">
                  {isLoading ? (
                    [...Array(5)].map((_, idx) => (
                      <div
                        key={idx}
                        className="app__share-file-dialog__control__chip"
                      >
                        <Skeleton
                          variant="rounded"
                          width={100}
                          height={20}
                          style={{ borderRadius: "30px" }}
                        />
                      </div>
                    ))
                  ) : (
                    <React.Fragment>
                      {users
                        .filter((u) => !!u.share)
                        .map((user: UserWithShares) => (
                          <div
                            key={user.user.id}
                            className="app__share-file-dialog__control__chip"
                          >
                            <Chip
                              label={`${user.user.first_name} ${user.user.last_name}`}
                              color="primary"
                              onDelete={() =>
                                handleShowDeleteShareDialog(user.share!.id!)
                              }
                              size="small"
                            />
                          </div>
                        ))}
                      <div className="app__share-file-dialog__control__chip">
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          style={{ borderRadius: "30px" }}
                          onClick={() =>
                            handleShowShareDetailsDialog(
                              ShareDetailsDialogTypeEnum.USERS
                            )
                          }
                        >
                          <AddIcon fontSize="small" />
                        </Button>
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleShowShareDetailsDialog(
                      ShareDetailsDialogTypeEnum.USERS
                    )
                  }
                >
                  <OpenInFullIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="contained">
            {LANGUAGE.DRIVE.SHARE_FILE_DIALOG.OK}
          </Button>
        </DialogActions>
      </Dialog>
      <ShareDetailsDialog
        open={detailsDialogOpen}
        users={users}
        onClose={handleUpdateShareDetails}
        sharedFile={sharedFile}
        dialogType={detailsDialogType}
        loading={shareDetailsLoading}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        loading={deleteDialogLoading}
        data={deleteDialogData}
        title={LANGUAGE.DRIVE.SHARE_FILE_DIALOG.DELETE_TITLE}
        description={LANGUAGE.DRIVE.SHARE_FILE_DIALOG.DELETE_DESCRIPTION}
        onClose={handleDeleteShare}
      />
    </React.Fragment>
  );
};

export default ShareFileDialog;
