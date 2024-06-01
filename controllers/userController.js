import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
};
console.log(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoic2Vjb25kIiwiZW1haWwiOiJzZWNvbmRAZ21haWwuY29tIiwiaWQiOiI2NjViMGU0MDEzZTQ4YmFjMGE1MDU0MmEifSwiaWF0IjoxNzE3MjQ5OTM5LCJleHAiOjE3MTcyNTA4Mzl9.VdIV1Gr6b6M18A3atVlXD4R14AMUrPReKAbjd5BYpkw`,
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZmlyc3QiLCJlbWFpbCI6ImZpcnN0QGdtYWlsLmNvbSIsImlkIjoiNjY1YjBkMzcwZmRlMGRjODcxMWZiYjg5In0sImlhdCI6MTcxNzI1MDIxNywiZXhwIjoxNzE3MjUxMTE3fQ.EWEMSuwjqcr3CUe_LxI9kJUuncKAmLTC3ehZ7m27ByY`)
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
};

const currentUser = async (req, res) => {
  res.json(req.user);
};

export { registerUser, loginUser, currentUser };
