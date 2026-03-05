// import actionRepository from "../repositories/action.repository.js";

// class ActionService {
//   async getAllActions() {
//     const actions = await actionRepository.findAll();

//     return actions;
//   }

//   async getActionById(id) {
//     const action = await actionRepository.findById(id);

//     if (!action) {
//       throw new Error("Action not found.");
//     }

//     return action;
//   }
// }

// export default new ActionService();


import actionRepository from "../repositories/action.repository.js";

class ActionService {
  async getAllActions() {
    return await actionRepository.findAll();
  }

  async getActionById(id) {
    const action = await actionRepository.findById(id);

    if (!action) {
      throw new Error("Action not found.");
    }

    return action;
  }

  // 🔐 CREATE
  async createAction(data) {
    const { title, description, type, points, imageUrl, audioUrl } = data;

    if (!title || !description || !type || points === undefined) {
      throw new Error("Missing required fields.");
    }

    return await actionRepository.create({
      title,
      description,
      type,
      points,
      imageUrl,
      audioUrl,
    });
  }

  // 🔐 DELETE
  async deleteAction(id) {
    const action = await actionRepository.findById(id);

    if (!action) {
      throw new Error("Action not found.");
    }

    return await actionRepository.delete(id);
  }
}

export default new ActionService();