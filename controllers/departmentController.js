exports.showDeptList = (req,res,next) => {
    res.render('pages/department/list', {navLocation: 'dept'});
}
exports.showAddDeptForm = (req,res,next) => {
    res.render('pages/department/form', {navLocation: 'dept'});
}
exports.showDeptDetails = (req,res,next) => {
    res.render('', {navLocation: 'dept'});
}
exports.showDept = (req,res,next) => {
    res.render('pages/department/form-edit', {navLocation: 'dept'});
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