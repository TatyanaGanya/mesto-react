import "./../pages/index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexs/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [imagePopup, setImagePopup] = useState(false);
  const [cardDelete, setCardDelete] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const setIsEditCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false); //zoom
    setCardDelete(false);
  }, []);

  // esc (i dont now)
  const handleCloseEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setIsEditCloseAllPopups();
      }
    },
    [setIsEditCloseAllPopups]
  );

  const closeAllPopups = useCallback(() => {
    setIsEditCloseAllPopups();
    document.removeEventListener("keydown", handleCloseEsc);
  }, [setIsEditCloseAllPopups, handleCloseEsc]);

  //esc
  function setEvenListnersForDocument() {
    document.addEventListener("keydown", handleCloseEsc);
  }

  //////////////////////////////////////////
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEvenListnersForDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEvenListnersForDocument();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEvenListnersForDocument();
  }

  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId);
    setCardDelete(true); //delete
    setEvenListnersForDocument();
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
    setEvenListnersForDocument();
  }

  useEffect(() => {
    //получить масив и получить данные
    Promise.all([api.getInitialInfo(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser);
        setCards(dataCard);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleCardDelete(evt) {
    evt.preventDefault();
    api
      .deleteCard(deleteCardId)
      .then((res) => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //adeddddd!!!!
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => alert(error.message));
    } else {
      api
        .addLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => alert(error.message));
    }
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleUpdateAvatar(dataUser, reset) {
    api
      .setUserAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleUpdateAdd(dataCard, reset) {
    api
      .addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleDeleteClick}
          onClose={closeAllPopups}
          cards={cards}
          onCardLike={handleCardLike}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleUpdateAdd}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={cardDelete}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        ></PopupWithForm>

        <ImagePopup
          isOpen={imagePopup}
          onClose={closeAllPopups}
          card={selectedCard}
        ></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
