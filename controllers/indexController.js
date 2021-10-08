/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 17-09-2021
 * @modify date 08-10-2021
 * @desc All the magic goes here
 */

const { validateDataEnc, validateDataDec } = require("../helpers/validation");
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);

const index = {
  encryptRouter: async (req, res, next) => {
    let { message, secret } = req.body;
    const { error } = validateDataEnc({
      message,
      secret,
    });
    if (error) return next(error);

    try {
      const key = crypto
        .createHash("sha512")
        .update(secret, "utf-8")
        .digest("hex")
        .substr(0, 32);
      const cipher = crypto.createCipheriv(algorithm, key, initVector);
      let encMessage = cipher.update(message, "utf8", "base64");
      encMessage += cipher.final("base64");
      const finalEncMessage = Buffer.from(encMessage).toString("base64");
      res.status(200).json({
        response: "🆗",
        encryptedMessage: finalEncMessage,
      });
    } catch (er) {
      next(err);
    }
  },
  decryptRouter: async (req, res, next) => {
    let { encMessage, secret } = req.body;
    const { error } = validateDataDec({
      encMessage,
      secret,
    });
    if (error) return next(error);

    try {
      const buff = Buffer.from(encMessage, "base64");
      encMessage = buff.toString("utf-8");
      const key = crypto
        .createHash("sha512")
        .update(secret, "utf-8")
        .digest("hex")
        .substr(0, 32);
      const decipher = crypto.createDecipheriv(algorithm, key, initVector);
      let decMessage = decipher.update(encMessage, "base64", "utf8");
      decMessage += decipher.final("utf8");
      res.status(200).json({
        response: "🆗",
        decryptedMessage: decMessage,
      });
    } catch (err) {
      next(err);
    }
  },
  genPass: (req, res, next) => {
    const gen_pass = crypto.randomBytes(16).toString("hex");
    res.status(200).json({
      response: "🆗",
      generatedPass: gen_pass,
    });
  },
};

module.exports = index;
