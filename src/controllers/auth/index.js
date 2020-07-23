const models = require('../../models').models;
const User = models.User;
const Session = models.Session;

const bearerTokenValidation = async (req, res, next) => {
  try {
    const incorrectTokenError = (req, res, next) => {
      return next({
        status: 403,
        errorCode: 'INCORRECT_TOKEN',
        errorMessage: 'Incorrect Token',
      });
    };

    if (!req.get('Authorization')) {
      return incorrectTokenError(req, res, next);
    }

    let authHeaderArr = req.get('Authorization').split(' ');
    if (authHeaderArr.length != 2) {
      return incorrectTokenError(req, res, next);
    }

    let token = authHeaderArr[1];

    let dbToken = await Session.findSession(token);

    if (!dbToken) {
      return incorrectTokenError(req, res, next);
    }

    if (!dbToken.user) {
      return next({
        status: '404',
        errorCode: 'USER_NOT_FOUND',
      });
    }

    if (dbToken.expiresAt < new Date()) {
      return next({
        status: '400',
        errorCode: 'TOKEN_EXPIRED',
      });
    }

    req.user = dbToken.user;
    req.token = dbToken.token;

    req.query.user = dbToken.user;

    next();
  } catch (ex) {
    next({
      status: 500,
      errorCode: 'UNEXPECTED_ERROR',
      errorMessage: ex,
    });
  }
};

const LoginUsingLoginPasswordPair = async (req, res, next) => {
  try {
    if (!req.body.login || !req.body.password) {
      return next({
        status: 404,
        errorCode: 'INCORRECT_USERPASS',
        errorMessage: 'Please provide login and password',
      });
    }

    const user = await User.findByLogin(req.body.login);

    const isPasswordValid = await user.checkPassword(
      req.body.password,
    );

    if (!user || !isPasswordValid) {
      return next({
        status: 403,
        errorCode: 'INCORRECT_USERPASS',
        errorMessage: 'Please provide login and password',
      });
    }

    // now we need to create a token

    const newSession = Session.createSession(user);
    const savedSession = await newSession.save();

    return res.json({
      status: 200,
      accessToken: savedSession.accessToken,
      tokenType: 'bearer',
      user: user.filterSystemFields(),
    });
  } catch (ex) {
    console.log(ex);

    next({
      status: 500,
      errorCode: 'UNEXPECTED_ERROR',
      errorMessage: ex,
    });
  }
};

module.exports = {
  bearerTokenValidation,
  LoginUsingLoginPasswordPair,
};
