const router = require("express").Router();
const User = require("../models/user.model");
const requireValidation = require("../middleware/validate-session");

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;

router.post("/signup", async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 13),
      role: req.body.role,
    });

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(409).json({
        message: "existing user",
      });
      console.log("existing user: ", req.body.email);
      return;
    }

    const newUser = await user.save();

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1 day" });

    if (newUser) {
      console.log("new user saved");
      console.log("newUser:", newUser, "token:", token);
    }

    res.status(200).json({
      user: newUser,
      message: "Success! User Created!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
});
/*! -----Login Endpoint ----------*/

router.post("/login", async (req, res) => {
  console.log("logging in");
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const user = await User.findOne({ email: email });
    console.log("user:", user);
    if (!user) throw new Error("Email or password does not match.");

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error("Email or password does not match.");

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    return res.status(200).json({
      message: "Login successful!",
      user,
      token,
    });
  } catch (err) {
    console.log("login error");
    serverError(res, err);
  }
});

/* ------------ Log Back In --------- */
router.post("/findOne", requireValidation, async (req, res) => {
  try {
    console.log("finding one...")
    const email = req.body.email;

    const user = await User.findOne({ email: email });

    console.log("user found: ",user)
    user
      ? res.status(200).json({
          message: "Found!",
          user,
        })
      : res.status(404).json({
          message: "User not found.",
        });
  } catch (err) {
    serverError(res, err);
  }
});

/*! ----------------------------- Delete Account Endpoint ------------------------
 */
router.delete("/delete", requireValidation, async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("deleting...");
  try {
    //* Pull the user's info from the req
    const id = req.user._id;

    const userID = { _id: id };
    console.log("_id:", userID);
    const returnOption = { new: true };

    //* Remove user profile
    const deleteUser = await User.deleteOne(userID);

    deleteUser.deletedCount === 1
      ? res.status(200).json({
          message: `User account was successfully deleted!`,
          // message: `User account ${userName} was successfully deleted!`,
        })
      : res.status(404).json({
          message: `User data unable to be deleted.`,
        });
  } catch (err) {
    console.log("oops");
    serverError(res, err);
  }
});

//?----------------------------- Not used yet ----------

/* 
----------------------------- Find User Endpoint ------------------------
*/

router.post("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "user controller here",
    });
  } catch (err) {
    serverError(res, err);
  }
});





router.get("/find", requireValidation, async (req, res) => {
  try {
    const id = req.user._id;

    const findUser = await User.findOne({ _id: id });

    findUser
      ? res.status(200).json({
          message: "Found!",
          findUser,
        })
      : res.status(404).json({
          message: `No Users Found.`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

router.post("/findAdmin", requireValidation, async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await User.findOne({ email: email });

    if (!admin) throw new Error("Administrator Not Found");

    const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: "3 days" });

    return res.status(200).json({
      message: "Login Successful",
      admin,
      token,
    });
  } catch (err) {
    serverError(res, err);
  }
});

/* 
----------------------------- Update Account Endpoint ------------------------
*/

// router.patch("/edit/", async (req, res) => {
router.patch("/edit", requireValidation, async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  try {
    // pull value from parameter (id)
    const id = req.user._id;
    const userFilter = { _id: id };

    // const { id } = req.params;
    const { firstName, lastName, email, password, role, course } = req.body;

    // if (req.body.password) {
    //   password = bcrypt.hashSync(req.body.password, 11);
    const info = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      // height: height,
      role: role,
      course: course,
    };

    // pull info from body

    // const userID = req.user._id;

    const returnOption = { new: true };

    //* findOneAndUpdate(query/filter, document, options)
    const updatedUser = await User.findOneAndUpdate(
      userFilter,
      info,
      returnOption
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: `User profile unable to be edited`,
      });
    }
    updatedUser
      ? res.status(200).json({
          message: `User profile updated!`,
          updatedUser,
        })
      : res.status(404).json({
          message: `User profile unable to be edited`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

module.exports = router;
