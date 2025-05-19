const  EmployeeSchema  = require("../schemas/EmployeeSchema.js");
const prisma = require("../config/db.js")



const createEmployee = async (req,res) => {
    try {
       const {error} = await EmployeeSchema.validateAsync(req.body);

       if(error) { 
        const errors = error.details.map((err) => err.message);
        return res.status(422).json({errors})
       }

       const {email} =req.body;

       
       const existingEmployee = await  prisma.employees.findUnique({where:{ email}})

       if(existingEmployee){
        return res.status(409).json({message:"User Already exists"})
       }

       const employee = await prisma.employees.create({data:req.body});

       res.status(201).json({message:"Employee laptop created successfully",data:employee})
    }catch(error){
        console.error("Error in creating employee laptop:",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const getEmployees = async(req,res) => {
    try {
        const data = await prisma.employees.findMany({})
        res.status(200).json({employees: data })
    } catch (error) {
        console.error("Error in fetching employee laptops:",error);
        res.status(500).json({message:"Internal Server Error"})
    }
    
}


const getEmployeeDetails = async (req,res) =>{
    try {
    const { id } = req.params;
    const employee = await prisma.employees.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ employee });
  } catch (error) {
    console.error("Error fetching employee details:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {createEmployee,getEmployees}