const fillStrTemplate = (templateString, templateVars) => {
  return new Function('return `' + templateString + '`;').call(templateVars);
};

//const res = fillStrTemplate(string, { company, value });

module.exports = fillStrTemplate;
