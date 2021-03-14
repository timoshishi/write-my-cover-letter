/**
 *
 * @param {String} templateString String formatted with variables like a template literal
 * @param {Object} templateVars Object with keys to replace variables in the template string
 * @returns String with template values replaced with templateVars
 */
const fillStrTemplate = (templateString, templateVars) => {
  return new Function('return `' + templateString + '`;').call(templateVars);
};

//const res = fillStrTemplate(string, { company, value });

module.exports = fillStrTemplate;
