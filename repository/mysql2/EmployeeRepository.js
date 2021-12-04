const db = require("../../config/mysql2/db");

exports.getEmployee = () => {
    return db
        .promise()
        .query("SELECT * FROM Employee")
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

exports.getEmployeeById = (empId) => {
    const query = "SELECT e.Employee_id as id, e.Name, e.LastName, e.Email, empl.Employment_id as empl_id,"
        + "empl.PhoneNumber, empl.DataOd, empl.Dept_id as dept_id, dept.Name, dept.NumOfWorkers, dept.DateOfStert"
        + "FROM Employee e"
        + "left join Employment empl on empl.Employee_id = e.Employee_id"
        + "left join Department dept on empl.Dept_id = dept.Dept_id"
        + "where e.Employee_id = ?";
    return db.promise().query(query, [empId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const emp = {
                id: parseInt(empId),
                Name: firstRow.Name,
                LastName: firstRow.LastName,
                Email: firstRow.Email,
                employments: []
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
                            Name: row.name,
                            NumOfWorkers: row.NumOfWorkers,
                            DateOfStert: row.DateOfStert
                        }
                    };
                    emp.employments.push(employment);
                }
            }
            return emp;
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createEmployee = (newEmployeeData) => {
    const id = newEmployeeData.id;
    const name = newEmployeeData.Name;
    const lastName = newEmployeeData.LastName;
    const email = newEmployeeData.Email;
    const sql = "INSERT INTO Employee (Employee_id ,Name, LastName, Email) VALUES (?,?,?,?);"
    return db.promise().execute(sql, [id, name, lastName, email]);
};
exports.updateEmployee = (employeeId, employeeDate) => {
    const name = employeeDate.Name;
    const lastName = employeeDate.LastName;
    const email = employeeDate.Email;
    const sql = "UPDATE Employee SET Name = ?, LastName = ?, Email = ?, WHERE Employee_id = ?;"
    return db.promise().execute(sql, [name, lastName, email, employeeId]);
};
exports.deleteEmployee = (employeeId) => {
    const sql = "DELETE FROM Employee WHERE Employee_id = ?";
    return db.promise().execute(sql, [employeeId]);
}