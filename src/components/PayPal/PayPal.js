import axios from 'axios';
import React from 'react';


function PayPal(props) {
    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
    const paypalRef = React.useRef();
    const [user] = React.useState(props.username);
    const [eventId] = React.useState(props.eventId);

    // To show PayPal buttons once the component loads
    React.useEffect(() => {
        if (user) {
            window.paypal
                .Buttons({
                    createOrder: () => {
                        return axios.post(`http://localhost:8080/api/paypal/payment/${eventId}`)
                            .then(res => {
                                console.log("Token received from backend: " + res.data.token);
                                return res.data.token;
                            });
                    },

                    onApprove: async (data, actions) => {
                        return axios.post(`http://localhost:8080/api/paypal/complete?paymentId=${data.paymentID}&payerId=${data.payerID}`)
                            .then(res => {
                                if (res.data.payment === "approved") {
                                    setPaid(true);
                                    console.log("Successful payment!");
                                } else {
                                    setError(error);
                                }
                            });
                    },

                    onError: (err) => {
                        console.error(err);
                    },
                })
                .render(paypalRef.current);
        }
    }, [eventId, user, error]);

    // Successfull payment
    if (paid) {
        return <div>
            <h5 className="text-success">Thank you! The payment was successful! </h5>
        </div>;
    }

    // If any error occurs
    if (error) {
        return <div>
            <h5 className="text-danger">Error Occurred in processing payment! Please try again! </h5>
        </div>;
    }

    // If user not logged in
    if (!user) {
        return <div>
            <h5 className="text-danger">Please log in before buy a ticket!</h5>
        </div>;
    }

    // Default Render - buttons
    return (
        <div>
            <div ref={paypalRef} />
        </div>
    );
}


export default PayPal;