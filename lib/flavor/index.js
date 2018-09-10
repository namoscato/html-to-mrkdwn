module.exports = (flavor, options) => {
  if (typeof options === 'undefined') {
    options = {}
  }

  const rules = require(`./${flavor}`)(options)

  return (service) => Object.keys(rules).forEach(rule => service.addRule(rule, rules[rule]))
}
