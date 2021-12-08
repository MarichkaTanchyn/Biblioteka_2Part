const db = require("../../config/mysql2/db");
// const empSchema = require('../../model/joi/Employee');

exports.getEmployees = () => {
    return db.promise().query('SELECT * FROM Employee')
        .then((result, fields) => {
            return result[0];
        }
    ).catch(err => {
        console.log(err);
        throw err;
    })
};


exports.getEmployeeById = (empId) => {
    const query = "SELECT e.Employee_id as id, e.Name as EmpName, e.LastName, e.Email, empl.Employment_id as empl_id, empl.PhoneNumber, empl.DataOd, empl.Dept_id as dept_id, dept.Name as DeptName, dept.NumOfWorkers, dept.DateOfStert FROM Employee e left join Employment empl on empl.Employee_id = e.Employee_id left join Department dept on empl.Dept_id = dept.Dept_id where e.Employee_id = ?";
    return db.promise().query(query, [empId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const emp = {
                empId: parseInt(empId),
                Name: firstRow.EmpName,
                LastName: firstRow.LastName,
                Email: firstRow.Email,
                employees: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.empl_id) {
                    const employment = {
                        id: row.empl_id,
                        PhoneNumber: row.PhoneNumber,
                        DataOd: row.DataOd,
                        department: {
                            _id: row.dept_id,
                            DeptName: row.DeptName,
                            NumOfWorkers: row.NumOfWorkers,
                            DateOfStert: row.DateOfStert
                        }
                    };
                    emp.employees.push(employment);
                }
            }
            return emp;
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createEmployee = (newEmployeeData) => {
    // const vRes = empSchema.validate(newEmployeeData, {abortEarly: false});
    // if (vRes.error){
    //     return Promise.reject(vRes.error);
    // }
    const EmpName = newEmployeeData.Name;
    const LastName = newEmployeeData.LastName;
    const Email = newEmployeeData.Email;
    const sql = "INSERT INTO Employee (Name, LastName, Email) VALUES (?,?,?);"
    return db.promise().execute(sql, [EmpName, LastName, Email]);
};
exports.updateEmployee = (employeeId, employeeDate) => {
    const EmpName = employeeDate.Name;
    const LastName = employeeDate.LastName;
    const Email = employeeDate.Email;
    const sql = "UPDATE Employee SET Name = ?, LastName = ?, Email = ? WHERE Employee_id = ?;"
    return db.promise().execute(sql, [EmpName, LastName, Email, employeeId]);
};
exports.deleteEmployee = async (employeeId) => {
    await db.promise().execute('DELETE From Employment WHERE Employee_id = ?', [employeeId]);
    const sql = "DELETE FROM Employee WHERE Employee_id = ?";
    return db.promise().execute(sql, [employeeId]);
}