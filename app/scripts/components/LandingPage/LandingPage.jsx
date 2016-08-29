import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './LandingPage.scss'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { modal } from 'actions/modal'

function LandingPage({ dispatch }) {
  const handleClick = e => {
    e.preventDefault()
    dispatch(modal.show({
      modalComponent: 'SIGNUP',
    }))
  }

  return (
    <section className={s.container}>
      <div className={s.bg}>
        <div className={s.bgFilter} />
        <div className={s.splash}>
          <article className={s.group}>
            <h1 className={s.headline}>
              <strong>
                {"ColorHappy"}
              </strong>
            </h1>
            <p className={s.byline}>
              {"Explore, create, and save your palettes."}
            </p>
          </article>
          <article className={s.group}>
            <button className={s.btnCta} onClick={handleClick}>
              {"Get Started"}
            </button>
            <Link to={'/palettes'} className={s.btnSecondary}>
              {"View Palettes"}
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(withStyles(s)(LandingPage))
