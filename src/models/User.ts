import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


class User extends Model {
  public id!: number;
  public nom!: string;
  public prenom!: string;
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'INVITE' 
},
isArchived: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
}
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;