import api from './../utils/api.js'
import Cards from './Cards.jsx'
import { useEffect, useState } from 'react';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    
    const[userName, setUserName] =useState('')
    const[userDescription, setUserDescription] =useState('')
    const[userAvatar, setUserAvatar] =useState('')
    const[cards, setCards] =useState([])

    useEffect(() => {
       //получить масив и получить данные
        Promise.all([api.getInitialInfo(), api.getInitialCards()])
            .then(([dataUser, dataCard]) => {
                dataCard.forEach(element => element.myid = dataUser._id);
                setUserName(dataUser.name)
                setUserDescription(dataUser.about)
                setUserAvatar(dataUser.avatar)
                setCards(dataCard)
                
            });
        }, [])

    return (
        <main className="main">
        <section className="profile">
            <button type="button" className="profile__change"  onClick={onEditAvatar}>
                <img className="profile__avatar" src={userAvatar} alt="аватар" /></button>
            <div className="profile__info">
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__edit" type="button" onClick={onEditProfile}></button>
                <p className="profile__about">{userDescription}</p>
            </div>
            <button className="profile__add" type="button" onClick={onAddPlace}></button>
        </section>
        
        <section className="foto" aria-label="фотогалерея">
            <ul className="cards">
              {cards.map((card) =>     
                  <Cards card={card} key={card._id}  onCardClick={onCardClick} />
              )}
            </ul>
        </section>
    </main>
    )}

export default Main;