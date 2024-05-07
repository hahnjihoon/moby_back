const express = require("express");
const router = express.Router();

const db = require("../models/index");
const { Moby_users } = db;

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// 모든 유저 정보 읽기
router.get("/users", async (req, res) => {
  try {
    const users = await Moby_users.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

// 특정 유저 정보 읽기
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Moby_users.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

// 유저 정보 생성
router.post("/users", async (req, res) => {
  console.log("들어오냐");
  const userData = req.query;
  console.log("user insert data :: ", userData);
  try {
    const user = await Moby_users.create(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

// 유저 정보 업데이트
router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const user = await Moby_users.findByPk(userId);
    if (user) {
      await user.update(userData);
      res.json(user);
    } else {
      res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

// 유저 정보 삭제
router.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Moby_users.findByPk(userId);
    if (user) {
      await user.destroy();
      res.json({ message: "유저 정보가 삭제되었습니다." });
    } else {
      res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

module.exports = router;
