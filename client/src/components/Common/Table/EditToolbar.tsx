import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridRowModesModel, GridRowsProp, GridToolbarContainer } from "@mui/x-data-grid";
import React from "react";

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

const EditToolbar: React.FC<EditToolbarProps> = (props: EditToolbarProps) => {
    const { setRows, setRowModesModel } = props;


    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />}>
                Add Record
            </Button>
        </GridToolbarContainer>
    )
}

export default EditToolbar;