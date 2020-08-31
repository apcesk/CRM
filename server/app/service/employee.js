const EMP = require('../model/employee');

const EmployeeService = {
    getEmployeeList: async (obj) => {
        const data = await EMP.getEmployeeList(obj);
        return data;
    },
    changeRelationship: async ({cid, eid}) => {
        const data = await EMP.changeRelationship({cid, eid});
        return data;
    },
    addEmployee: async (obj) => {
        const data = await EMP.addEmployee(obj);
        return data;
    },
    getEmployeeById: async (eid) => {
        const data = await EMP.getEmployeeById(eid);
        return data;
    },
    existsEmployee: async (ename) => {
        const data = await EMP.existsEmployee(ename);
        return data;
    },
    deleteEmployeeById: async (id) => {
        const data = await EMP.deleteEmployeeById(id);
        return data;
    },
    getCustomersByEmployeeName: async(obj) => {
        const data = await EMP.getCustomersByEmployeeName(obj);
        return data;
    }
}

module.exports = EmployeeService;