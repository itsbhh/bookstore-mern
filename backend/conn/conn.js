const mongoose=require("mongoose");

const conn=async ()=>{
try {
    await mongoose.connect("");
    
} catch (error) {
    console.log(error);
}
};
conn();
