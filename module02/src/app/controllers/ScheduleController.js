import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appoinment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkUserProvider) {
      return res.status(401).json({
        error: 'User is not a provider',
      });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);
    // 2019-09-20 00:00:00-03:00
    // 2019-09-20 23:59:59-03:00
    const appoinments = await Appoinment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });

    return res.json(appoinments);
  }
}

export default new ScheduleController();
