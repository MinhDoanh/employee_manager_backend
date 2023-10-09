const employeesApiRouter = require('./api/employees.api');

function route(app) {
    app.use('/api/employees', employeesApiRouter)
}

module.exports = route;