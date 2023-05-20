import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    GridRowsProp,
    MuiEvent
} from "@mui/x-data-grid";
import EditToolbar from "./EditToolbar";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Employee from "../../../models/employee";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EmployeeService from "../../../services/employeeService";


interface ITableProps {
    employeeService: EmployeeService;
}


const EnhancedTable: React.FC<ITableProps> = ({ employeeService }) => {
    const initRows: GridRowsProp = [];

    const [rows, setRows] = useState(initRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const apiCall = async () => {
            const response = await employeeService.getEmployees();
            setEmployees(response.employees);
            const initialRows: GridRowsProp = response.employees.map((e: Employee) => e.converToObj());
            setRows(initialRows);
        }

        apiCall();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const handleRowEditStart = (
        _: GridRowParams,
        event: MuiEvent<SyntheticEvent>,
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (_, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
        setEmployees(employees.filter((e) => e.id !== id));

        employeeService.deleteEmployee(String(id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        let isUpdate = false;
        const updatedRow = { ...newRow, isNew: false };
        const newEmployee = new Employee({
            _id: newRow.id,
            _firstName: newRow.firstName,
            _lastName: newRow.lastName,
            _salary: newRow.salary,
            _createdAt: newRow.createdAt,
            _updatedAt: newRow.updatedAt
        });

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        setEmployees(employees.map(e => {
            if (e.id === newRow.id) {
                isUpdate = true;
            }
            return newEmployee;
        }));

        if (isUpdate) {
            employeeService.updateEmployee(newEmployee.id, newEmployee);
        } else {
            employeeService.createEmployee(newEmployee);
            employees.push(newEmployee);
        }

        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    const columns: GridColDef[] = [
        { field: "firstName", headerName: "First Name", type: "string", width: 180, editable: true },
        { field: "lastName", headerName: "Last Name", type: "string", width: 180, editable: true },
        { field: "salary", headerName: "Salary", type: "number", width: 180, editable: true },
        {
            field: "createdAt",
            headerName: "Date Created",
            type: "dateTime",
            width: 180,
            editable: true,
        },
        {
            field: "updatedAt",
            headerName: "Date Updated",
            type: "dateTime",
            width: 180,
            editable: true
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
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
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
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
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
                toolbar: EditToolbar,
            }}
            slotProps={{
                toolbar: { setRows, setRowModesModel }
            }}
        />
    );
}



export default EnhancedTable;