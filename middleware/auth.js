module.exports = {
  authenticator:
    (req, res, next) => {
      if (req.isAuthenticated()) {
        return next()
      }
      req.flash('warning_msg','請先登入才能使用您的記帳本！')
      return res.redirect('/user/login')
    }
}