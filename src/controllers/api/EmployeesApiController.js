// const db = require('../../../config/sql');

// class EmployeesApiController {
//     // [GET] /get-all
//     async getAll(req, res) {
//         await db.then(pool => pool.request()
//             .query('SELECT * FROM Employees',
//                 (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         return res.status(500).send('Server Error');
//                     }
//                     res.json(result.recordset);
//                 }
//             )
//         );
//     }

//     // [POST] /create
//     async create(req, res) {
//         const { name, age, position } = req.body;
//         await db.then(pool => pool.request()
//             .query(`INSERT INTO Employees (Name, Age, Position) VALUES (N'${name}', ${age}, N'${position}')`,
//                 (err) => {
//                     if (err) {
//                         console.error(err);
//                         return res.status(500).send('Server Error');
//                     }
//                     res.status(201).send('Employee added');
//                 }
//             )
//         );
//     }

//     // [PUT] /update
//     async update(req, res) {
//         const { id } = req.params;
//         const { name, age, position } = req.body;
//         await db.then(pool => pool.request()
//             .query(`UPDATE Employees SET Name = N'${name}', Age = ${age}, Position = N'${position}' WHERE EmployeeID = ${id}`,
//                 (err) => {
//                     if (err) {
//                         console.error(err);
//                         return res.status(500).send('Server Error');
//                     }
//                     res.send('Employee updated');
//                 }
//             )
//         );
//     }

//     // [DELETE] /delete
//     async delete(req, res) {
//         const { id } = req.params;
//         await db.then(pool => pool.request()
//             .query(`DELETE FROM Employees WHERE EmployeeID = ${id}`,
//                 (err) => {
//                     if (err) {
//                         console.error(err);
//                         return res.status(500).send('Server Error');
//                       }
//                       res.send('Employee deleted');
//                 }
//             )
//         );
//     }
// }

// module.exports = new EmployeesApiController;

const sql = require('mssql');
const { Int } = require('mssql');
const db = require('../../../config/sql');


class EmployeesApiController {
    // [GET] /get-all
    async getAll(req, res) {
        try {
            const pool = await db;
            const result = await pool.request().execute('GetEmployees');
            res.json(result.recordset);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }

    // [POST] /create
    async create(req, res) {
        const { name, age, position } = req.body;
        try {
            const pool = await db;
            await pool
                .request()
                .input('Name', sql.NVarChar(255), name)
                .input('Age', sql.Int, parseInt(age))
                .input('Position', sql.NVarChar(255), position)
                .execute('AddEmployee');

            res.status(201).send('Employee added');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }

    // [PUT] /update
    async update(req, res) {
        const { id } = req.params;
        const { name, age, position } = req.body;
        try {
            const pool = await db;
            await pool
                .request()
                .input('EmployeeID', sql.Int, id)
                .input('Name', sql.NVarChar, name)
                .input('Age', sql.Int, parseInt(age))
                .input('Position', sql.NVarChar, position)
                .execute('UpdateEmployee');

            res.send('Employee updated');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }

    // [DELETE] /delete
    async delete(req, res) {
        const { id } = req.params;
        try {
            const pool = await db;
            await pool
                .request()
                .input('EmployeeID', sql.Int, id)
                .execute('DeleteEmployee');

            res.send('Employee deleted');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = new EmployeesApiController;

