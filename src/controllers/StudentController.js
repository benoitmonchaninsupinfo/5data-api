const StudentService = require('../services/StudentServices/StudentService');

module.exports = class CampusController {
    constructor() {
        this.studentService = new StudentService();
    }

    findAllStudent(req, res) {
        this.studentService.findStudent().then(response => {
            res.status(200).json({message: 'OK', data: response});
        }).catch(error => {
            console.log('Internal Error', error);
            res.status(500).json({message: 'Internal Error'});
        });
    }

    findBestStudents(req, res) {
        this.studentService.findBestStudents().then(bestStudents => {
            res.status(200).json({message: 'OK', data: bestStudents});
        }).catch(error => {
            console.log('Internal Error', error);
            res.status(500).json({message: 'Internal Error'});
        });
    }

    findStudentsCountByCampus(req, res) {
        this.studentService.findStudentsCountByCampus().then(result => {
            res.status(200).json({message: 'OK', data: result});
        }).catch(error => {
            console.log('Internal Error :', error);
            res.status(500).json({message: 'Internal Error'});
        });
    }
}
