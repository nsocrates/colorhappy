import { Schema, arrayOf } from 'normalizr'

const UserSchema = new Schema('users')
const PaletteSchema = new Schema('palettes')

PaletteSchema.define({
  user: UserSchema,
})

const Schemas = {
  User: UserSchema,
  UserArray: arrayOf(UserSchema),
  Palette: PaletteSchema,
  PaletteArray: arrayOf(PaletteSchema),
}

export default Schemas
