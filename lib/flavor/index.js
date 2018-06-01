module.exports = (flavor) => {
  const rules = require(`./${flavor}`)

  return (service) => Object.keys(rules).forEach(rule => service.addRule(rule, rules[rule]))
}
