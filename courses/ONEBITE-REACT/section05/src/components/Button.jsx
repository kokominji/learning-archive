const Button = (props) => {
  console.log(props);
  return (
    <button style={{ color: props.color }}>
      {props.text} - {props.color.toUpperCase()}
    </button>
  );
};

Button.defaultProps = {
  color: "black",
};

export default Button;
