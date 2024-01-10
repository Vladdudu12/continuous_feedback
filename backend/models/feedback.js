const FeedbackModel = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    "Feedback",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      descriere: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );
  return Feedback;
};
module.exports = FeedbackModel;
