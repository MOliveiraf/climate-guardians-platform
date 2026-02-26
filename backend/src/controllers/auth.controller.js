import authService from "../services/AuthService.js";

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await authService.login(email, password);

      return res.status(200).json({
        message: "Login successful",
        user,
      });
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
}

export default new AuthController();