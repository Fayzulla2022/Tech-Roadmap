const router = require("express").Router();
const userValidations = require("../validations/user");
const getErrorDetails = require("../utils/error-details");
const auth = require("../middlewares/auth");
const userManager = require("../managers/user");
const crypto = require("../utils/crypto");
const utils = require("../utils/utils");
const tokens = require("../utils/tokens");
const emailManager = require("../managers/email");

router.post("/signup", async (req, res) => {
  try {
    const error = userValidations.signup(req.body).error;
    if (error) return res.status(400).send(getErrorDetails(error));

    let user = await userManager.getByEmail(req.body.email);
    if (user)
      return res
        .status(400)
        .send(`Email already exists please choose another email address.`);

    const obj = {
      ...req.body,
      password: await crypto.hash(req.body.password),
    };

    user = await userManager.create(obj);

    const link = `${process.env.ACTIVATE_ACCOUNT_URL}?token=${user._id}`;
    let html = await utils.readTemplate(`activate`);
    html = utils.replaceAll(`{{appName}}`, process.env.APP_NAME, html);
    html = utils.replaceAll(`{{link}}`, link, html);
    await emailManager.send({
      to: req.body.email,
      subject: "Verify your email address",
      html: html,
    });

    return res.status(200).send(true);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/activate", async (req, res) => {
  try {
    const error = userValidations.activate(req.body).error;
    if (error) return res.status(400).send(getErrorDetails(error));

    let user = await userManager.getById(req.body.token);
    if (!user)
      return res.status(400).send(`Invalid account activation token provided.`);

    user = await userManager.updateActiveStatus(req.body.token, true);

    let html = await utils.readTemplate(`welcome`);
    html = utils.replaceAll(`{{name}}`, user.name, html);
    html = utils.replaceAll(`{{appName}}`, process.env.APP_NAME, html);
    emailManager.send({
      to: user.email,
      subject: `Welcome to ${process.env.APP_NAME}`,
      html: html,
    });

    return res.status(200).json(true);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const error = userValidations.login(req.body).error;
    if (error) return res.status(400).send(getErrorDetails(error));

    const user = await userManager.getByEmail(req.body.email);
    if (!user)
      return res.status(400).send(`User does not exists with this email.`);

    const passwordMatches = await crypto.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatches)
      return res.status(400).send(`Password did not match.`);

    if (user.active === false)
      return res
        .status(400)
        .send(`User is not active. Please activate via signup email.`);

    const token = await tokens.getJwt(user._id);
    const result = {
      token: token,
      user: user,
    };
    return res.status(200).send(result);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const error = userValidations.forgotPassword(req.body).error;
    if (error) return res.status(400).send(getErrorDetails(error));

    const user = await userManager.getByEmail(req.body.email);
    if (!user)
      return res.status(400).send(`User does not exists with this email.`);

    const temp = await userManager.setTempPassword(req.body.email);
    const link = `${process.env.RESET_PASSWORD_URL}?token=${temp}`;
    let html = await utils.readTemplate(`forgot-password`);
    html = utils.replaceAll(`{{appName}}`, process.env.APP_NAME, html);
    html = utils.replaceAll(`{{link}}`, link, html);
    await emailManager.send({
      to: req.body.email,
      subject: "Reset your password",
      html: html,
    });

    return res.status(200).send(true);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const error = userValidations.resetPassword(req.body).error;
    if (error) return res.status(400).send(getErrorDetails(error));

    let user = await userManager.getByTempPassword(req.body.token);
    if (!user)
      return res.status(400).send(`Invalid password reset token provided.`);

    const obj = { password: await crypto.hash(req.body.newPassword) };

    user = await userManager.updatePassword(user._id, obj);

    let html = await utils.readTemplate(`reset-password`);
    html = utils.replaceAll(`{{name}}`, user.name, html);
    html = utils.replaceAll(`{{appName}}`, process.env.APP_NAME, html);
    emailManager.send({
      to: user.email,
      subject: "Password reset",
      html: html,
    });

    return res.status(200).send(true);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/update-password", auth, async (req, res) => {
  try {
    const error = userValidations.updatePassword(req.body).error;
    if (error) return res.status(400).send(getErrorDetails(error));

    let user = await userManager.getById(req.tokenData.userId);
    const passwordMatches = await crypto.compare(
      req.body.currentPassword,
      user.password
    );
    if (!passwordMatches)
      return res.status(400).send(`Wrong current password.`);

    const encryptedPassword = await crypto.hash(req.body.newPassword);
    user = await userManager.updatePassword(req.tokenData.userId, {
      password: encryptedPassword,
    });
    return res.status(200).send(true);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/update", auth, async (req, res) => {
  try {
    let user = await userManager.updateName(
      req.tokenData.userId,
      req.body.name
    );
    user = await userManager.updateLevel(req.tokenData.userId, req.body.level);
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/add-favourite", auth, async (req, res) => {
  try {
    let user = await userManager.addFavourite(
      req.tokenData.userId,
      req.body.id
    );
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/remove-favourite", auth, async (req, res) => {
  try {
    let user = await userManager.removeFavourite(
      req.tokenData.userId,
      req.body.id
    );
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/tags", auth, async (req, res) => {
  try {
    let user = await userManager.updateTags(
      req.tokenData.userId,
      req.body.tags
    );
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/level", auth, async (req, res) => {
  try {
    let user = await userManager.updateLevel(
      req.tokenData.userId,
      req.body.level
    );
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/add-roadmap", auth, async (req, res) => {
  try {
    let user = await userManager.addRoadmap(req.tokenData.userId, req.body);
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/remove-roadmap", auth, async (req, res) => {
  try {
    let user = await userManager.removeRoadmap(
      req.tokenData.userId,
      req.body?.id
    );
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/update-roadmap", auth, async (req, res) => {
  try {
    let u = await userManager.getById(req.tokenData.userId);
    let roadmaps = u?.roadmaps || [];
    for (let i = 0; i < roadmaps?.length; i++) {
      if (roadmaps[i]?.id == req.body?.id) {
        roadmaps[i] = req.body;
      }
    }
    let user = await userManager.updateRoadmap(req.tokenData.userId, roadmaps);
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

module.exports = router;
