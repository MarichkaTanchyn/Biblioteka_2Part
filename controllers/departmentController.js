const repository = require('../repository/mysql2/DepartmentRepository');
const repositoryEMPL = require("../repository/mysql2/EmploymentRepository");

exports.showDeptList = (req,res,next) => {
    repository.getDepartments()
        .then(deps => {
            res.render('pages/department/list',
                {
                    deps: deps,
                    navLocation: 'dept',
                    pageTitle: "Lista Departamentów"
            });

        })
}
exports.showAddDeptForm = (req,res,next) => {
    res.render('pages/department/form',
        {
            dept: {},
            pageTitle: "Nowy Departament",
            formMode: 'createNew',
            btnLabel: "Dodaj Departament",
            formAction: '/departments/add',
            navLocation: 'dept',
            validationErrors: []
        });
}
exports.showDeptDetails = (req,res,next) => {
    const id = req.params.deptId;
    repository.getDepartmentById(id)
        .then(dept => {
            res.render('pages/department/form',
                {
                    dept: dept,
                    formMode: 'showDetails',
                    formAction: '',
                    navLocation: 'dept',
                    pageTitle: 'Szczegóły Departamenta',
                    validationErrors: []
                });
        });
}
exports.showEditDept = (req,res,next) => {
    const id = req.params.deptId;
    repository.getDepartmentById(id)
        .then(dept => {
            res.render('pages/department/form',
                {
                    dept: dept,
                    navLocation: 'dept',
                    pageTitle: 'Edycja Departamenta',
                    btnLabel: 'Edytuj Departamenta',
                    formMode: 'edit',
                    formAction: '/departments/edit',
                    validationErrors: []
                });
        });

}
exports.addDept = async (req, res, next) => {
    const deptData = {...req.body};
    try {
        await repository.createDepartment(deptData);
        res.redirect('/departments');
    } catch(err) {
            res.render('pages/department/form', {
                dept: deptData,
                pageTitle: "Dodawanie Departamenta",
                formMode: 'createNew',
                bntLabel: 'Dodaj Departament',
                formAction: '/departments/add',
                validationErrors: err.details
            });
        }
}

exports.updateDept = async (req, res, next) => {
    const deptData = {...req.body};
    const deptId = req.body.id;

    try{
        await repository.updateDepartment(deptId, deptData);
        res.redirect('/departments');
    } catch(err) {
            res.render('pages/department/form', {
                dept: deptData,
                pageTitle: "Edycja Departaments",
                formMode: 'edit',
                formAction: '/departments/edit',
                bntLabel: 'Edytuj Departament',
                validationErrors: err.details
            });
        }

}

exports.deleteDept = async (req, res, next) => {
    await repository.deleteDepartment(req.params.deptId);
    res.redirect('/departments');
}