export const formatPhoneNumber = (str) => {
  let cleaned = ("" + str).replace(/\D/g, "");
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return null;
};

export const camelCaseToWords = function (str) {
  return str
    .match(/^[a-z]+|[A-Z][a-z]*/g)
    .map(function (x) {
      return x[0].toUpperCase() + x.substr(1).toLowerCase();
    })
    .join(" ");
};

export const capitalized = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);
