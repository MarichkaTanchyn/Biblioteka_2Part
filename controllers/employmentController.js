const repositoryEMPL = require('../repository/mysql2/EmploymentRepository');
const repositoryEmployee = require('../repository/mysql2/EmployeeRepository');
const repositoryDept = require('../repository/mysql2/DepartmentRepository');
const repository = require("../repository/mysql2/DepartmentRepository");

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
    const empById = await repositoryEMPL.getEmploymentById(req.params.emplId);
    res.render('pages/employment/form', {
        pageTitle: 'Dodaj Zatrudnienie',
        formMode: 'createNew',
        formAction: '/employments/add' ,
        btnLabel: "Dodaj Zatrudnienie",
        employees: employees,
        departments: departments,
        empl: empById
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
        formAction: '/employments/edit',
        formMode: "edit",
        empl: empById,
        pageTitle: "Edytuj Zatrudnienie",
        depts: deptWithEmp,
        employees: employees,
        departments: departments
    });
}

exports.addEmployment = async (req, res, next) => {
    const employees = await repositoryEmployee.getEmployees();
    const departments = await repositoryDept.getDepartments();
    const emplData = {...req.body};
    try{
        await repositoryEMPL.createEmployment(emplData);
        res.redirect('/employments');
    }catch(err) {
            res.render('pages/employment/form', {
                empl: emplData,
                pageTitle: "Dodawanie Zatrudnienia",
                formMode: 'createNew',
                bntLabel: 'Dodaj Zatrudnienie',
                formAction: '/employments/add',
                validationErrors: err.details,
                employees: employees,
                departments: departments
            });
        }
}

exports.updateEmployment = async (req, res, next) => {
    const empData = {...req.body};
    const emplId = req.body.empl_id;
    try{
        await repositoryEMPL.updateEmployment(emplId, empData);
        console.log(empData);
        res.redirect('/employments');
    } catch(err) {
            res.render('pages/employment/form', {
                empl: empData,
                pageTitle: "Edycja Pracownika",
                formMode: 'edit',
                formAction: '/employments/edit',
                bntLabel: 'Zatwierdz',
                validationErrors: err.details,
                employees: employees,
                departments: departments
            });
        }
}

exports.deleteEmployment = async (req, res, next) => {
    await repositoryEMPL.deleteEmployment(req.params.emplId);
    res.redirect('/employments');
}