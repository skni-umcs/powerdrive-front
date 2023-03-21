import React, { useEffect, useState } from "react";
import SelectedFiles from "./SelectedFiles";
import {
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import GridOnIcon from "@mui/icons-material/GridOn";
import SortIcon from "@mui/icons-material/Sort";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import { DriveViewModeEnum } from "../../../../../../enums/DriveViewModeEnum";
import {
  downloadProgress$,
  driveOperationInProgress$,
  setSortMode,
  setSortType,
  setSplitViewEnabled,
  setViewMode,
  splitViewEnabled$,
  uploadProgress$,
  viewMode$,
} from "../../../../../../services/DriveService";
import { bind } from "react-rxjs";
import { SortTypeEnum } from "../../../../../../enums/SortTypeEnum";
import { SortModeEnum } from "../../../../../../enums/SortModeEnum";
import { language$ } from "../../../../../../services/LanguageService";
import { mobileView$ } from "../../../../../../services/DimensionsService";

const [useLanguage] = bind(language$);
const [useViewMode] = bind(viewMode$);
const [useSplitViewEnabled] = bind(splitViewEnabled$);
const [useMobileView] = bind(mobileView$);
const [useDriveOperationInProgress] = bind(driveOperationInProgress$);

const DriveActions = () => {
  const LANGUAGE = useLanguage();
  const viewMode = useViewMode();
  const splitViewEnabled = useSplitViewEnabled();
  const mobileView = useMobileView();
  const driveOperationInProgress = useDriveOperationInProgress();
  const [downloadProgress, setDownloadProgress] =
    useState<Map<number, number>>();
  const [uploadProgress, setUploadProgress] = useState<Map<number, number>>();
  const [sortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const subscription = downloadProgress$.subscribe((progressMap) =>
      setDownloadProgress(progressMap)
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = uploadProgress$.subscribe((progressMap) =>
      setUploadProgress(progressMap)
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleCloseSortMenu = () => {
    setSortMenuOpen(false);
  };

  const handleToggleSortMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSortMenuOpen(!sortMenuOpen);
    setMenuAnchor(e.currentTarget);
  };

  const handleChangeViewMode = () => {
    viewMode === DriveViewModeEnum.LIST
      ? setViewMode(DriveViewModeEnum.GRID)
      : setViewMode(DriveViewModeEnum.LIST);
  };

  const handleToggleSplitView = () => {
    setSplitViewEnabled(!splitViewEnabled);
  };

  const handleSelectSortType = (
    sortType: SortTypeEnum,
    sortMode: SortModeEnum
  ) => {
    setSortMenuOpen(false);
    setSortMode(sortMode);
    setSortType(sortType);
  };

  return (
    <div className="app__drive__content__header__actions">
      {driveOperationInProgress.length > 0 && (
        <CircularProgress sx={{ marginRight: 3 }} size={30} />
      )}
      {downloadProgress &&
        Array.from(downloadProgress).map(([id, value]) => {
          return (
            <CircularProgress
              key={id}
              sx={{ marginRight: 3 }}
              variant="determinate"
              size={30}
              value={value}
            />
          );
        })}

      {uploadProgress &&
        Array.from(uploadProgress).map(([id, value]) => (
          <CircularProgress
            key={id}
            sx={{ marginRight: 3 }}
            variant="determinate"
            size={30}
            value={value}
          />
        ))}
      {!mobileView && <SelectedFiles />}
      <div className="app__drive__content__header__actions__container">
        {!mobileView && (
          <Tooltip title={LANGUAGE.DRIVE.ACTIONS.SPLIT_VIEW} placement="top">
            <div className="app__drive__content__header__actions__action">
              <IconButton onClick={handleToggleSplitView}>
                {splitViewEnabled ? (
                  <SplitscreenIcon style={{ transform: "rotate(90deg)" }} />
                ) : (
                  <ScreenshotMonitorIcon />
                )}
              </IconButton>
            </div>
          </Tooltip>
        )}
        <Tooltip title={LANGUAGE.DRIVE.ACTIONS.SORT_MODE} placement="top">
          <div className="app__drive__content__header__actions__action">
            <IconButton onClick={handleToggleSortMenu}>
              <SortIcon />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title={LANGUAGE.DRIVE.ACTIONS.VIEW_MODE} placement="top">
          <div className="app__drive__content__header__actions__action">
            <IconButton onClick={handleChangeViewMode}>
              {viewMode === DriveViewModeEnum.LIST ? (
                <ReorderIcon />
              ) : (
                <GridOnIcon />
              )}
            </IconButton>
          </div>
        </Tooltip>
      </div>
      <Menu
        open={sortMenuOpen}
        onClose={handleCloseSortMenu}
        anchorEl={menuAnchor}
      >
        {(Object.keys(SortTypeEnum) as Array<keyof typeof SortTypeEnum>).map(
          (sortType) =>
            (Object.keys(SortModeEnum) as Array<keyof typeof SortModeEnum>).map(
              (sortMode) => (
                <MenuItem
                  key={sortType + sortMode}
                  onClick={() =>
                    handleSelectSortType(
                      sortType as SortTypeEnum,
                      sortMode as SortModeEnum
                    )
                  }
                >
                  {`${LANGUAGE.DRIVE.SORT_TYPE[sortType]} (${LANGUAGE.DRIVE.SORT_MODE[sortMode]})`}
                </MenuItem>
              )
            )
        )}
      </Menu>
    </div>
  );
};

export default DriveActions;
