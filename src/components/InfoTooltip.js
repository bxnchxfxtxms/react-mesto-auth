import React from 'react'
import successIcon from '../images/popup-site-entrance-confirm-icon-success.svg'
import failureIcon from '../images/popup-site-entrance-confirm-icon-failure.svg'

class InfoTooltip extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <section className={`popup popup_type_${this.props.name} ${this.props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="popup__close-button" type="button" onClick={this.props.onClose}></button>
          <figure className="popup__site-entrance-confirm-container">
            <img className="popup__site-entrance-confirm-icon" alt='' src={this.props.authorizationSuccess ? successIcon : failureIcon}/>
            <figcaption className="popup__site-entrance-confirm-message">{this.props.authorizationSuccess ? this.props.successMessage : this.props.failureMessage}</figcaption>
          </figure>
        </div>
      </section>
    )
  }
}

export default InfoTooltip