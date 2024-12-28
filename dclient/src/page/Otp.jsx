import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import './otp.css'
const Otp = () => {
    const location = new URLSearchParams(window.location.search);
    const type = location.get("type");
    const email = location.get("email");
    const expireTime = location.get("expireTime");

    const [formData, setFormData] = useState({
        otp: "", // 6-digit OTP
        type: type,
        email: email,
    });
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.otp || formData.otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:7000/api/v1/verify_email",
                formData
            );
            console.log(response);
            toast.success(response.data.message || "OTP verified successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to verify OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (timer > 0) {
            toast.error(`Please wait ${timer} seconds to resend OTP.`);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:7000/api/v1/resend_Otp",
                { email, type }
            );
            toast.success(response.data.message || "OTP sent successfully!");
            setTimer(120); // 2-minute timer
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="otp-container d-flex justify-content-center align-items-center vh-100">
            <div className="otp-card shadow-lg p-4 rounded">
                <h2 className="text-center mb-4">Enter OTP</h2>
                <p className="text-muted text-center mb-4">
                    We have sent a 6-digit OTP to <strong>{email}</strong>
                </p>
                <form>
                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label">
                            OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            className="form-control"
                            maxLength="6"
                            placeholder="Enter OTP"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        className="btn btn-link text-decoration-none"
                        onClick={handleResendOtp}
                        disabled={timer > 0 || loading}
                    >
                        {timer > 0
                            ? `Resend OTP in ${timer}s`
                            : "Didn't receive the OTP? Resend"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Otp;
