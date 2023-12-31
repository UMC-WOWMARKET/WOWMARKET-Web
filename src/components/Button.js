const Button = ({ text, type, onClick }) => {
  const btntype = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["Button", `Button_${btntype}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "default",
};

export default Button;
