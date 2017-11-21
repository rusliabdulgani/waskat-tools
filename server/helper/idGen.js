const uniqid = require('uniqid')

module.exports = {
  generateId: () => {
    return uniqid.time()
  }
}