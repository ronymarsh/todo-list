const isValidEmail = (email) => {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

module.exports = isValidEmail;
