import { useEffect, useState } from "react";
import axios from "axios";
import "./VerifyOtp.css";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(45);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join("");
    try {
      const res = await axios.post("http://localhost:5000/api/otp/verify-otp", {
        email,
        otp: enteredOtp
      });
      alert(res.data.message);
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="otp-outer">
      <div className="otp-card">
        <div className="otp-icon">
          <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="email" />
        </div>
        <h2>Verify Your Email</h2>
        <p>Enter the 6-digit code sent to your email</p>
        <div className="otp-inputs">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
            />
          ))}
        </div>
        <button onClick={verifyOtp}>Verify Email</button>
        <p className="otp-timer">Resend code in 0:{timeLeft.toString().padStart(2, "0")}</p>
        <a href="/" className="otp-change-email">Change email address</a>
      </div>
    </div>
  );
}
