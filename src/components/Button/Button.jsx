import './Button.css';

function Button({ theme, nameButton, onClick, type }) {
  return (
    <button type={type} className={`btn ${theme}`} onClick={onClick}>
      {nameButton}
    </button>
  );
}

export default Button;
