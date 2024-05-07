const express = require("express");
const router = express.Router();

const db = require("../models/index");
const { Products } = db;

// 리퀘스트가 왔을때 바디의 JSON 데이터가 requst 객체의 body프로퍼티로 설정 되게 해줌.
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

/*
 * ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 * GET
 */

router.get("/", async (req, res) => {
  const category = req.query.category; // 클라이언트로부터 받은 카테고리 정보
  console.log("받은 카테고리:", category);

  try {
    let result = await Products.findAll({
      where: {
        minor_class: category // minor_class 컬럼이 클라이언트에서 받은 카테고리인 데이터 조회
      }
    });

    console.log("result:", result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("데이터 조회 오류");
  }
});

module.exports = router;
