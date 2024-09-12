const pool =require('../config/db');

const createUser=async (name,email,hashedPassword)=>{
  try {
    const result=await pool.query('INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *',
    [name,email,hashedPassword]);
    return result.rows[0];
  } catch (error) {
    alert("error in creating the user");
    throw new Error(error.message);
  }
};

const findUserByEmail = async (email) => {
  try{
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
  } catch(err){
    console.log("error in finding the user");;
    throw new Error(err.message);
  }
};
 module.exports={createUser,findUserByEmail};
