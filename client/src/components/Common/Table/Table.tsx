import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowId, GridRowModesModel, GridRowsProp } from "@mui/x-data-grid";
import moment from "moment";
import EditToolbar from "./EditToolbar";
import React from "react";
import Employee from "../../../models/employee";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EmployeeService from "../../../services/employeeService";


interface ITableProps {
    employees: Array<Employee>;
    // employeeService: EmployeeService;
}


const EnhancedTable: React.FC<ITableProps> = (props: ITableProps) => {
    const rows = props.employees.map((e: Employee) => e.converToObj());

    const handleRowEditStart = () => { };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = () => { };

    const handleEditClick = (id: GridRowId) => () => { };

    const handleSaveClick = (id: GridRowId) => () => { };

    const handleDeleteClick = (id: GridRowId) => () => { };

    const handleCancelClick = (id: GridRowId) => () => { }


    const columns: GridColDef[] = [
        { field: "firstName", headerName: "First Name", type: "string", width: 180, editable: true },
        { field: "lastName", headerName: "Last Name", type: "string", width: 180, editable: true },
        { field: "salary", headerName: "Salary", type: "number", editable: true },
        {
            field: "createdAt",
            headerName: "Date Created",
            type: "dateTime",
            width: 180,
            editable: true,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                    />,
                ];
            }
        }

    ];


    return (
        <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
        />
    );
}



export default EnhancedTable;