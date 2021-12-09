const db = require("../../config/mysql2/db");
// const emplSchema = require("../../model/joi/Employment");


exports.getEmployments = () => {
    const query = "SELECT empl.Employment_id as empl_id, empl.DataOd, empl.PhoneNumber, dept.Name as DeptName, dept.NumOfWorkers, dept.DateOfStert, empl.Dept_id as dept_id, empl.Employee_id as emp_id,e.Name as EmpName, e.LastName, e.Email FROM Employment empl left join Department dept on dept.Dept_id = empl.Dept_id left join Employee e on e.Employee_id = empl.Employee_id";
    return db.promise().query(query)
        .then((results, fields) => {
            const employments = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const employment = {
                    id: row.empl_id,
                    DataOd: row.DataOd,
                    PhoneNumber: row.PhoneNumber,
                    employee: {
                        emp_id: row.emp_id,
                        EmpName: row.EmpName,
                        LastName: row.LastName,
                        Email: row.Email
                    },
                    department: {
                        id: row.dept_id,
                        DeptName: row.DeptName,
                        NumOfWorkers: row.NumOfWorkers,
                        DateOfStart: row.DateOfStert
                    }
                };

                employments.push(employment);
            }
            return employments;
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getEmploymentById = (employmentId) => {
    const query = "SELECT empl.Employment_id as empl_id, empl.DataOd, empl.PhoneNumber, dept.Name as DeptName, dept.NumOfWorkers, dept.DateOfStert, empl.Dept_id as dept_id,empl.Employee_id as emp_id,e.Name as EmpName, e.LastName, e.Email FROM Employment empl left join Department dept on dept.Dept_id = empl.Dept_id left join Employee e on e.Employee_id = empl.Employee_id where empl.Employment_id = ?";
    return db.promise().query(query, [employmentId])
        .then((results, fields) => {
                const row = results[0][0];
                if (!row) {
                    return {};
                }
                const empl = {
                    id: parseInt(employmentId),
                    DataOd: row.DataOd,
                    PhoneNumber: row.PhoneNumber,
                    employee: {
                        emp_id: row.emp_id,
                        EmpName: row.EmpName,
                        LastName: row.LastName,
                        Email: row.Email
                    },
                    department: {
                        id: row.dept_id,
                        DeptName: row.DeptName,
                        NumOfWorkers: row.NumOfWorkers,
                        DateOfStart: row.DateOfStert
                    }
                }

                return empl;
            }
        ).catch(err => {
            console.log(err);
            throw err;
        });
}
;

exports.createEmployment = async (newEmploymentData) => {
    // const vRes = emplSchema.validate(newEmploymentData, {abortEarly: false});
    // if (vRes.error) {
    //     console.log(newEmploymentData.telNum);
    //     return Promise.reject(vRes.error);
    // }
    const emp_Id = newEmploymentData.emp_Id;
    const dept_Id = newEmploymentData.deptId;
    const dataOd = newEmploymentData.DataOd;
    const phoneNumber = newEmploymentData.telNum;
    const count = await db.promise().query('SELECT COUNT(*) as count FROM Employment WHERE Employee_id = ? And Dept_id = ?;', [emp_Id,dept_Id]);
    console.log(count);
    if (count[0][0]['count'] > 0) {
        throw Error();
    }
    const sql = "INSERT INTO Employment (Employee_id, Dept_id ,DataOd, PhoneNumber) VALUES (?,?,?,?);"
    return db.promise().execute(sql, [emp_Id, dept_Id, dataOd, phoneNumber]);
};

exports.updateEmployment = (emplId, emplDate) => {
    // const vRes = emplSchema.validate(emplDate, {abortEarly: false});
    // if (vRes.error) {
    //     return Promise.reject(vRes.error);
    // }
    console.log(emplDate);
    console.log(emplId);
    const emp_Id = emplDate.emp_Id;
    const dept_Id = emplDate.deptId;
    const dataOd = emplDate.DataOd;
    const phoneNumber = emplDate.telNum;
    const sql = "UPDATE Employment SET Employee_id = ?, Dept_id = ?, DataOd = ?, PhoneNumber = ? WHERE Employment_id = ?;"
    return db.promise().execute(sql, [emp_Id, dept_Id, dataOd, phoneNumber, emplId]);
};
exports.deleteEmployment = (emplId) => {
    const sql = "DELETE FROM Employment WHERE Employment_id = ?";
    return db.promise().execute(sql, [emplId]);
}