const ProfesorModel = (sequelize, DataTypes) => {
  const Profesor = sequelize.define(
    "Profesor",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nume: DataTypes.STRING,
      materie: DataTypes.STRING,
      email: DataTypes.STRING,
      parola: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );
  return Profesor;
};
module.exports = ProfesorModel;
