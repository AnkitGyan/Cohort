import "tailwindcss";


const Button = ({ disabled, children, onClick }) => {
  return (
    <span
      onClick={!disabled ? onClick : undefined}
      className={`text-white text-center text-4xl px-25 py-2 rounded cursor-pointer ${
        disabled ? "bg-blue-200" : "bg-blue-400"
      } rounded-2xl`}
    >
      {children}

    </span>
  );
};

export default Button;
