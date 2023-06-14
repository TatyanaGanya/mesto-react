function Card({ card, onCardClick }) {
  return (
    <li className="card">
      <article className="card__item">
        <img
          className="card__image"
          alt={card.name}
          src={card.link}
          onClick={() => onCardClick({ link: card.link, name: card.name })}
        />
        <h2 className="card__text">{card.name}</h2>
        <button type="button" className="card__like">
          <p className="card__count">{card.likes.length}</p>
        </button>
        <button className="card__delete"></button>
      </article>
    </li>
  );
}

export default Card;
