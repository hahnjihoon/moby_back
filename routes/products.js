const express = require("express");
const router = express.Router();

const db = require("../models/index");
const { Products } = db;

// 리퀘스트가 왔을때 바디의 JSON 데이터가 requst 객체의 body프로퍼티로 설정 되게 해줌.
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

/*
 * ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 * GET  /ulex
 */

router.get("/", async (req, res) => {
  console.log("들어왔냐");
  try {
    let result = await Products.findAll({});

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("데이터 조회 오류");
  }
});

module.exports = router;
