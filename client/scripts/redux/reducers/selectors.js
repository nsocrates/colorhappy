import {
  createSelector,
  createStructuredSelector,
} from 'reselect'

export const selectState = state => state
export const selectEntities = state => state.entities
export const selectSession = state => state.session
export const selectPaletteEntity = state => state.entities.palettes
export const selectUserEntity = state => state.entities.users
export const selectSidebar = state => state.ui.sidebar
export const selectHeader = state => state.ui.header
export const selectRouting = state => state.routing.locationBeforeTransitions

export const selectPalette = (state, props) =>
  state.entities.palettes[props.params.id] || {}

export const selectSortedPalettes = (state, props) =>
  state.palettes[props.location.query.sort || 'newest'] || {}

export const appSelector = createStructuredSelector({
  session: selectSession,
  sidebar: selectSidebar,
  header: selectHeader,
})

export const makePaletteSelector = () =>
  createSelector(
    selectPalette, palette => ({ palette })
  )

export const makeBrowserSelector = () =>
  createSelector(
    [selectEntities, selectSortedPalettes],
    (entities, sortedPalettes) => ({
      palettes: entities.palettes,
      users: entities.users,
      sorted: sortedPalettes,
    })
  )

export const makeUiSelector = () =>
  createSelector(
    selectSidebar, sidebar => ({ sidebar })
  )
