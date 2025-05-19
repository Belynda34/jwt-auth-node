const express = require("express");
const dotenv = require("dotenv");
const Userroutes = require("./src/routes/UserRoutes.js");
const EmployeeRoutes = require("./src/routes/EmployeeRoutes.js")

const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 4001;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/auth", Userroutes);
app.use("/api/employee",EmployeeRoutes)




app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})

