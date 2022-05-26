import React from 'react';

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className={`popup popup_type_${this.props.name} ${this.props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button className="popup__close-button" type="button" onClick={this.props.onClose}></button>
          <form className="popup__form" onSubmit={this.props.onSubmit} name={`${this.props.name}`}>
            <fieldset className="popup__input-fields">
              <h3 className="popup__title">
                {this.props.title}
              </h3>
              {this.props.children}
              <button className="popup__submit-button" type="submit" name="save">
                {this.props.buttonText}
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    )  
  }
}

export default PopupWithForm;