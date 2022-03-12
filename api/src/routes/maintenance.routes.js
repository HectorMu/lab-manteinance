const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/computer.maintenance.controller");

const ENDPOINT_ALIAS = "maintenance";

router.get(`/api/${ENDPOINT_ALIAS}/getall`, controller.GetAll);
router.get(`/api/${ENDPOINT_ALIAS}/getone/:id`, controller.GetOne);
router.post(`/api/${ENDPOINT_ALIAS}/save`, controller.Save);
router.delete(`/api/${ENDPOINT_ALIAS}/delete/:id`, controller.Delete);
router.put(`/api/${ENDPOINT_ALIAS}/update/:id`, controller.Update);

module.exports = router;
