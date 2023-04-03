import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  List,
  Menu,
  Typography,
} from "@mui/material";
import {
  downloadProgress$,
  uploadProgress$,
} from "../../../../../../services/DriveService";
import { bind } from "react-rxjs";
import { language$ } from "../../../../../../services/LanguageService";
import { OperationProgressData } from "../../../../../../models/ui/OperationProgressData";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const [useLanguage] = bind(language$);

const ExpandableProgressIndicator = () => {
  const LANGUAGE = useLanguage();
  const [downloadProgress, setDownloadProgress] =
    useState<Map<number, OperationProgressData>>();
  const [combinedDownloadProgress, setCombinedDownloadProgress] =
    useState<number>(0);
  const [uploadProgress, setUploadProgress] =
    useState<Map<number, OperationProgressData>>();
  const [combinedUploadProgress, setCombinedUploadProgress] =
    useState<number>(0);

  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    useState<null | HTMLElement>(null);

  const [uploadMenuAnchor, setUploadMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  useEffect(() => {
    const subscription = downloadProgress$.subscribe((progressMap) => {
      setDownloadProgress(progressMap);

      let combinedProgress = 0;

      progressMap.forEach((value) => (combinedProgress += value.progress));
      combinedProgress /= progressMap.size;

      setCombinedDownloadProgress(combinedProgress);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = uploadProgress$.subscribe((progressMap) => {
      setUploadProgress(progressMap);

      let combinedProgress = 0;

      progressMap.forEach((value) => (combinedProgress += value.progress));
      combinedProgress /= progressMap.size;

      setCombinedUploadProgress(combinedProgress);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCloseDownloadMenu = () => {
    setDownloadMenuAnchor(null);
  };

  const handleCloseUploadMenu = () => {
    setUploadMenuAnchor(null);
  };

  const handleToggleDownloadMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuAnchor(downloadMenuAnchor ? null : e.currentTarget);
  };

  const handleToggleUploadMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUploadMenuAnchor(uploadMenuAnchor ? null : e.currentTarget);
  };

  return (
    <React.Fragment>
      {downloadProgress && downloadProgress?.size > 0 && (
        <React.Fragment>
          <div className="app__drive__content__header__actions__action">
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                size={35}
                value={combinedDownloadProgress}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={handleToggleDownloadMenu}>
                  <DownloadIcon />
                </IconButton>
              </Box>
            </Box>
          </div>
          <Menu
            open={Boolean(downloadMenuAnchor)}
            onClose={handleCloseDownloadMenu}
            anchorEl={downloadMenuAnchor}
          >
            <div className="app__progress__indicator__title">
              {LANGUAGE.DRIVE.PROGRESS.DOWNLOAD_FILES}
            </div>
            <Divider />
            <List dense>
              {Array.from(downloadProgress!).map(([id, value]) => (
                <div className="app__progress__indicator__item">
                  <div className="app__progress__indicator__item__name">
                    {value.filename}
                  </div>
                  <div className="app__progress__indicator__item__progress">
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        variant="determinate"
                        size={35}
                        value={value.progress}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="text.secondary"
                        >{`${Math.round(value.progress)}%`}</Typography>
                      </Box>
                    </Box>
                  </div>
                </div>
              ))}
            </List>
          </Menu>
        </React.Fragment>
      )}

      {uploadProgress && uploadProgress?.size > 0 && (
        <React.Fragment>
          <div className="app__drive__content__header__actions__action">
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                size={35}
                value={combinedUploadProgress}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={handleToggleUploadMenu}>
                  <FileUploadIcon />
                </IconButton>
              </Box>
            </Box>
          </div>
          <Menu
            open={Boolean(uploadMenuAnchor)}
            onClose={handleCloseUploadMenu}
            anchorEl={uploadMenuAnchor}
          >
            <div className="app__progress__indicator__title">
              {LANGUAGE.DRIVE.PROGRESS.UPLOAD_FILES}
            </div>
            <Divider />
            <List dense>
              {Array.from(uploadProgress!).map(([id, value]) => (
                <div className="app__progress__indicator__item">
                  <div className="app__progress__indicator__item__name">
                    {value.filename}
                  </div>
                  <div className="app__progress__indicator__item__progress">
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        variant="determinate"
                        size={35}
                        value={value.progress}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="text.secondary"
                        >{`${Math.round(value.progress)}%`}</Typography>
                      </Box>
                    </Box>
                  </div>
                </div>
              ))}
            </List>
          </Menu>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ExpandableProgressIndicator;
