exports.showEmploymentList = (req,res,next) => {
    res.render('pages/employment/listOfEmployed', {navLocation: 'employment'});
}
exports.showAddEmploymentForm = (req,res,next) => {
    res.render('pages/employment/form', {navLocation: 'employment'});
}
exports.showEmploymentDetails = (req,res,next) => {
    res.render('', {navLocation: 'employment'});
}
exports.showEditEmployment = (req,res,next) => {
    res.render('pages/employment/form-edit', {navLocation: 'employment'});
}