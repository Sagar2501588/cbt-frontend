import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PaymentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const BASE_URL = "https://cbt-backend-production-a2f9.up.railway.app";

  // ✅ Fetch course price (UI purpose)
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `https://cbt-backend-production-a2f9.up.railway.app/course-details/${slug}`
        );
        const data = await res.json();

        // 🔥 TEMP (until backend returns price)
        setPrice(data.price);
      } catch (err) {
        console.error("Course fetch error:", err);
      }
    };

    fetchCourse();
  }, [slug]);

  // ✅ Load Razorpay SDK
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Handle Payment
  const handlePayment = async () => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const orderRes = await fetch("https://cbt-backend-production-a2f9.up.railway.app/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          course_slug: slug,
        }),
      });

      const orderData = await orderRes.json();
      console.log(orderData);

      if (!orderData.order_id) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount, // ✅ FIXED (no *100)
        currency: "INR",
        name: "Geomatics Galaxy",
        description: "Course Purchase",
        order_id: orderData.order_id,

        handler: async function (response) {
          const verifyRes = await fetch(
            "https://cbt-backend-production-a2f9.up.railway.app/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                student_id: studentId,
                course_slug: slug,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.status === "success") {
            alert("Payment Successful 🎉");
            // 
            window.location.href = "/video-lecture";
          } else {
            alert("Payment verification failed ❌");
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },

        prefill: {
          name: localStorage.getItem("student_name") || "",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        minHeight: "100vh",
        background: "#eff4e9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#0f172a" }}>
          Complete Your Payment
        </h2>

        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Secure payment via Razorpay
        </p>

        <div
          style={{
            background: "#f1f5f9",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>Course</p>
          <p style={{ margin: "5px 0", color: "#334155" }}>{slug}</p>

          <p
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            ₹{price}
          </p>
        </div>

        <button
          onClick={handlePayment}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            marginTop: "20px",
            background: "linear-gradient(135deg, #3399cc, #2563eb)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          🔒 Pay Securely
        </button>

        <p style={{ marginTop: "12px", fontSize: "12px", color: "#94a3b8" }}>
          100% secure • No hidden charges
        </p>
      </div>
    </div>
  );
}

export default PaymentPage;