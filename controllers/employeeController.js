const repository = require('../repository/mysql2/EmployeeRepository');

exports.showEmployeeList = (req, res, next) => {
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
exports.showAddEmployeeForm = (req, res, next) => {
    res.render('pages/employee/form', {
        emp: {},
        navLocation: 'emp',
        pageTitle: 'Nowy Pracownik',
        formMode: 'createNew',
        btnLabel: "Dodaj Pracownika",
        formAction: '/employees/add',
        validationErrors: []

    });
}
exports.showEmployeeDetails = (req, res, next) => {
    const id = req.params.empId;
    repository.getEmployeeById(id)
        .then(emp => {
        res.render('pages/employee/form',
            {
                emp: emp,
                btnLabel: 'Edytuj',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'emp',
                pageTitle: 'Szczegóły Pracownika',
                validationErrors: []
            });
    });
}

exports.showEditEmployee = (req, res, next) => {
    const id = req.params.empId;
    repository.getEmployeeById(id)
        .then(emp => {
            res.redirect('/employees');
        }).catch(err => {
        res.render('pages/employee/form',
            {
                emp: emp,
                navLocation: 'emp',
                pageTitle: 'Edycja Pracownika',
                btnLabel: 'Potwierdzić',
                formMode: 'edit',
                formAction: '/employees/edit',
                validationErrors: []
            });
    });
}

exports.addEmployee = async (req, res, next) => {
    const empData = {...req.body};
    try {
        await repository.createEmployee(empData)
        res.redirect('/employees');
    } catch (err) {
        res.render('pages/employee/form', {
            emp: empData,
            pageTitle: "Dodawanie Pracownika",
            formMode: 'createNew',
            btnLabel: 'Potwierdzić',
            bntLabel: 'Dodaj Pracownika',
            formAction: '/employees/add',
            validationErrors: err.details
        });
    }
}

exports.updateEmployee = async (req, res, next) => {
    const empData = {...req.body};
    const empId = req.body.empId;
    console.log(empData);
    console.log(empId);

    try {
        await repository.updateEmployee(empId, empData);
        res.redirect('/employees');
    } catch (err) {
        res.render('pages/employee/form', {
            emp: empData,
            pageTitle: "Edycja Pracownika",
            formMode: 'edit',
            bntLabel: 'Zatwierdz',
            formAction: '/employees/edit',
            validationErrors: err.details
        });

    }
}

exports.deleteEmployee = async (req, res, next) => {
    await repository.deleteEmployee(req.params.empId);
    res.redirect('/employees');

}