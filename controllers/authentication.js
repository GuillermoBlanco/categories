const got = require('got');
const config = require('../config/db.config').auth;

/**
 * @param {Object} req - req express object
 * @param {Object} res - res express object
 * @param {Function} next - next express function
 */
exports.ensureAuthentication = (req, res, next) =>
  // TODO validate token expiration
  (!req.session.accessToken) ?
    res.redirect('/auth/login') :
    next();

exports.authenticate = (req, res) => {
  const { baseURI, client_id, client_secret } = config;

  got.post(baseURI + '/v2/token', {
    json: {
      grant_type: "client_credentials", 
      client_id,
      client_secret,
    },
    responseType: 'json'
  }).then(({ body }) => {  
      const { access_token, expires_in, token_type, rest_instance_url } = body;
      req.session.accessToken = access_token;
      req.session.expiresIn = expires_in;
      req.session.tokenType = token_type;
      req.session.instanceUrl = rest_instance_url;
      // TODO Set cookie expiration

      res.send(body);
    })
    .catch(err => 
      res.redirect('/?valid=false')
      // TODO Log error
    );
};

// exports.logout = checkSkipAuthentication((req, res) => {
//   logout(req, res, () => res.redirect(envVariables.logoff));
// });
