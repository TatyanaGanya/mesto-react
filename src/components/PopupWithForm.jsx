function PopupWithForm({name,title,titleButton,isOpen, onClose, children }) {
    return (
    <div className={`popup popup_${name} ${isOpen && 'popup_open'}`}>
        <div className="popup__container">
            <h2 className="popup__title">{title}</h2>
            <form className="popup__content" name={`${name}_form`} method="get" noValidate=''>
                {children}
                <button className="popup__save" type="submit" >{titleButton}</button>
            </form>
            <button type="button" className="popup__close" onClick={onClose}></button>
        </div>


    
    </div>
    )}

export default PopupWithForm