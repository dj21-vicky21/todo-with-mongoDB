const { Router } = require("express");
var multer = require('multer')
var multParse = multer()

const { getToDo, saveToDo, updateToDo, deleteToDo } = require('../controllers/todocontrolers');

const router = Router();

router.get("/", getToDo);

router.post("/save",multParse.none(),saveToDo);

router.put("/update",multParse.none(), updateToDo);

router.delete("/delete/:id",multParse.none(), deleteToDo);

module.exports = router;