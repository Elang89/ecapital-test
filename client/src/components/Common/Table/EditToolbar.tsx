import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer } from "@mui/x-data-grid";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";
import EmployeeService from "../../../services/employeeService";

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
    employeeService: EmployeeService;


}

const EditToolbar: React.FC<EditToolbarProps> = (props: EditToolbarProps) => {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = uuidv4();
        const newRow = { id, firstName: "", lastName: "", salary: 0, isNew: true };

        setRows((oldRows) => [...oldRows, newRow])
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    }

    return (
        <GridToolbarContainer>
            <Typography
                sx={{ flex: "1 1 50%" }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Employees
            </Typography>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add Record
            </Button>
        </GridToolbarContainer>
    )
}

export default EditToolbar;