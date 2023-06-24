import React, {useEffect} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { language$ } from "../../../../../services/LanguageService";
import { FileData } from "../../../../../models/api/FileData";
import { bind } from "react-rxjs";
import {LoadingButton, TreeItem, TreeView} from "@mui/lab";

interface MoveFileDialogProps {
    open: boolean;
    onClose: (file: FileData | null, newPath: string | null) => void;
    file: FileData | null;
    dirTree: FileData | null;
}

interface RenderTree {
    id: string;
    name: string;
    path: string;
    children?: RenderTree[];
}

const [useLanguage] = bind(language$);

const MoveFileDialog = ({
    open,
    onClose,
    file,
    dirTree,
}: MoveFileDialogProps) => {
    const LANGUAGE = useLanguage();
    const [newPath, setNewPath] = React.useState<string>("");
    const [newPathError, setNewPathError] = React.useState<boolean>(false);

    const handleClose = () => {
        onClose(null, null);
        setNewPath("");
        setNewPathError(false);
    }

    const handleSubmit = () => {
        if (
            newPath.length === 0 ||
            newPath === file?.path ||
            (
                newPath.includes(file?.path!) &&
                file?.is_dir
            )
        ) {
            setNewPathError(true);
            return;
        }
        onClose(file, newPath);
        setNewPath("");
        setNewPathError(false);
    }

    const getTreeData = (dirTree: FileData) => {
        const treeData: RenderTree = {
            id: dirTree.id,
            name: dirTree.filename === "/" ? "Home" : dirTree.filename,
            path: dirTree.path,
            children: [],
        }
        dirTree.children?.forEach((child) => {
            if (child.is_dir) {
                treeData.children?.push(getTreeData(child));
            }
        });
        return treeData;
    }

    const treeData: RenderTree = getTreeData(dirTree!);

    const renderTree = (nodes: RenderTree) => (
        <TreeItem
            key={""+nodes.id}
            id={"tree-node-"+ nodes.id}
            nodeId={""+nodes.id}
            label={nodes.name}
            file-path={nodes.path}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    const onNodeSelect = (event: React.SyntheticEvent, nodeId: string) => {
        setNewPath(document.getElementById("tree-node-" + nodeId)?.getAttribute("file-path")!);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{LANGUAGE.DRIVE.MOVE_FILE_DIALOG.TITLE}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {LANGUAGE.DRIVE.MOVE_FILE_DIALOG.DESCRIPTION}
                    </DialogContentText>
                    <TreeView
                        id = "tree-view"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpanded={[""+treeData.id]}
                        defaultExpandIcon={<ChevronRightIcon />}
                        onNodeSelect={onNodeSelect}
                    >
                        {renderTree(treeData)}
                    </TreeView>
                </DialogContent>
            {newPathError && (
                <DialogContent>
                    <DialogContentText color="error">
                        {LANGUAGE.DRIVE.MOVE_FILE_DIALOG.ERROR}
                    </DialogContentText>
                </DialogContent>
            )}
                <DialogActions>
                    <Button onClick={handleClose} variant="text">
                        {LANGUAGE.DRIVE.MOVE_FILE_DIALOG.CANCEL}
                    </Button>
                    <LoadingButton
                        onClick={handleSubmit}
                        loading={false}
                        variant="contained"
                        color="primary"
                    >
                        {LANGUAGE.DRIVE.MOVE_FILE_DIALOG.MOVE}
                    </LoadingButton>
                </DialogActions>
        </Dialog>
    )
};

export default MoveFileDialog;