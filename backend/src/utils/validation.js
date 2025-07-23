const validator = require("validator")

const validationSignUpData = (req)=>{
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid!")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!")
    }
}

const validEditProfileData = async(req)=>{
    const editbleData = ["firstName","lastName","gender","age","skills","about","photoUrl"];
    const isEditable = Object.keys(req.body).every((field)=>editbleData.includes(field));
    // console.log(isEditable)
    return isEditable;
} 
module.exports = {
    validationSignUpData,
    validEditProfileData
}