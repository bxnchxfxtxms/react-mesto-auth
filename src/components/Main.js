import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

class Main extends React.Component {

  static contextType = CurrentUserContext;
  
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <div className="profile__avatar-overlay" onClick={this.props.onEditAvatar}></div>
            <img className="profile__avatar" src={this.context.avatar} alt="Аватар пользователя" />
          </div>
          <div className="profile__info">
            <div className="profile__info-line">
              <h1 className="profile__username">
                {this.context.name}
              </h1>
              <button className="profile__edit-button" type="button" onClick={this.props.onEditProfile}></button>
            </div>
            <div className="profile__info-line">
              <p className="profile__user-bio">
                {this.context.about}
              </p>
            </div>
          </div>
          <button className="profile__add-button" type="button" onClick={this.props.onAddPlace}></button>
        </section>

        <section className="elements">
          <ul className="elements__grid">
            {this.props.cards.map(card => (
              <Card
                card={card}
                key={card._id}
                onCardClick={this.props.onCardClick}
                onCardLike={this.props.onCardLike}
                onCardDelete={this.props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    )
  }
}

export default Main