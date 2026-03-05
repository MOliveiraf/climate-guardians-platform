import authService from "../services/AuthService.js";

class AuthController {
 async login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json({
      message: "Login successful",
      ...result, // espalha user corretamente
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
}
}

export default new AuthController();
