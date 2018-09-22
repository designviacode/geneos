import config from 'config';

const users = config.get('users');

export default async (req, res) => {
  return res.json({
    data: users,
  });
};
