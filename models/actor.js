module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Actor', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    bio: DataTypes.STRING,
  });
};
