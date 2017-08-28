module.exports = function(sequelize, DataTypes) {
  var todolist = sequelize.define('todolist', {
    name: DataTypes.STRING,
    isCompleted: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return todolist;
};