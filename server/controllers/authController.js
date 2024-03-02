const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const z = require("zod");

// const loginSchema = z.object({
//   email: z.string().email("Email is required"),
//   password: z.string().min(6, "Password must be atleast 6 characters long."),
//   // password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
//   //   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
//   //     {message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',}
//   //   ),
// });

// const signupSchema = z.object({
//   name: z.string().min(3, "Name must be atleast 3 characters long."),
//   email: z.string().email("Email is required"),
//   password: z.string().min(6, "Password must be atleast 6 characters long."),
//   // password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
//   //   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
//   //     {message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',}
//   //   ),
// });

async function signup(req, res) {
  const { user } = req.body

  console.log(user)
  const existing = await User.findOne({ email: user.email }).exec()
  if (existing) return res.json({ errors: [{path: "email", message: "Email already in use"}]})

  try {
    const newUser = new User(user);
    await newUser.save()
    return jwt.sign(
      {_id: newUser._id},
      process.env.JWT_SECRET,
      (error, token) => {
        if (error) return res.json({ errors: [{path: "custom", message: "Can not sign up"}]})
        else res.json({token, user: newUser})
      }
    )
  } 
  catch (error) {
    return res.json({error})
  }

}

async function login(req, res) {
  const { user } = req.body
  
  const existing = await User.findOne({ email: user.email }).exec()
  if (!existing) 
    return res.json({ errors: [{path: "email", message: "No User with given Email"}]})

  if (!checkPassword(existing.password, user.password))
    return res.json({ errors: [{path: "password", message: "Incorrect Password"}]})

  return jwt.sign(
    {_id: existing._id},
    process.env.JWT_SECRET,
    (error, token) => {
      if (error) return res.json({ errors: [{path: "custom", message: "Can not Login"}]})
      else res.json({token, user: existing})
    }
  )
}

const checkPassword = (dbPassword, givenPassword) => {
  return (dbPassword === givenPassword)
} 

async function editUser(req, res) {
  const { user } = req.body

  const newUser = await User.findByIdAndUpdate(user._id, user, {new: true}).exec()

  res.json({user: newUser})
}

module.exports = { login, signup, editUser };
