const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get(
  '/',
  controllers.auth.bearerTokenValidation,
  async (req, res) => {
    return res.json({
      hello: 'world',
      user: req.user.filterSystemFields(),
    });
  },
);

module.exports = router;
