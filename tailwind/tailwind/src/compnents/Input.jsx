const Input = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="text-black text-center text-xl px-10 py-3 rounded-2xl bg-blue-200"
    />
  );
};

export default Input;
