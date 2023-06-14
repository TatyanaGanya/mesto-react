function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={`popup popup_zoom-image ${isOpen && "popup_open"}`}>
      <div className="popup__view-image">
        <img className="popup__image" alt={card.name} src={card.link} />
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__description">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
