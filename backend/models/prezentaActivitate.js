const StudentDB = require(".").StudentDB;
const ActivitateDB = require(".").ActivitateDB;

const PrezentaActivitateModel = (sequelize, DataTypes) => {
  const PrezentaActivitate = sequelize.define(
    "PrezentaActivitate",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      StudentId: {
        type: DataTypes.UUID,
        references: {
          model: StudentDB, // 'Movies' would also work
          key: "id",
        },
      },
      ActivitateId: {
        type: DataTypes.UUID,
        references: {
          model: ActivitateDB, // 'Actors' would also work
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  return PrezentaActivitate;
};

module.exports = PrezentaActivitateModel;
