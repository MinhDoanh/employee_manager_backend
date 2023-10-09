const sql = require('mssql');

var config = {
    // Server local
    // server: "LAPTOP-3QPR9A3B",
    // server: "DESKTOP-O4PG935\\SQLEXPRESS",
    server: "sql.bsite.net\\MSSQL2016",
    // user: "MinhDoanh2002",
    // password: "123456789",
    // user: "levietanh1202_spms",
    // password: "IoTtainangK18",
    user: "minhdoanh_shushusql",
    password: "IoTtainangK18",
    // database: "Employee_manager_nodejs",
    database: "minhdoanh_shushusql",
    // driver: "msnodesqlv8",
    parseJSON: true,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
        integratedSecurity: true
    }
};

async function connectionPool() {
    try {
        console.time('Time connect db')
        var pool = await sql.connect(config);

        console.timeEnd('Time connect db')
        return pool;
    } catch (err) {
        // ... error checks
        console.log("ERROR NAME IS " + err)
    }
}

module.exports = connectionPool();