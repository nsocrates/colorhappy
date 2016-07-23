// TODO: Handle not found

/**
 * Range-based partitioning plugin
 *
 * https://github.com/kilianc/mongoose-range-paginate
 */

/**
 * Constructs an object and returns it as a new Promise.
 * @param  {String} [sortKey] - The sort value used in partition.
 * @param  {Array} [count, collection] - The Promise array.
 * @return {Promise<object>} - A Promise object.
 */
const resolveResult = sortKey => ([count, collection]) => {
  // Attach metadata to our results;
  // startId and startKey can be used to query the next set of documents.
  const result = {
    collection,
    count,
    startId: collection[collection.length - 1]._id,
    startKey: collection[collection.length - 1][sortKey],
  }

  // Create a Promise that is resolved, and return it as a fulfillment.
  return new Promise(resolve => resolve(result))
}

/**
 * Pagination / Partition function
 * @param  {Object} [query] - The pattern used to match the documents in MongoDB.
 * @param  {Object} [opts] - Options.
 * @param  {Number} [opts.limit] - Maximum number of documents to be returned.
 * @param  {String} [opts.sort] - Sort options to be passed to Mongoose;
 *   prefix with '-' to descend.
 * @param  {String} [opts.startId] - The ID of the last document;
 *   results will return documents before/after the startId.
 * @param  {String} [opts.startKey] - The value of the sort field of the last document;
 *   this is value is used to match the document's corresponding ID incase of identical
 *   sort keys.
 * @return {Promise<array>} - A Promise of an Iterable.
 */
export function partition(query = {}, opts = {}) {
  const { limit = 10, sort = '', startId, startKey, populate } = opts

  // Normalize sort option for ease.
  const sortKey = sort.replace('-', '')

  // Perform search and assign it to variable 'q'.
  // We will execute 'q' when we iterate over it as a Promise.
  const q = this.find(query)
    .sort(`${sort} -_id`)
    .limit(limit)
    .populate(...populate)

  // Prepare the Promises
  let promises = {
    /** Order is important! **/
    count: this.count(q).exec(),
    collection: q.exec(),
  }

  // If startId is provided, we query for documents before or after the startId.
  // If startId is undefined, we skip this step and return 'promises' as is.
  if (startId) {
    // We therefore populate our temporary objects 'a' and 'b'.
    const a = {}
    const b = {}

    // If startKey is undefined, we use the startId
    const startPosition = startKey || startId

    // Use _id in case there are more than one document with the same sort key.
    a[sortKey] = startPosition
    a._id = { $lt: startId }

    // Query for documents starting with, but not including, the current key.
    b[sortKey] = sort.indexOf('-') !== -1
      // Sort option is prefixed with '-', so we descend.
      ? { $lt: startPosition }
      // Otherwise, we ascend.
      : { $gt: startPosition }

    // We filter out for documents that satisfies the keys in either
    // 'a' or 'b', and prepare execution.
    promises = Object.assign({}, promises, {
      collection: q.where({ $or: [a, b] }).exec(),
    })
  }

  // Iterate through our promise object, and execute its methods.
  promises = Object.keys(promises).map((x) => promises[x])

  // Resolve the Promise and send it to our callback fn.
  return Promise.all(promises).then(resolveResult(sortKey))
}

// Export the function to be used as a plugin by our Models
module.exports = function (schema) {
  schema.statics.partition = partition
}
