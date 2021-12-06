const repositoryEMPL = require('../repository/mysql2/EmploymentRepository');
const repositoryEmployee = require('../repository/mysql2/EmployeeRepository');
const repositoryDept = require('../repository/mysql2/DepartmentRepository');

exports.showEmploymentList = (req, res, next) => {
    repositoryEMPL.getEmployments()
        .then(empls => {
            res.render('pages/employment/list', {
                empls: empls,
                navLocation: 'employment',
                pageTitle: "Lista Zatrudnień",
            });
    });
}
exports.showAddEmploymentForm = async (req, res, next) => {
    const employees = await repositoryEmployee.getEmployees();
    const departments = await repositoryDept.getDepartments();
    res.render('pages/employment/form', {
        pageTitle: 'Dodaj Zatrudnienie',
        formMode: 'createNew',
        btnLabel: "Dodaj Zatrudnienie",
        employees: employees,
        departments: departments
    });
}
exports.showEmploymentDetails = async (req, res, next) => {
    const employees = await repositoryEmployee.getEmployees();
    const departments = await repositoryDept.getDepartments();
    const empl_id = req.params.emplId;
    const empById = await repositoryEMPL.getEmploymentById(empl_id);
    const deptWithEmp = await repositoryDept.getDepartmentsWithEmployees();
        res.render('pages/employment/form', {
            formAction: '',
            formMode: "showDetails",
            empl: empById,
            pageTitle: "Szczegóły Zatrudnienia",
            depts: deptWithEmp,
            employees: employees,
            departments: departments
        });

}
exports.showEditEmployment = async (req, res, next) => {
    const employees = await repositoryEmployee.getEmployees();
    const departments = await repositoryDept.getDepartments();
    const empl_id = req.params.emplId;
    const empById = await repositoryEMPL.getEmploymentById(empl_id);
    const deptWithEmp = await repositoryDept.getDepartmentsWithEmployees();

    res.render('pages/employment/form', {
        formAction: '/employment/edit',
        formMode: "edit",
        empl: empById,
        pageTitle: "Edytuj Zatrudnienie",
        depts: deptWithEmp,
        employees: employees,
        departments: departments
    });
}