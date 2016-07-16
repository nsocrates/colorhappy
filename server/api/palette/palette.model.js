import mongoose from 'mongoose'
import partition from '../partition'
import merge from 'lodash/merge'

const handlePaletteError = error =>
  Promise.reject(error)

const handleViewCount = palette => {
  const updated = merge(palette, { viewCount: palette.viewCount + 1 })
  return updated.save()
    .then(updatedPalette => updatedPalette)
}

const updateLoveCount = (req, inc) => model => {
  const action = inc > 0 ? '$addToSet' : '$pull'

  return model.findOneAndUpdate({
    _id: req.params.id,
    loves: { $ne: req.user._id },
    userId: { $ne: req.user._id },
  }, {
    $inc: { loveCount: inc },
    [action]: { loves: req.user._id },
  }, {
    upsert: false,
    new: true,
  })
}

const Schema = mongoose.Schema
const PaletteSchema = new Schema({
  title: { type: String, default: 'My Palette' },
  colors: Array,
  description: String,
  loveCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  loves: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

PaletteSchema.set('toJSON', {
  virtuals: true,
})

PaletteSchema.statics = {
  matchCriteria(req) {
    return this.findOne({ _id: req.params.id, userId: req.user._id })
  },

  findAndView(req) {
    return this.findById(req.params.id).exec()
      .then(handleViewCount)
      .catch(handlePaletteError)
  },

  findAndLove(req) {
    return updateLoveCount(req, 1)(this)
  },

  findAndUnlove(req) {
    return updateLoveCount(req, -1)(this)
  },
}

PaletteSchema.plugin(partition)
export default mongoose.model('Palette', PaletteSchema)
