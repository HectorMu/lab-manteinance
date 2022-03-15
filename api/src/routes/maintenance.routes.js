const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/computer.maintenance.controller");

const ENDPOINT_ALIAS = "maintenance";

router.get(`/api/${ENDPOINT_ALIAS}/getall`, verifyToken, controller.GetAll);
router.get(`/api/${ENDPOINT_ALIAS}/getone/:id`, verifyToken, controller.GetOne);
router.post(`/api/${ENDPOINT_ALIAS}/save`, verifyToken, controller.Save);
router.delete(
  `/api/${ENDPOINT_ALIAS}/delete/:id`,
  verifyToken,
  controller.Delete
);
router.put(`/api/${ENDPOINT_ALIAS}/update/:id`, verifyToken, controller.Update);

module.exports = router;
