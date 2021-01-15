const CampusService = require('../services/CampusServices/CampusService');

module.exports = class CampusController {

    constructor() {
        this.campusService = new CampusService();
    }

    findAllCampus(req, res) {
        this.campusService.findAllCampus().then(campuses => {
            res.status(200).json({message: 'OK', data: campuses});
        }).catch(error => {
            console.log('Internal Error :', error);
            res.status(500).json({message: 'Internal Error'});
        });
    }
}
