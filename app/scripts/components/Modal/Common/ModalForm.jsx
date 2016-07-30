import React, { PropTypes } from 'react'
import s from './ModalForm.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Close } from 'components/Svg'

const propTypes = {
  children: PropTypes.node,
  onExit: PropTypes.func,
  heading: PropTypes.string,
  className: PropTypes.string,
}

function ModalForm(props) {
  const { heading, children, onExit, className, ...rest } = props

  return (
    <section className={className || s.container}>
      <header className={s.header} onClick={e => e.stopPropagation()}>
        <h4 className={s.formTitle}>
          {heading}
        </h4>
        <div className={s.btnWrap}>
          <button className={s.closeBtn} onClick={onExit}>
            <Close className={s.svgClose} />
          </button>
        </div>
      </header>

      <article className={s.content} onClick={e => e.stopPropagation()}>
        <form {...rest} className={s.form}>
          {children}
        </form>
      </article>
    </section>
  )
}

ModalForm.propTypes = propTypes

export default withStyles(s)(ModalForm)
