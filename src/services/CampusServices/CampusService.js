const MongoDB = require('../MongoDB');

module.exports = class CampusService {
    constructor() {
        this.mongoDB = new MongoDB('campus');
    }

    findAllCampus() {
        return new Promise((resolve, reject) => {
            this.mongoDB.find({}).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
}
