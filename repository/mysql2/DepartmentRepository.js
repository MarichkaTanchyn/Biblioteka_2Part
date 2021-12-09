const db = require("../../config/mysql2/db");
const deptSchema = require("../../model/joi/Department");

exports.getDepartments = () => {
    return db.promise().query('SELECT * FROM Department')
        .then((result, fields) => {
                return result[0];
            }
        ).catch(err => {
            console.log(err);
            throw err;
        })
};


exports.getDepartmentsWithEmployees = () => {
    const query = "SELECT dept.Dept_id as dept_id, dept.Name as DeptName, dept.NumOfWorkers, dept.DateOfStert, empl.Employment_id as empl_id, empl.PhoneNumber, empl.DataOd, dept.NumOfWorkers, empl.Employee_id as emp_id, e.Name as EmpName, e.LastName, e.Email FROM Department dept left join Employment empl on empl.Dept_id = dept.Dept_id left join Employee e on empl.Employee_id = e.Employee_id";
    return db.promise().query(query)
        .then((results, fields) => {
            const departments = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const department = {
                    id: row.dept_id,
                    DeptName: row.DeptName,
                    NumOfWorkers: row.NumOfWorkers,
                    DateOfStert: row.DateOfStert,
                    employment: {
                        id: row.empl_id,
                        DataOd: row.DataOd,
                        PhoneNumber: row.PhoneNumber
                    },
                    employee: {
                        emp_id: row.emp_id,
                        EmpName: row.EmpName,
                        LastName: row.LastName,
                        Email: row.Email
                    }
                };
                departments.push(department);
            }
            return departments;
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getDepartmentById = (deptId) => {
    const query = "SELECT dept.Dept_id as dept_id, dept.Name as DeptName, dept.NumOfWorkers, dept.DateOfStert, empl.Employment_id as empl_id, empl.PhoneNumber, empl.DataOd, dept.NumOfWorkers, empl.Employee_id as emp_id, e.Name as EmpName, e.LastName, e.Email FROM Department dept left join Employment empl on empl.Dept_id = dept.Dept_id left join Employee e on empl.Employee_id = e.Employee_id where dept.Dept_id = ?";
    return db.promise().query(query, [deptId])
        .then((results, fields) => {
            const firstrow = results[0][0];
            if (!firstrow) {
                return {};
            }
            const dept = {
                id: parseInt(deptId),
                DeptName: firstrow.DeptName,
                NumOfWorkers: firstrow.NumOfWorkers,
                DateOfStert: firstrow.DateOfStert,
                employments: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.empl_id != null) {
                    const employment = {
                        id: row.empl_id,
                        DataOd: row.DataOd,
                        PhoneNumber: row.PhoneNumber,
                        employee: {
                            emp_id: row.emp_id,
                            EmpName: row.EmpName,
                            LastName: row.LastName,
                            Email: row.Email
                        }
                    };
                    dept.employments.push(employment);
                }
            }
            return dept;
        }).catch(err => {
                console.log(err);
                throw err;
            });
        };

    exports.createDepartment = (newDepartmentData) => {
        const vRes = deptSchema.validate(newDepartmentData, {abortEarly: false});
        if (vRes.error){
            return Promise.reject(vRes.error);
        }
        const deptName = newDepartmentData.name;
        const numOfWorkers = newDepartmentData.amountofEmp;
        const dateOfStert = newDepartmentData.dateOfStart;
        const sql = "INSERT INTO Department (Name, NumOfWorkers, DateOfStert) VALUES (?,?,?);"
        return db.promise().execute(sql, [ deptName, numOfWorkers, dateOfStert]);
    };
    exports.updateDepartment = (deptId, deptData) => {
        const vRes = deptSchema.validate(deptData, {abortEarly: false});
        if (vRes.error){
            return Promise.reject(vRes.error);
        }
        const deptName = deptData.name;
        const numOfWorkers = deptData.amountofEmp;
        const dateOfStert = deptData.dateOfStart;

        const sql = "UPDATE Department SET Name = ?, numOfWorkers = ?, DateOfStert = ? WHERE Dept_id = ?;"
        return db.promise().execute(sql, [deptName, numOfWorkers, dateOfStert, deptId]);
    };
    exports.deleteDepartment = async (deptId) => {
        console.log(deptId);
        await db.promise().execute('DELETE From Employment WHERE Dept_id = ?', [deptId]);
        const sql = "DELETE FROM Department WHERE Dept_id = ?";
        return db.promise().execute(sql, [deptId]);

    }