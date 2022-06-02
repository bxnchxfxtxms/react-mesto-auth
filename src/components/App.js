import React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ProtectedRoute from './ProtectedRoute'
import { auth } from '../utils/Auth'
import { api } from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

class App extends React.Component {

  static contextType = CurrentUserContext

  constructor(props) {
    super(props)

    this.state = {
      currentUser: {},
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isInfoTooltipOpen: false,
      selectedCard: {isOpen: false},
      cards: [],
      loggedIn: false,
      email: '',
      authorizationSuccess: false
    }
  }

  handleCardDelete = card => {
    api.deleteCard(card._id)
    .then(() => {
      this.setState({
        cards: this.state.cards.filter((element) => !(element._id === card._id))
      })
    })
    .catch(err => { 
      console.log(err)
    })
  }

  handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);

    isLiked ?
    api.removeLike(card._id)
    .then((newCard) => {
      this.setState({
        cards: this.state.cards.map((c) => (c._id === card._id) ? newCard : c)
      })
    })
    .catch(err => { 
      console.log(err)
    }) :
    api.setLike(card._id)
    .then((newCard) => {
      this.setState({
        cards: this.state.cards.map((c) => c._id === card._id ? newCard : c)
      })
    })
    .catch(err => { 
      console.log(err)
    })
  }

  handleSetUserData = serverData => {
    this.setState({
      currentUser: {
        name: serverData.name,
        about: serverData.about,
        avatar: serverData.avatar,
        _id: serverData._id,
      }
    })
  }

  componentDidMount() {
    api.getUserInfo()
    .then(userData => {
      this.handleSetUserData(userData)
    })
    .catch(err => { 
      console.log(err)
    })
    api.getCards()
    .then(_ => {
      this.setState({
        cards: _
      })
    })
    .catch(err => { 
      console.log(err)
    })
    this.tokenCheck()
  }

  handleAddPlaceSubmit = newCardData => {
    api.postNewCard(newCardData)
    .then(newCard => {
      this.setState({
        cards: [newCard, ...this.state.cards]
      })
      this.closeAllPopups()
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  handleUpdateUser = newUserData => {
    api.editUserInfo(newUserData)
    .then(userData => {
      this.handleSetUserData(userData)
      this.closeAllPopups()
    })
    .catch(err => { 
      console.log(err)
    })
  }

  handleUpdateAvatar = newUserData => {
    api.changeAvatar(newUserData)
    .then(userData => {
      this.handleSetUserData(userData)
      this.closeAllPopups()
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true
    });
  }

  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true
    });
  }
  
  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true
    });
  }

  handleCardClick = _ => {
    this.setState({
      selectedCard: {
        link: _.link,
        name: _.name,
        isOpen: true
      }
    });
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isInfoTooltipOpen: false,
      selectedCard: {isOpen: false}
    })
  }

  handleRegister = data => {
    auth.register(data.email, data.password)
    .then((res) => {
      if (res) {
        localStorage.setItem('token', res.data._id)
        this.setState({
          authorizationSuccess: true,
          isInfoTooltipOpen: true
        })
        this.props.history.push('/sign-in')
      } else {
        this.setState({
          authorizationSuccess: false,
          isInfoTooltipOpen: true
        })
      }
    })
    .catch(err => { 
      console.log(err)
    })
  }

  tokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      if (jwt){
        auth.getContent(jwt).then((res) => {
          if (res){
            this.setState({
              email: res.data.email,
              loggedIn: true,
            }, () => {
              this.props.history.push("/");
            });
          }
        });
      }
    } 
  }

  handleLogin = data => {
    this.setState({
      authorizationData: {
        email: data.email,
        _id: data._id
      }
    })
    auth.authorize(data.email, data.password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token)
        this.setState({
          loggedIn: true,
        })
        this.props.history.push('/')
      }
    })
    .catch(err => { 
      console.log(err)
    })
  }
  
  handleLogout = () => {
    this.setState({
      loggedIn: false,
      email: ''
    })
    localStorage.removeItem('jwt')
  }
  
  render() {
    return (
      <div className="page">
        <CurrentUserContext.Provider value={this.state.currentUser}>

          <Header
            email={this.state.email}
            onLoginClick={this.handleLogin}
            onLogoutClick={this.handleLogout}
          />
          <Switch>
            <ProtectedRoute
              loggedIn={this.state.loggedIn}
              path="/" exact>
              <Main 
                onEditProfile={this.handleEditProfileClick}
                onAddPlace={this.handleAddPlaceClick}
                onEditAvatar={this.handleEditAvatarClick}
                onCardClick={this.handleCardClick}
                onCardLike={this.handleCardLike}
                onCardDelete={this.handleCardDelete}
                cards={this.state.cards}
              />

              <Footer />

              <AddPlacePopup
                name={'add-place'}
                title={'Новое место'}
                buttonText={'Создать'}
                onClose={this.closeAllPopups}
                isOpen={this.state.isAddPlacePopupOpen}
                onAddPlace={this.handleAddPlaceSubmit}
              />

              <EditProfilePopup
                name={'edit-profile'}
                title={'Редактировать профиль'}
                buttonText={'Сохранить'}
                isOpen={this.state.isEditProfilePopupOpen}
                onClose={this.closeAllPopups}
                onUpdateUser={this.handleUpdateUser}
              />

              <EditAvatarPopup
                name={'change-avatar'}
                title={'Обновить аватар'}
                buttonText={'Сохранить'}
                onClose={this.closeAllPopups}
                isOpen={this.state.isEditAvatarPopupOpen}
                onUpdateAvatar={this.handleUpdateAvatar}
              />

              <PopupWithForm
                name={'card-delete-confirm'}
                title={'Вы уверены?'}
                buttonText={'Да'}
              >
              </PopupWithForm>

              <ImagePopup
                card={this.state.selectedCard}
                onClose={this.closeAllPopups}
              />

            </ProtectedRoute>
            <Route path="/sign-up">
              <Register
                onRegister={this.handleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onLogin={this.handleLogin}
              />
            </Route>
            <Route exact path="/">
              {this.state.loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
              <InfoTooltip
                isOpen={this.state.isInfoTooltipOpen}
                onClose={this.closeAllPopups}
                authorizationSuccess={this.state.authorizationSuccess}
              />
        </CurrentUserContext.Provider>
      </div>    
    );
  }
}

export default withRouter(App)