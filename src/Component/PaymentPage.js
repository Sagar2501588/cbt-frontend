// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function PaymentPage() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const handlePaymentSuccess = async () => {
//     const studentId = localStorage.getItem("student_id");

//     const res = await fetch("http://127.0.0.1:8000/buy-course", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         student_id: studentId,
//         course_slug: slug,
//       }),
//     });

//     const data = await res.json();

//     if (data.status === "success") {
//       alert("Payment Successful!");
//       navigate("/video-lecture");
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Payment Page</h2>
//       <button onClick={handlePaymentSuccess}>
//         Simulate Payment Success
//       </button>
//     </div>
//   );
// }

// export default PaymentPage;


import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function PaymentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

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

    // 1️⃣ Load Razorpay
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      // 2️⃣ Create Order from backend
      const orderRes = await fetch("http://127.0.0.1:8000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          course_slug: slug,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.order_id) {
        alert("Order creation failed");
        return;
      }

      // 3️⃣ Razorpay options
      const options = {
        key: orderData.key, // 🔥 from backend
        amount: orderData.amount * 100,
        currency: "INR",
        name: "Geomatics Galaxy",
        description: "Course Purchase",
        order_id: orderData.order_id,

        // ✅ Payment success handler
        handler: async function (response) {
          const verifyRes = await fetch(
            "http://127.0.0.1:8000/verify-payment",
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
            navigate("/video-lecture");
          } else {
            alert("Payment verification failed ❌");
          }
        },

        // ❌ Payment failed
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },

        // ✅ Prefill (optional)
        prefill: {
          name: localStorage.getItem("student_name") || "",
        },

        theme: {
          color: "#3399cc",
        },
      };

      // 4️⃣ Open Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Complete Your Payment</h2>

      <button
        onClick={handlePayment}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          background: "#3399cc",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default PaymentPage;