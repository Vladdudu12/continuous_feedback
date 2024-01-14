const ActivitateModel = (sequelize, DataTypes) => {
  const Activitate = sequelize.define(
    "Activitate",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      materie: DataTypes.STRING,
      data: DataTypes.DATE,
      durata: DataTypes.INTEGER,
      codAcces: DataTypes.STRING,
      tipActivitate: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );
  return Activitate;
};

module.exports = ActivitateModel;
