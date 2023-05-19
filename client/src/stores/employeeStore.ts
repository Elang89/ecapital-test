import { observable, action, computed, makeObservable } from "mobx";

export class EmployeeStore {
    isLoading = false;
    employeeRegistry = observable.map();

    constructor() {
        makeObservable(this, {
            isLoading: observable
        });
    }
}

export default new EmployeeStore();