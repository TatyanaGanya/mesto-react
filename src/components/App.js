import "./../pages/index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  //zoom
  const [selectedCard, setSelectedCard] = useState({});
  const [imagePopup, setImagePopup] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false); //zoom
  }

  return (
    <div className="">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
      />

      <Footer />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        titleButton="Сохранить"
      >
        <input
          className="popup__input popup__input_type_name"
          name="profileName"
          type="text"
          id="name"
          placeholder="Имя Фамилия"
          minLength="2"
          maxLength="40"
          required
        />
        <span id="name-error" className="popup__error"></span>

        <input
          className="popup__input popup__input_type_job"
          name="profileJob"
          type="text"
          id="job"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required
        />
        <span id="job-error" className="popup__error"></span>
      </PopupWithForm>

      <ImagePopup
        isOpen={imagePopup}
        onClose={closeAllPopups}
        card={selectedCard}
      ></ImagePopup>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        titleButton="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        {/* before form name "profileAvatar" */}
        <input
          className="popup__input popup__input_type_avatar"
          name="avatar"
          type="url"
          id="avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="avatar-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="galery"
        title="Новое место"
        titleButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        {/* before form name "profile_title" */}
        <input
          className="popup__input popup__input_type_title"
          name="title"
          type="text"
          id="title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span id="title-error" className="popup__error"></span>
        <input
          className="popup__input popup__input_type_image"
          name="image"
          type="url"
          id="image"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="image-error" className="popup__error"></span>
      </PopupWithForm>
      
    </div>
  );
}

export default App;
