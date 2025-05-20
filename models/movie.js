module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Movie', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    year_of_release: { type: DataTypes.INTEGER, allowNull: false },
    producer_id: { type: DataTypes.INTEGER, allowNull: false }
  });
};
