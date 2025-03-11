import { Sequelize,DataTypes } from "sequelize";

const sequelize = new Sequelize("auth", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role : {
      type:DataTypes.STRING,
      allowNull:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
  },
  {
    timestamps: true,
    indexes:[
      {
        name:"user_name",
        fields:["username"]
      },
      {
        name:"user_email",
        fields:["email"]
      },
      {
        name:"user_password",
        fields:["password"]
      }
    ]
  }
);


const connectDB = async () =>{
    try {
        await sequelize.authenticate();
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Database connection failed:",error)
        process.exit(1)
    }
}


export { User,sequelize,connectDB }