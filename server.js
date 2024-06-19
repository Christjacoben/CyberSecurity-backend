const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, default: uuidv4 },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to sanitize and validate data
userSchema.pre("save", function (next) {
  // Additional sanitization or checks can be added here
  next();
});

// Create the user model
const User = mongoose.model("User", userSchema);

//schema for phishing level
const answerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    imageName: { type: String, required: true },
    level: { type: Number, required: true },
    answeredAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Answer = mongoose.model("Answer", answerSchema);

//schema for  cloud
const cloudSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    imageName: { type: String, required: true },
    level: { type: Number, required: true },
    answeredAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Cloud = mongoose.model("Cloud", cloudSchema);

//schema for  data
const dataSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    imageName: { type: String, required: true },
    level: { type: Number, required: true },
    answeredAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Data = mongoose.model("Data", dataSchema);

//schema for  network
const networkSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    imageName: { type: String, required: true },
    level: { type: Number, required: true },
    answeredAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Network = mongoose.model("Network", networkSchema);

//schema for  brute
const bruteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    imageName: { type: String, required: true },
    level: { type: Number, required: true },
    answeredAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Brute = mongoose.model("Brute", bruteSchema);

// New endpoint to save the answered image and brute
app.post("/api/brute", async (req, res) => {
  const { userId, imageName, level } = req.body;

  try {
    const newBrute = new Brute({
      userId,
      imageName,
      level,
    });
    await newBrute.save();

    res
      .status(201)
      .json({ message: "Answer saved successfully", brute: newBrute });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New endpoint to get the saved answers in network
app.get("/api/brute", async (req, res) => {
  try {
    const brutes = await Brute.find();
    res.status(200).json({ brutes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New endpoint to save the answered image and network
app.post("/api/network", async (req, res) => {
  const { userId, imageName, level } = req.body;

  try {
    const newNetwork = new Network({
      userId,
      imageName,
      level,
    });
    await newNetwork.save();

    res
      .status(201)
      .json({ message: "Answer saved successfully", network: newNetwork });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New endpoint to get the saved answers in network
app.get("/api/network", async (req, res) => {
  try {
    const networks = await Network.find();
    res.status(200).json({ networks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New endpoint to save the answered image and data
app.post("/api/data", async (req, res) => {
  const { userId, imageName, level } = req.body;

  try {
    const newData = new Data({
      userId,
      imageName,
      level,
    });
    await newData.save();

    res
      .status(201)
      .json({ message: "Answer saved successfully", data: newData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New endpoint to get the saved answers in cloud
app.get("/api/data", async (req, res) => {
  try {
    const datas = await Data.find();
    res.status(200).json({ datas });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New endpoint to save the answered image and cloud
app.post("/api/cloud", async (req, res) => {
  const { userId, imageName, level } = req.body;

  try {
    const newCloud = new Cloud({
      userId,
      imageName,
      level,
    });
    await newCloud.save();

    res
      .status(201)
      .json({ message: "Answer saved successfully", cloud: newCloud });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New endpoint to get the saved answers in cloud
app.get("/api/cloud", async (req, res) => {
  try {
    const clouds = await Cloud.find();
    res.status(200).json({ clouds });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New endpoint to save the answered image and level
app.post("/api/answer", async (req, res) => {
  const { userId, imageName, level } = req.body;

  try {
    const newAnswer = new Answer({
      userId,
      imageName,
      level,
    });
    await newAnswer.save();

    res
      .status(201)
      .json({ message: "Answer saved successfully", answer: newAnswer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New endpoint to get the saved answers
app.get("/api/answers", async (req, res) => {
  try {
    const answers = await Answer.find();
    res.status(200).json({ answers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser.userId, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log("Generated JWT Token:", token);

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Log the generated JWT token
    console.log("Generated JWT Token:", token);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
