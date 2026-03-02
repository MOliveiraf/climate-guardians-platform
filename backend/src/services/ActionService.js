import actionRepository from "../repositories/action.repository.js";

class ActionService {
  async getAllActions() {
    const actions = await actionRepository.findAll();

    return actions;
  }

  async getActionById(id) {
    const action = await actionRepository.findById(id);

    if (!action) {
      throw new Error("Action not found.");
    }

    return action;
  }
}

export default new ActionService();
