import { useRef, useState, useEffect } from "react";
import Button from "./Button";

const Otp = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const [message, setMessage] = useState("");

  // Enable button only when all 6 values are filled
  useEffect(() => {
    setDisable(otp.some((digit) => digit === ""));
  }, [otp]);

  const handleChange = (e, index, refNext) => {
    const value = e.target.value;

    if (!/^[0-9a-zA-Z]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && refNext) {
      refNext.current.focus();
    }
  };

  const handleBackspace = (e, index, refPrev) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);

      if (refPrev && otp[index] === "") {
        refPrev.current.focus();
      }
    }
  };

  const handleSubmit = () => {
    const fullOtp = otp.join(""); 
    // Dummy verification logic
    if (fullOtp === "123456") {
      setMessage("✅ OTP Verified Successfully!");
    } else {
      setMessage("❌ Invalid OTP. Please try again.");
    }

  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="flex justify-center">
        <SubBox refCurr={ref1} onChange={(e) => handleChange(e, 0, ref2)} onKeyDown={(e) => handleBackspace(e, 0, null)} value={otp[0]} />
        <SubBox refCurr={ref2} onChange={(e) => handleChange(e, 1, ref3)} onKeyDown={(e) => handleBackspace(e, 1, ref1)} value={otp[1]} />
        <SubBox refCurr={ref3} onChange={(e) => handleChange(e, 2, ref4)} onKeyDown={(e) => handleBackspace(e, 2, ref2)} value={otp[2]} />
        <SubBox refCurr={ref4} onChange={(e) => handleChange(e, 3, ref5)} onKeyDown={(e) => handleBackspace(e, 3, ref3)} value={otp[3]} />
        <SubBox refCurr={ref5} onChange={(e) => handleChange(e, 4, ref6)} onKeyDown={(e) => handleBackspace(e, 4, ref4)} value={otp[4]} />
        <SubBox refCurr={ref6} onChange={(e) => handleChange(e, 5, null)} onKeyDown={(e) => handleBackspace(e, 5, ref5)} value={otp[5]} />
      </div>

      <Button disabled={disable} onClick={handleSubmit}>
        Submit
      </Button>

      {message && <p className="text-lg mt-2">{message}</p>}
    </div>
  );
};

function SubBox({ refCurr, onChange, onKeyDown, value }) {
  return (
    <input
      ref={refCurr}
      type="text"
      maxLength={1}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="w-[40px] h-[40px] rounded-xl text-white text-center m-1 bg-blue-500 outline-none text-xl"
    />
  );
}

export default Otp;
