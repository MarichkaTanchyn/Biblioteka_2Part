var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const employeeRouter = require('./routes/employeeRoute');
const employmentRouter = require('./routes/employmentRoutes');
const departmentRouter = require('./routes/departmentRoutes');
const empApiRouter = require('./routes/api/EmployeeApiRoute');
const emplApiRouter = require('./routes/api/EmploymentApiRoute');
const deptApiRouter = require('./routes/api/DepartmentApiRoute');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/employees', employeeRouter);
app.use('/departments', departmentRouter);
app.use('/employments', employmentRouter);
app.use('/api/employees', empApiRouter);
app.use('/api/employments', emplApiRouter);
app.use('/api/departments', deptApiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
