const StudentModel = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nume: DataTypes.STRING,
      legitimatie: DataTypes.STRING,
      email: DataTypes.STRING,
      parola: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );
  return Student;
};
module.exports = StudentModel;
