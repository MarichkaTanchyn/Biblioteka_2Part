const db = require("../../config/mysql2/db");


exports.getEmployment = () => {
    const query = "SELECT empl.Employment_id as empl_id, empl.DataOd, empl.PhoneNumber, dept.Name, dept.NumOfWorkers, dept.DateOfStert, empl.Dept_id as dept_id,\n" +
        "empl.Employee_id as emp_id,e.Name, e.LastName, e.Email\n" +
        "FROM Employment empl\n" +
        "left join Department dept on dept.Dept_id = empl.Dept_id\n" +
        "left join Employee e on e.Employee_id = empl.Employee_id";
    return db.promise().query(query)
        .then((results, fields) => {
            const employments = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const employment = {
                    id: row.empl_id,
                    DataOd: row.DataOd,
                    PhoneNumber: row.PhoneNumber,
                    department: {
                        id: row.dept_id,
                        Name: row.Name,
                        NumOfWorkers: row.NumOfWorkers,
                        DateOfStert: row.DateOfStert
                    },
                    employee: {
                        Name: row.Name,
                        LastName: row.LastName,
                        Email: row.Email
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
    const query = "SELECT empl.Employment_id as empl_id, empl.DataOd, empl.PhoneNumber, dept.Name, dept.NumOfWorkers, dept.DateOfStert, empl.Dept_id as dept_id,\n" +
        "empl.Employee_id as emp_id,e.Name, e.LastName, e.Email\n" +
        "FROM Employment empl\n" +
        "left join Department dept on dept.Dept_id = empl.Dept_id\n" +
        "left join Employee e on e.Employee_id = empl.Employee_id\n" +
        "where empl.Employment_id = ?";
    return db.promise().query(query, [employmentId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
                const employment = {
                    id: employmentId,
                    DataOd: row.DataOd,
                    PhoneNumber: row.PhoneNumber,
                    department: {
                        id: row.dept_id,
                        Name: row.Name,
                        NumOfWorkers: row.NumOfWorkers,
                        DateOfStert: row.DateOfStert
                    },
                    employee: {
                        Name: row.Name,
                        LastName: row.LastName,
                        Email: row.Email
                    }
                };
                console.log(employment);

            return employment;
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createEmployment = (newEmploymentData) => {
    const id = newEmploymentData.id;
    const emp_id = newEmploymentData.emp_id;
    const dept_id = newEmploymentData.dept_id;
    const dataOd = newEmploymentData.DataOd;
    const phoneNumber = newEmploymentData.PhoneNumber;
    const sql = "INSERT INTO Employment (Employee_id,Employment_id, Dept_id ,DataOd, PhoneNumber) VALUES (?,?,?,?,?);"
    return db.promise().execute(sql, [emp_id, id, dept_id, dataOd, phoneNumber]);
};
exports.updateEmployment = (emplId, emplDate) => {
    const dataOd = emplDate.DataOd;
    const phoneNumber = emplDate.PhoneNumber;
    const sql = "UPDATE Employment SET DataOd = ?, PhoneNumber = ?, WHERE Employment_id = ?;"
    return db.promise().execute(sql, [dataOd, phoneNumber, emplId]);
};
exports.deleteEmployment = (emplId) => {
    const sql = "DELETE FROM Employment WHERE Employment_id = ?";
    return db.promise().execute(sql, [emplId]);
}