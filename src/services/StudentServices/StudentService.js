const MongoDB = require('../MongoDB');
const CampusService = require('../CampusServices/CampusService');

module.exports = class StudentService {
    constructor() {
        this.mongoDB = new MongoDB('etudiants');
        this.campusService = new CampusService();
    }

    findStudent(filter) {
        return new Promise((resolve, reject) => {
            this.mongoDB.find(filter ? filter : {}).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    findBestStudents() {
        return new Promise((resolve, reject) => {
            try {
                const bestStudents = [];
                this.findStudent().then(students => {
                    students.forEach(student => {
                        let totalCredit = 0;
                        student.cursus.forEach(yearSchool => {
                            totalCredit += yearSchool.credit;
                        });
                        if (totalCredit / student.anneeScolaire >= 60) {
                            bestStudents.push(student);
                        }
                    });

                    this.campusService.findAllCampus().then(campuses => {
                        const result = [];
                        bestStudents.forEach(student => {
                            student.cursus.forEach(cursus => {
                                const campus = campuses.find(campus => campus.id === cursus.campus);
                                if (campus) {
                                    const r = result.find(r => r.campus.city === campus.campus && r.campus.country === campus.Pays);
                                    if (r) {
                                        r.studentCount += 1;
                                    } else {
                                        result.push({
                                            campus: {city: campus.campus, country: campus.Pays},
                                            studentCount: 1
                                        });
                                    }
                                }
                            });
                        });
                        resolve(result);
                    }).catch(e => reject(e));
                }).catch(e => reject(e));
            } catch (e) {
                reject(e);
            }
        });
    }

    findStudentsCountByCampus() {
        return new Promise((resolve, reject) => {
            try {
                this.campusService.findAllCampus().then(campuses => {
                    this.findStudent().then(students => {
                        const result = []
                        campuses.forEach(campus => {
                            const studentArray = students.filter(student => student.cursus[0].campus === campus.id);
                            result.push({campus: {city: campus.campus, country: campus.Pays}, studentCount: studentArray.length})
                        });
                        resolve(result);
                    });
                });
            } catch (e) {
                reject(e);
            }
        })
    }
}
