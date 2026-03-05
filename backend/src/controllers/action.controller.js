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

  // CREATE (TEACHER)
  async create(req, res) {
    try {
      const newAction = await actionService.createAction(req.body);
      return res.status(201).json(newAction);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  // DELETE (TEACHER)
  async delete(req, res) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const deletedAction = await actionService.deleteAction(id);

      return res.status(200).json({
        message: `Action ${deletedAction.title} deleted successfully`,
      });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export default new ActionController();