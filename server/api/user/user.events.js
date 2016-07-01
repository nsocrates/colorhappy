/**
 * Model events
 */

import { EventEmitter } from 'events'
const UserEvents = new EventEmitter()

// Set max event listeners (0 == unlimited)
UserEvents.setMaxListeners(0)

// Model events
// const events = {
//   updateDisplayName: name => name,
// }

// Object.keys(events).forEach(event =>
//   UserEvents.on(event, payload => events[event].call(null, payload)))

export default UserEvents
