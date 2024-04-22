const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserCollection } = require("../database-schema/taskmanagementSchema");
const { checkEmailValidity } = require("../utils/validity");

const SECRET_KEY = process.env.SECRET_KEY;

async function registerUser(userInfo) {
  try {
    if (!userInfo || !userInfo.password || !userInfo.email) {
      return { message: process.env.WRONG_PARAMETERS, status: false };
    }

    let existingUser = await UserCollection.findOne({
      email: userInfo.email,
    });

    if (existingUser) {
      return { message: process.env.REGISTERED_EMAIL, status: false };
    }

    let hash = await bcrypt.hash(userInfo.password, 10);

    let newUser = new UserCollection({
      email: userInfo.email,
      password: hash,
      created_at: new Date(),
    });

    await newUser.save();

    let data = await UserCollection.findOne({ email: userInfo.email });

    let token = await generateToken(data);

    return token;
  } catch (e) {
    console.error("Error registering user:", error);
    return {
      message: process.env.ERROR_MESSAGE,
      status: false,
    };
  }
}

async function generateToken(user) {
  try {
    let token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, {
      expiresIn: "1d",
    });

    return {
      token: token,
      id: user._id,
      status: true,
    };
  } catch (err) {
    console.error("Error generating token:", err);
    return { message: process.env.ERROR_MESSAGE, status: false };
  }
}

async function loginUser(userInfo) {
  try {
    if (!userInfo || !userInfo.email || !userInfo.password) {
      return { message: process.env.WRONG_PARAMETERS, status: false };
    }

    const user = await UserCollection.findOne({ email: userInfo.email });
    if (!user) {
      return {
        message: process.env.WRONG_USER_CREDENTIALS,
        status: false,
      };
    }

    const passwordMatch = await bcrypt.compare(
      userInfo.password,
      user.password
    );
    if (!passwordMatch) {
      return { message: process.env.INCORRECT_CREDENTIALS, status: false };
    }

    const token = await generateToken(user);
    return token;
  } catch (error) {
    console.error("Error logging in user:", error);
    return { message: process.env.ERROR_MESSAGE, status: false };
  }
}

const userLogin = async (req, res) => {
  try {
    let usrInfo = req.body;
    if (usrInfo == undefined || !usrInfo.email || !usrInfo.password) {
      res.statusCode = 400;
      res.send({ message: process.env.UNDEFINED_USERINFO, status: false });
    } else {
      let jwt_token = await loginUser(usrInfo);
      if (jwt_token.token) {
        req.session.user = await jwt_token.token;
        delete jwt_token.token;
      }
      res.status(200).json(jwt_token);
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: process.env.ERROR_MESSAGE, status: false });
  }
};

const userRegister = async (req, res) => {
  try {
    let usrInfo = req.body;
    let isValidEmail = checkEmailValidity(usrInfo.email);
    if (!isValidEmail.status) {
      res.status(400).json({ message: isValidEmail.message, status: false });
    }
    if (usrInfo == undefined || !usrInfo.email || !usrInfo.password) {
      res
        .status(400)
        .json({ message: process.env.WRONG_PARAMETERS, status: false });
    } else {
      let jwt_token = await registerUser(usrInfo);

      if (jwt_token.token) {
        req.session.user = await jwt_token.token;
        delete jwt_token.token;
      }

      res.status(200).json(jwt_token);
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: process.env.ERROR_MESSAGE, status: false });
  }
};

const userLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({
        message: process.env.ERROR_MESSAGE,
        status: false,
      });
    } else {
      res.status(200).json({ status: true });
    }
  });
};

module.exports = {
  userLogin,
  userRegister,
  userLogout,
};
