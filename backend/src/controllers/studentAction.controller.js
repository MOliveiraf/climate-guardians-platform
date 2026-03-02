import studentActionService from "../services/StudentActionService.js";

class StudentActionController {

  async execute(req, res) {
    try {
      const userId = req.user.id;
      const { actionId } = req.body;

      if (!actionId) {
        return res.status(400).json({
          message: "actionId is required"
        });
      }

      const result = await studentActionService.executeAction(
        userId,
        Number(actionId)
      );

      return res.status(201).json(result);

    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  async history(req, res) {
    try {
      const userId = req.user.id;

      const history = await studentActionService.getHistory(userId);

      return res.status(200).json(history);

    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  async getScore(req, res) {
  try {

    const score = await studentActionService.getScore(req.user.id);

    return res.status(200).json(score);

  } catch (error) {

    return res.status(400).json({
      message: error.message
    });

  }
}

async ranking(req, res) {
  try {

    const ranking = await studentActionService.getRanking();

    return res.status(200).json(ranking);

  } catch (error) {

    return res.status(400).json({
      message: error.message
    });

  }
}

}

export default new StudentActionController();