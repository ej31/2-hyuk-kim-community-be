const fileSystem = require("../utils/fileManager");
const filePath = "./data/user.json";
const { v4: uuidv4 } = require("uuid");

const User = {
  // 토큰, 세션이 없으니까 유저 이메일 전달
  // 이후 DB 연결 및 토큰 완성하면 userId or Token 전달로 변경하기!!
  async login(email, password) {
    const userList = await fileSystem.readFile(filePath);
    return !!(
      email === userList[email] && userList[email].password === password
    );
  },

  logout(userId) {}, // 이후 토큰, 세션 인증인가시 구현!

  async signup(email, password, nickname) {
    const userList = await fileSystem.readFile(filePath);
    // const id = uuidv4();
    // userList[id] = { email, password, nickname };
    userList[email] = { password, nickname };
    await fileSystem.saveFile(filePath, userList);
    return email;
  },

  async findUserByEmail(email) {
    const userList = await fileSystem.readFile(filePath);
    return !!userList[email];
  },

  async signout(email) {
    const userList = await fileSystem.readFile(filePath);
    delete userList[email];
    await fileSystem.saveFile(filePath, userList);
    return 1;
  },

  async getNicknameByEmail(email) {
    const userList = await fileSystem.readFile(filePath);
    return userList[email].nickname;
  },

  async updateNicknameEmail(email, nickname) {
    const userList = await fileSystem.readFile(filePath);
    userList[email].nickname = nickname;
    await fileSystem.saveFile(filePath, userList);
    return 1;
  },

  async updatePasswordEmail(email, password) {
    const userList = await fileSystem.readFile(filePath);
    userList[email].password = password;
    await fileSystem.saveFile(filePath, userList);
    return 1;
  },

  async setUserInfoByEmail(board) {
    const userList = await fileSystem.readFile(filePath, "utf8");

    const userEmail = board.email;
    const userNickname = userList[userEmail]?.nickname;
    board.nickname = userNickname ? userNickname : "(알 수 없음)";

    for (const commentKey in board.comment) {
      const commentEmail = board.comment[commentKey].email;
      const commentNickname = userList[commentEmail]?.nickname;
      if (commentNickname) board.comment[commentKey].nickname = commentNickname;
    }
    return board;
  },
};

module.exports = User;
// export default User;
