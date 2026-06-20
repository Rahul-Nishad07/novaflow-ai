const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require(
  "../controllers/authController"
);

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

module.exports = router;



// const express = require("express");
// const router = express.Router();

// router.post("/login", (req, res) => {
//   res.json({
//     success: true,
//     message: "Login successful",
//     token: "demo-token",
//     user: {
//       id: 1,
//       name: "Rahul Nishad",
//       email: "rahul@gmail.com",
//     },
//   });
// });

// router.post("/register", (req, res) => {
//   res.json({
//     success: true,
//     message: "Registration successful",
//   });
// });

// module.exports = router;