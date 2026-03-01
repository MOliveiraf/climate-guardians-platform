import actionService from "../services/ActionService.js";

class ActionController {

  async findAll(req, res) {
    try {
      const actions = await actionService.getAllActions();
      return res.status(200).json(actions);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const action = await actionService.getActionById(id);

      return res.status(200).json(action);

    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

}

export default new ActionController();