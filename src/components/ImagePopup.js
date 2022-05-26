import React from 'react'

class ImagePopup extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    console.log(this.props)
  }

  render () {
    return (
      <section className={`popup popup_type_picture-zoom ${this.props.card.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_type_picture-zoom">
          <button className="popup__close-button" type="button" onClick={this.props.onClose}></button>
          <figure className="popup__image-container">
            <img className="popup__image" src={this.props.card.link} alt={this.props.card.name} />
            <figcaption className="popup__image-caption">{this.props.card.name}</figcaption>
          </figure>
        </div>
      </section>
    )
  }
}

export default ImagePopup