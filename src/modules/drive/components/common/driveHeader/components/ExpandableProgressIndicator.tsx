import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  downloadProgress$,
  uploadProgress$,
} from "../../../../../../services/DriveService";
import { bind } from "react-rxjs";
import { language$ } from "../../../../../../services/LanguageService";
import { OperationProgressData } from "../../../../../../models/ui/OperationProgressData";
import SortIcon from "@mui/icons-material/Sort";

const [useLanguage] = bind(language$);

const ExpandableProgressIndicator = () => {
  const LANGUAGE = useLanguage();
  const [downloadProgress, setDownloadProgress] =
    useState<Map<number, OperationProgressData>>();
  const [uploadProgress, setUploadProgress] =
    useState<Map<number, OperationProgressData>>();

  const [downloadMenuOpen, setDownloadMenuOpen] = useState<boolean>(false);
  const [uploadMenuOpen, setUploadMenuOpen] = useState<boolean>(false);

  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    useState<null | HTMLElement>(null);

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

  const handleCloseDownloadMenu = () => {
    setDownloadMenuOpen(false);
  };

  const handleCloseUploadMenu = () => {
    setUploadMenuOpen(false);
  };

  const handleToggleDownloadMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuOpen(!downloadMenuOpen);
    setDownloadMenuAnchor(e.currentTarget);
  };

  return (
    <React.Fragment>
      {downloadProgress && (
        <div className="app__drive__content__header__actions__action">
          <IconButton onClick={handleToggleDownloadMenu}>
            <SortIcon />
          </IconButton>
        </div>
      )}

      {uploadProgress &&
        Array.from(uploadProgress).map(([id, value]) => (
          <Tooltip
            title={`${LANGUAGE.DRIVE.FINISHED}: ${Math.floor(value.progress)}%`}
            placement="top"
            key={id}
          >
            <CircularProgress
              sx={{ marginRight: 3 }}
              variant="determinate"
              size={30}
              value={value.progress}
            />
          </Tooltip>
        ))}

      <Menu
        open={downloadMenuOpen}
        onClose={handleCloseDownloadMenu}
        anchorEl={downloadMenuAnchor}
      >
        {Array.from(downloadProgress!).map(([id, value]) => (
          <MenuItem>
            {value.filename}
            <ListItemIcon>
              <Tooltip
                title={`${LANGUAGE.DRIVE.FINISHED}: ${Math.floor(
                  value.progress
                )}%`}
                placement="top"
                key={id}
              >
                <CircularProgress
                  sx={{ marginRight: 3 }}
                  variant="determinate"
                  size={30}
                  value={value.progress}
                />
              </Tooltip>
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default ExpandableProgressIndicator;
