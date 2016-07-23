import {
  createSelector,
  createStructuredSelector,
} from 'reselect'

export const selectState = state => state
export const selectEntities = state => state.entities
export const selectSession = state => state.session
export const selectIsModal = state => state.modal.isModal
export const selectPaletteEntity = state => state.entities.palettes
export const selectUserEntity = state => state.entities.users
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

export const selectSortedPalettes = (state, sort = 'newest') =>
  state.palettes[sort] || {}

export const appSelector = createStructuredSelector({
  session: selectSession,
  sidebar: selectSidebar,
  header: selectHeader,
  notifications: selectNotifications,
})

export const makeProfileSelector = () =>
  createStructuredSelector({
    user: selectUser,
    palette: selectSortedPalettes[selectUser.id],
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
    [selectSession, selectUserEntity],
    (session, userEntity) => ({
      session,
      me: userEntity[session.id] || {},
    })
  )
