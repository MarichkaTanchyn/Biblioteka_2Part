const repository = require('../repository/mysql2/EmployeeRepository');
const emError = require('../model/EmailError');

exports.showEmployeeList = (req,res,next) => {
    repository.getEmployees()
        .then(employees => {
            console.log(employees);
            res.render('pages/employee/list',
                {
                    employees: employees,
                    navLocation: 'emp',
                    pageTitle: 'Pracownicy'
                });
        });
}
exports.showAddEmployeeForm = (req,res,next) => {
    res.render('pages/employee/form',{
        navLocation: 'emp',
        pageTitle: 'Dodaj Pracownika',
        doctor: {},
        btnLable: 'Dodaj Pracownika',
        formAction: '/employees/add',
        errors: null
    });
}
exports.showEmployeeDetails = (req,res,next) => {
    const id = req.params.id;
    repository.getEmployeeById(id)
        .then(employee => {
            res.render('',
                {
                    navLocation: 'emp',
                    pageTitle: 'About Employee',
                    employee: employee
                });
        });
}
exports.showEditEmployee = (req,res,next) => {
    const id = req.params.id;
    repository.getEmployeeById(id)
        .then(employee => {
            res.render('pages/employee/form-edit',
                {
                    navLocation: 'emp',
                    pageTitle: 'Edytuj Pracownika',
                    employee: employee,
                    formAction: '/employees/edit/'
                });
        });
}

exports.addEmployee = async (req, res, next) => {
    const data = req.body;
    await repository.createEmployee(data)
        .then(() => res.redirect('/employees'))
        .catch(err => {
            res.render('pages/employee/form', {
                employee: data,
                pageTitle: 'Dodaj Pracownika',
                formMode: 'createNew',
                btnLable: 'Dodaj Pracownika',
                formAction: '/employees/add',
                navLocation: 'emp',
                errors: err.errors
            })
        });
}

exports.updateEmployee = async (req, res, next) => {
    const data = req.body;
    await repository.updateEmployee(data.id, data)
        .then(() => res.redirect('/employees'))
        .catch(err => {
            res.render('pages/employee/form-edit', {
                doctor: repository.getDoctorById(data.id),
                pageTitle: 'Edytuj Pracownika',
                formMode: 'createNew',
                btnLable: 'Edytuj Pracownika',
                formAction: '/employees/edit',
                navLocation: 'emp',
                errors: err.errors
            })
        });
}

exports.deleteEmployee = async (req, res, next) => {
    const id = req.params.id;
    await repository.deleteEmployee(id)
        .then(() => res.redirect('/employees'))
        .catch(() => res.redirect('/employees'));
}