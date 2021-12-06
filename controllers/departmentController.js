const repository = require('../repository/mysql2/DepartmentRepository');

exports.showDeptList = (req,res,next) => {
    repository.getDepartmentsWithEmployees()
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
            navLocation: 'dept'
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
                    pageTitle: 'Szczegóły Departamenta'
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
                    formAction: '/departments/edit'
                });
        });

}
//
// exports.addDept = async (req, res, next) => {
//     const data = req.body;
//     await repository.createDoctor(data)
//         .then(() => res.redirect('/doctors'))
//         .catch(err => {
//             res.render('html/Doctor/doctor-add-form', {
//                 doctor: data,
//                 pageTitle: 'Add new doctor',
//                 formMode: 'createNew',
//                 btnLable: 'Add new doctor',
//                 formAction: '/doctors/add',
//                 navLocation: 'doctors',
//                 errors: err.errors
//             })
//         });
// }
// exports.updateDept = async (req, res, next) => {
//     // const data = req.body;
//     // await repository.updateDoctor(data.id, data)
//     //     .then(() => res.redirect('/doctors'))
//     //     .catch(err => {
//     //         res.render('html/Doctor/doctor-edit-form', {
//     //             doctor: repository.getDoctorById(data.id),
//     //             pageTitle: 'Add new doctor',
//     //             formMode: 'createNew',
//     //             btnLable: 'Add new doctor',
//     //             formAction: '/doctors/edit',
//     //             navLocation: 'doctors',
//     //             errors: err.errors
//     //         })
//     //     });
// }
// exports.deleteDept =  async (req, res, next) => {
//     const id = req.params.id;
//     await repository.deleteDoctor(id)
//         .then(() => res.redirect('/departments'))
//         .catch(() => res.redirect('/departments'));
// }