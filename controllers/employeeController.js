const repository = require('../repository/mysql2/EmployeeRepository');

exports.showEmployeeList = (req, res, next) => {
    repository.getEmployees()
        .then(emps => {
            res.render('pages/employee/list',
                {
                    emps: emps,
                    navLocation: 'emp',
                    // pageTitle: "Lista pracowników"
                });
        });
}
exports.showAddEmployeeForm = (req, res, next) => {
    res.render('pages/employee/form', {
        emp: {},
        navLocation: 'emp',
        pageTitle:  req.__('emp.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('emp.form.add.bntLabel'),
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
                btnLabel: req.__('emp.form.edit.bntLabel'),
                formMode: 'showDetails',
                formAction: '/employees/edit',
                navLocation: 'emp',
                pageTitle: req.__('emp.form.emp'),
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
                ppageTitle: req.__('emp.form.edit.pageTitle'),
                btnLabel: req.__('emp.form.edit.bntLabel'),
                formMode: 'edit',
                formAction: '/employees/edit',
                validationErrors: []
            });
    });
}

exports.addEmployee = async (req, res, next) => {
    const empData = {...req.body};
    console.log(empData);
    try {
        await repository.createEmployee(empData)
        res.redirect('/employees');
    } catch (err) {
        res.render('pages/employee/form', {
            emp: empData,
            pageTitle: req.__('emp.form.add.pageTitle'),
            formMode: 'createNew',
            bntLabel: req.__('emp.form.add.bntLabel'),
            formAction: '/employees/add',
            validationErrors: err.details
        });
    }
}

exports.updateEmployee = async (req, res, next) => {
    const empData = {...req.body};
    const empId = req.body.empId;
    try {
        await repository.updateEmployee(empId, empData);
        res.redirect('/employees');
    } catch (err) {
        res.render('pages/employee/form', {
            emp: empData,
            pageTitle: req.__('emp.form.emp'),
            formMode: 'edit',
            bntLabel: req.__('emp.form.edit.bntLabel'),
            formAction: '/employees/edit',
            validationErrors: err.details
        });

    }
}

exports.deleteEmployee = async (req, res, next) => {
    await repository.deleteEmployee(req.params.empId);
    res.redirect('/employees');
}