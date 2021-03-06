/* eslint-disable react/jsx-indent */

import React, { PropTypes, Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Header.scss'
import { Link } from 'react-router'
import { Hamburger, Close } from 'components/Svg'
import { toggleSidebar, condenseHeader } from 'actions/ui'
import { modal } from 'actions/modal'

const propTypes = {
  location: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleAuthModal = this.handleAuthModal.bind(this)
  }

  componentDidMount() {
    if (window.scrollY > 100) this.props.dispatch(condenseHeader(true))
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    // This will never get called because this component is always active,
    // but it is here for safety measures.
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleSidebarToggle() {
    this.props.dispatch(toggleSidebar())
  }

  handleScroll() {
    const { ui } = this.props
    if (!ui.header && window.scrollY > 100) {
      this.shouldCondense(true)
    } else if (ui.header && window.scrollY <= 100) {
      this.shouldCondense(false)
    }
  }

  handleAuthModal(e) {
    const { dispatch } = this.props
    e.preventDefault()
    dispatch(modal.show({
      modalComponent: e.target.getAttribute('data-modal'),
    }))
  }

  shouldCondense(shouldCondense) {
    this.props.dispatch(condenseHeader(shouldCondense))
  }

  render() {
    const { ui, session } = this.props
    const { header, sidebar } = ui
    return (
      <header className={header ? s.header__condensed : s.header}>
        <section className={s.sectionLeft}>
          <h2 className={s.title}>
            <Link className={s.link} to="/">
              <strong>{"ColorHappy"}</strong>
            </Link>
          </h2>
          <p className={s.description}>
            <small>
              <strong>{"Explore"}</strong>,
              <strong>{" create"}</strong>,
              {" and"}
              <strong>{" save"}</strong>
              {" your palettes."}
            </small>
          </p>
        </section>
        {session.isAuthenticated
          ? <section className={s.sectionRight}>
              <button className={s.btn} onClick={this.handleSidebarToggle}>
                <small className={s.menuText}>
                  {"Menu"}
                </small>
                {sidebar
                  ? <Close className={s.menuIcon} />
                  : <Hamburger className={s.menuIcon} />
                }
              </button>
            </section>
          : <section className={s.sectionRight}>
              <a
                data-modal="LOGIN"
                className={s.navLink}
                href="#"
                onClick={this.handleAuthModal}
              >
                {"Login"}
              </a>
              <span className={s.alignMiddle}>
                {" or "}
              </span>
              <a
                data-modal="SIGNUP"
                className={s.navLink}
                href="#"
                onClick={this.handleAuthModal}
              >
                {"Signup"}
              </a>
            </section>
          }
      </header>
    )
  }
}

Header.propTypes = propTypes

export default withStyles(s)(Header)
