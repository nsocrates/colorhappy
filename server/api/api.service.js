export const handleValidationError = (res, statusCode = 422) => err => {
  console.log(err)
  res.status(statusCode).json(err.message || err)
}

export const handleError = (res, statusCode = 500) => err => {
  console.log(err)
  res.status(statusCode).send(err.message || err)
}

export const handleNotFound = res => entity => {
  if (!entity) {
    res.status(404).end()
    return null
  }
  return entity
}

export const respondWithResult = (res, statusCode = 200) => entity => {
  if (entity) res.status(statusCode).json(entity)
}
