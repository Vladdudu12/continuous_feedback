const {sequelize} = require("../config/db")
const Sequelize = require("sequelize")


const ActivitateModel = require('./activitate.js');
const FeedbackModel = require('./feedback.js');
const ProfesorModel = require('./profesor.js');
const StudentModel = require('./student.js');

const Activitate = ActivitateModel(sequelize, Sequelize);
const Feedback = FeedbackModel(sequelize, Sequelize);
const Profesor = ProfesorModel(sequelize, Sequelize);
const Student = StudentModel(sequelize, Sequelize);

Profesor.hasMany(Activitate);
Activitate.belongsTo(Profesor);

Activitate.hasMany(Feedback);
Feedback.belongsTo(Activitate);

Student.belongsToMany(Activitate, { through: 'PrezentaActivitate' });
Activitate.belongsToMany(Student, { through: 'PrezentaActivitate' });

module.exports = {
    Activitate,
    Feedback,
    Profesor,
    Student,
    connection: sequelize,
}