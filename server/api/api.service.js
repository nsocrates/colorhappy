import omit from 'lodash/omit'
import merge from 'lodash/merge'

export const handleValidationError = (res, statusCode = 422) => err => {
  console.log(err)
  res.status(statusCode).json(err)
}

export const handleError = (res, statusCode = 500) => err => {
  console.log(err)
  res.status(statusCode).send(err)
}

export const handleNotFound = res => entity => {
  if (!entity) {
    res.status(404).end()
    return null
  }
  return entity
}

export const removeEntity = res => entity => {
  if (entity) {
    return entity.remove()
      .then(() => res.status(204).end())
  }
  return null
}

export const respondWithResult = (res, statusCode = 200) => entity => {
  if (entity) res.status(statusCode).json(entity)
}

export const saveUpdates = (updates, forbidden) => entity => {
  const updated = merge(entity, omit(updates, forbidden))
  return updated.save()
    .then(updatedModel => updatedModel)
}
