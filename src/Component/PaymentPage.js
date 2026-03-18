import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function PaymentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const handlePaymentSuccess = async () => {
    const studentId = localStorage.getItem("student_id");

    const res = await fetch("http://127.0.0.1:8000/buy-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        student_id: studentId,
        course_slug: slug,
      }),
    });

    const data = await res.json();

    if (data.status === "success") {
      alert("Payment Successful!");
      navigate("/video-lecture");
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Payment Page</h2>
      <button onClick={handlePaymentSuccess}>
        Simulate Payment Success
      </button>
    </div>
  );
}

export default PaymentPage;