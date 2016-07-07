import mongoose from 'mongoose'

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

PaletteSchema.statics = {
  matchCriteria(req) {
    return this.findOne({ _id: req.params.id, userId: req.user._id })
  },

  findAndView(req) {
    return this.findByIdAndUpdate(req.params.id, {
      $inc: { viewCount: 1 },
    }, {
      upsert: false,
      new: true,
    })
  },

  findAndLove(req) {
    return this.findOneAndUpdate({
      _id: req.params.id,
      loves: { $ne: req.user._id },
      userId: { $ne: req.user._id },
    }, {
      $inc: { loveCount: 1 },
      $addToSet: { loves: req.user._id },
    }, {
      upsert: false,
      new: true,
    })
  },

  findAndUnlove(req) {
    return this.findOneAndUpdate({
      _id: req.params.id,
      loves: { $eq: req.user._id },
      userId: { $ne: req.user._id },
    }, {
      $inc: { loveCount: -1 },
      $pull: { loves: req.user._id },
    }, {
      upsert: false,
      new: true,
    })
  },
}

export default mongoose.model('Palette', PaletteSchema)
