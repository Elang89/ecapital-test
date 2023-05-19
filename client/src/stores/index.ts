import employeeStore, { EmployeeStore } from "./employeeStore";

export type RootStore = {
    employeeStore: EmployeeStore;
}

const rootStore: RootStore = {
    employeeStore,
};

export default rootStore;