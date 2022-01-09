const repository = require('../repository/mysql2/DepartmentRepository');
const repositoryEMPL = require("../repository/mysql2/EmploymentRepository");

exports.showDeptList = (req,res,next) => {
    repository.getDepartments()
        .then(deps => {
            res.render('pages/department/list',
                {
                    deps: deps,
                    navLocation: 'dept',
                    pageTitle: req.__('dept.list.pageTitle'),
            });

        })
}
exports.showAddDeptForm = (req,res,next) => {
    res.render('pages/department/form',
        {
            dept: {},
            pageTitle: req.__('dept.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('dept.form.add.bntLabel'),
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
                    pageTitle: req.__('dept.form.add.pageTitle'),
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
                    pageTitle: req.__('dept.form.edit.pageTitle'),
                    btnLabel: req.__('dept.form.edit.bntLabel'),
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
                pageTitle: req.__('dept.form.add.pageTitle'),
                formMode: 'createNew',
                bntLabel: req.__('dept.form.add.bntLabel'),
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
                pageTitle: req.__('dept.form.edit.pageTitle'),
                formMode: 'edit',
                formAction: '/departments/edit',
                bntLabel: req.__('dept.form.edit.bntLabel'),
                validationErrors: err.details
            });
        }

}

exports.deleteDept = async (req, res, next) => {
    await repository.deleteDepartment(req.params.deptId);
    res.redirect('/departments');
}