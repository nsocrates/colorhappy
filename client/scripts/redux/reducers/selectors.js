// Monolithic file containing selectors...

import {
  createSelector,
  createStructuredSelector,
} from 'reselect'

export const selectState = state => state
export const selectEntities = state => state.entities
export const selectSession = state => state.session
export const selectIsModal = state => state.modal.isModal
export const selectSidebar = state => state.ui.sidebar
export const selectHeader = state => state.ui.header
export const selectNotifications = state => state.notifications
export const selectEditor = state => state.editor
export const selectRouting = state => state.routing.locationBeforeTransitions
export const selectModal = state => state.modal

export const selectUser = (state, id) =>
  state.entities.users[id] || {}

export const selectPalette = (state, id) =>
  state.entities.palettes[id] || {}

export const selectPaginatedPalettes = state =>
  state.palettes

export const sessionSelector = createStructuredSelector({
  session: selectSession,
})

export const appSelector = createStructuredSelector({
  session: selectSession,
  sidebar: selectSidebar,
  header: selectHeader,
  notifications: selectNotifications,
})

export const makePaletteUserSelector = () =>
  createSelector(
    [selectPalette, selectEntities],
    (palette, entities) => {
      const userId = palette.user_id
      return {
        palette,
        user: entities.users[userId],
      }
    }
  )

export const makePaginatedPaletteUserSelector = (...selectors) =>
  createSelector(
    [selectEntities, selectPaginatedPalettes],
    (entities, paginatedPalettes) => ({
      paletteEntity: entities.palettes,
      userEntity: entities.users,
      // Will traverse through the object with the given arguments.
      palettes: selectors.reduce((acc, selector) => acc[selector], paginatedPalettes),
    })
  )

export const makeEditorSelector = () =>
  createStructuredSelector({
    session: selectSession,
    editor: selectEditor,
  })

export const makeUiSelector = () =>
  createSelector(
    selectSidebar, sidebar => ({ sidebar })
  )

export const makeModalSelector = () =>
  createSelector(
    selectModal, modal => ({
      modalComponent: modal.modalComponent,
      modalProps: modal.modalProps,
    })
  )

export const makeSettingsSelector = () =>
  createSelector(
    [selectSession, selectEntities],
    (session, entities) => ({
      session,
      me: entities.users[session.id] || {},
    })
  )
