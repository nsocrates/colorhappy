import { createSelector } from 'reselect'

export const selectState = state => state
export const selectEntities = state => state.entities

export const selectPalette = (state, props) =>
  state.entities.palettes[props.params.id]

export const browserSelector = createSelector(
  selectEntities,
  entities => ({ palettes: entities.palettes, users: entities.users })
)

export const paletteSelector = createSelector(
  selectPalette, (palette = {}) => ({ palette })
)
