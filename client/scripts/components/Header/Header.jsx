/* eslint-disable react/jsx-indent */

import React, { PropTypes, Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Header.scss'
import { Link } from 'react-router'
import { Hamburger, Close } from 'components/Svg'
import { toggleSidebar, condenseHeader } from 'actions/ui'

const propTypes = {
  location: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { isActive: false }
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    if (window.scrollY > 100) this.props.dispatch(condenseHeader(true))
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleSidebarToggle() {
    this.props.dispatch(toggleSidebar())
  }

  handleScroll() {
    if (!this.state.isActive && window.scrollY > 100) {
      this.shouldCondense(true)
    } else if (this.state.isActive && window.scrollY <= 100) {
      this.shouldCondense(false)
    }
  }

  shouldCondense(shouldCondense) {
    this.props.dispatch(condenseHeader(shouldCondense))
    this.setState({ isActive: shouldCondense })
  }

  render() {
    const { ui, location, session } = this.props
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
              <Link
                className={s.navLink}
                to="/login"
                state={{ isModal: true, returnPath: location.pathname }}
              >
                {"Login"}
              </Link>
              <span className={s.alignMiddle}>
                {" or "}
              </span>
              <Link
                className={s.navLink}
                to="/signup"
                state={{ isModal: true, returnPath: location.pathname }}
              >
                {"Signup"}
              </Link>
            </section>
          }
      </header>
    )
  }
}

Header.propTypes = propTypes

export default withStyles(s)(Header)
