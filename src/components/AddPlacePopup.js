import React, { useState, useCallback, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {

  const [formValues, setFormValues] = useState({
    name: '',
    link: ''
  })

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }))
  }, [setFormValues])
  
  const { name, link } = formValues;
  
  useEffect(() => {
    if (props.isOpen) {
      setFormValues({
        name: '',
        link: ''
      })
    }
  }, [props.isOpen])

  function handleSubmit(event) {
    event.preventDefault()

    props.onAddPlace({ name, link })
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
            id="place-title-input"
            className="popup__input-field"
            required
            type="text"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30" />
          <span className="popup__input-error place-title-input-error"></span>
        </label>
        <label className="popup__form-field">
          <input
            value={link || ''}
            onChange={handleChange}
            id="place-link-input"
            className="popup__input-field"
            required
            type="url"
            name="link"
            placeholder="Ссылка на картинку" />
          <span className="popup__input-error place-link-input-error"></span>
        </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;