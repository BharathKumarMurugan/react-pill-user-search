interface PillProps {
  imgSrc: string;
  name: string;
  clickHandler: () => void;
}

const Pill: React.FC<PillProps> = ({ imgSrc, name, clickHandler }) => {
  return (
    <div className="user-pill" onClick={clickHandler}>
      <img src={imgSrc} alt={name} />
      <span>{name}</span>
      <button className="btn-close" onClick={clickHandler}>
        &times;
      </button>
    </div>
  );
};

export default Pill;
