const repository = require('../repository/mysql2/EmployeeRepository');

exports.showEmployeeList = (req,res,next) => {
    repository.getEmployees()
        .then(emps => {
            res.render('pages/employee/list',
                {
                    emps: emps,
                    navLocation: 'emp',
                    pageTitle: "Lista pracowników"
                });
        });
}
exports.showAddEmployeeForm = (req,res,next) => {
    res.render('pages/employee/form',{
        emp: {},
        navLocation: 'emp',
        pageTitle: 'Nowy Pracownik',
        formMode: 'createNew',
        btnLabel: "Dodaj Pracownika",
        formAction: '/employees/add',
    });
}
exports.showEmployeeDetails = (req,res,next) => {
    const id = req.params.empId;
    repository.getEmployeeById(id)
        .then(emp => {
            res.render('pages/employee/form',
                {
                    emp: emp,
                    formMode: 'showDetails',
                    formAction: '',
                    navLocation: 'emp',
                    pageTitle: 'Szczegóły Pracownika'
                });
        });
}
exports.showEditEmployee = (req,res,next) => {
    const id = req.params.empId;
    repository.getEmployeeById(id)
        .then(emp => {
            res.render('pages/employee/form',
                {
                    emp: emp,
                    navLocation: 'emp',
                    pageTitle: 'Edycja Pracownika',
                    btnLabel: 'Edytuj Pracownika',
                    formMode: 'edit',
                    formAction: '/employees/edit'
                });
        });
}

exports.addEmployee = async (req, res, next) => {
    // const data = req.body;
    // await repository.createEmployee(data)
    //     .then(() => res.redirect('/employees'))
    //     .catch(err => {
            res.render('pages/employee/form', {
                // employee: data,
                // pageTitle: 'Dodaj Pracownika',
                // formMode: 'createNew',
                // btnLable: 'Dodaj Pracownika',
                // formAction: '/employees/add',
                navLocation: 'emp',
                // errors: err.errors
            })
        // });
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