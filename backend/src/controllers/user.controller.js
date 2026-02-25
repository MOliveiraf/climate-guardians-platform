import userService from "../services/UserService.js";

class UserController {

  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format." });
      }

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format." });
      }

      await userService.deleteUser(id);

      return res.status(200).json({
        message: `User ${id} deleted successfully`
      });

    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

}

export default new UserController();