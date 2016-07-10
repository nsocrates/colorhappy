// Range-based partitioning plugin

const resolveResult = sortKey => ([count, collection]) => {
  const result = {
    collection,
    count,
    startId: collection[collection.length - 1]._id,
    startKey: collection[collection.length - 1][sortKey],
  }
  return new Promise(resolve => resolve(result))
}

export function partition(query = {}, opts = {}) {
  const { limit = 10, sort = '', startId, startKey, populate } = opts
  const a = {}
  const b = {}
  const startPosition = startKey || startId
  const sortKey = sort.replace('-', '')

  const q = this.find(query)
    .sort(`${sort} -_id`)
    .limit(limit)
    .populate(populate)

  // Make promises
  // Order is important!
  let promises = {
    count: this.count(q).exec(),
    docs: q.exec(),
  }

  if (startId) {
    a[sortKey] = startPosition
    a._id = { $lt: startId }

    b[sortKey] = sort.indexOf('-') !== -1
      ? { $lt: startPosition }
      : { $gt: startPosition }

    promises = Object.assign({}, promises, {
      docs: q.where({ $or: [a, b] }).exec(),
    })
  }

  promises = Object.keys(promises).map((x) => promises[x])

  return Promise.all(promises).then(resolveResult(sortKey))
}

module.exports = function (schema) {
  schema.statics.partition = partition
}
