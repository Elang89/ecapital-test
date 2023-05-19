import React from "react";
import Grid from "@mui/material/Grid";
import Table from "../Common/Table";
import { Observer } from "mobx-react";


function EmployeePage() {
    return <Observer>{() => {
        return (
            <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                    <Table></Table>
                </Grid>
            </Grid>
        );
    }}</Observer>
}

export default EmployeePage;