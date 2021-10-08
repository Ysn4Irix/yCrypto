/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 17-09-2021
 * @modify date 08-10-2021
 * @desc routes handler
 */

const router = require("express").Router();
const index = require("../controllers/indexController");

router.post("/enc", index.encryptRouter);
router.get("/gen", index.genPass);
router.post("/dec", index.decryptRouter);

module.exports = router;
