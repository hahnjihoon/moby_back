const express = require("express");
// const app = express();
const router = express.Router();
const db = require("../models/index");
const moby_users = require("../models/moby_users");
const { Moby_users } = db;

// 세션을 사용하기 위한 미들웨어 설정
// const session = require("express-session");

// router.use(
//   session({
//     secret: "abcd",
//     resave: false,
//     saveUninitialized: true
//   })
// );

// 로그인 상태 체크를 위한 미들웨어
const checkAuth = (req, res, next) => {
  console.log("이거안타냐");
  console.log("req :: ", req.sessionID);
  if (req.sessionID) {
    next();
  } else {
    console.log("이게나와버리냐");
    res.status(401).json({ message: "Unauthorized" });
  }
};

// 사용자 인증 라우트 // /auth/login
router.post("/login", async (req, res) => {
  console.log("들어옴", req.body);
  console.log("req.body.userId:: ", req.body.userId);
  console.log("req.body.password:: ", req.body.password);
  // 사용자 인증 처리...
  // 성공 시
  const user_info = await Moby_users.findOne({
    where: { user_id: req.body.userId, user_pw: req.body.password }
  });
  console.log("dsadfasdf", user_info);

  if (!user_info) {
    res.status(400).send({ data: null, message: "아이디나 비번이 틀림" });
  } else {
    req.session.save(function () {
      // req.session.save(callback)은 사용하지 않아도 됨
      req.session.userInfo = user_info;
      res.json({ data: user_info, message: "ok" });
      // post 요청에 대한 응답이기에 {data:null}이 되므로, {data: userInfo} 무의미하여 생략 가능
    });
  }

  // req.session.authenticated = true;
  // res.json({ message: "Login successful" });
});

// 로그아웃 라우트
router.post("/logout", (req, res) => {
  // 세션에서 사용자 인증 정보 삭제
  req.session.authenticated = false;
  res.json({ message: "Logout successful" });
});

// 사용자 인증 상태 확인 라우트
router.get("/checkAuth", checkAuth, (req, res) => {
  console.log("인증확인");
  // res.json({ user: req.session.user });
  res.json({
    sessionId: req.sessionID,
    user: req.session.user
  });
});

// router.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });

module.exports = router;
