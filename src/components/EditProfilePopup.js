import React, { useState, useCallback, useEffect, useContext } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  
  const currentUser = useContext(CurrentUserContext)
  
  const [formValues, setFormValues] = useState({
    name: '',
    description: ''
  })

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }))
  }, [setFormValues])
  
  const { name, description } = formValues;

  useEffect(() => {
    if (!props.isOpen || 'undefined' || '') {
      setFormValues({
        name: currentUser.name,
        description: currentUser.about
      })
    }
  }, [props.isOpen])
  
  function handleSubmit(event) {
    event.preventDefault()
    
    props.onUpdateUser({
      name,
      about: description
    }) 
  }
    
    return (
      <PopupWithForm
        name={props.name}
        title={props.title}
        buttonText={props.buttonText}
        onClose={props.onClose}
        isOpen={props.isOpen}
        onSubmit={handleSubmit}>
        <label className="popup__form-field">
          <input
            value={name || ''}
            onChange={handleChange}
            name="name"
            id="username-input"
            className="popup__input-field"
            required
            type="text"
            placeholder="Имя пользователя"
            minLength="2"
            maxLength="40" />
          <span className="popup__input-error username-input-error"></span>
        </label>
        <label className="popup__form-field">
          <input
            value={description || ''}
            onChange={handleChange}
            name="description"
            id="job-input"
            className="popup__input-field"
            required
            type="text"
            placeholder="О себе"
            minLength="2"
            maxLength="200" />
          <span className="popup__input-error job-input-error"></span>
        </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup