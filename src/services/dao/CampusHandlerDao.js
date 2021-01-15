const MongoDB = require('../MongoDB');

module.exports = class CampusHandlerDao {
    constructor() {
        this.mongoDB = new MongoDB('campus')
    }

    find(filter) {
        return this.mongoDB.find(filter);
    }
}
