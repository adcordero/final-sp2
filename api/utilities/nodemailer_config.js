import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP credentials 
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
        user: process.env.NM_EMAIL_ADD || "kcarteu3@gmail.com",
        pass: process.env.NM_PASS || "zehjxdabohuygrra",
    },
})

export const sendEmailConfirmation = (first_name, last_name, email, confirm_code) => {
    // console.log(first_name, last_name, email, confirm_code)
    // console.log("Send email confirmation");

    transport.sendMail({
        from: process.env.NM_EMAIL_ADD || "kcarteu3@gmail.com",
        to: email,
        subject: "UPA Email Confirmation",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${first_name} ${last_name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=https://upa-sp2.onrender.com/verification/${confirm_code}> Click here</a>`
    }).catch(err => console.log(err));

    // <a href=http://localhost:5173/verification/${confirm_code}> Click here</a>

    // console.log("Done")
}

export const sendRentBillCreation = (first_name, last_name, email, bill_type) => {
    transport.sendMail({
        from: process.env.NM_EMAIL_ADD || "kcarteu3@gmail.com",
        to: email,
        subject: "UPA Rent Bill Creation",
        html: `<h1>Rent Bill Creation</h1>
        <h2>Hello ${first_name} ${last_name}</h2>
        <p>${bill_type} Bill for this month has been created. To pay, please login at UPA.</p>
        <a href=https://upa-sp2.onrender.com> Click here</a>`
    });
}

export const sendTenantProofSent = (email, bill_type) => {
    transport.sendMail({
        from: process.env.NM_EMAIL_ADD || "kcarteu3@gmail.com",
        to: email,
        subject: "Bill Proof Sent",
        html: `<h1>Tenant Proof Sent</h1>
        <p>Tenant has uploaded ${bill_type} Bill receipt for this month. To check, please login at UPA.</p>
        <a href=https://upa-sp2.onrender.com> Click here</a>`
    });
}

export const sendOwnerProofReceived = (email, bill_type) => {
    transport.sendMail({
        from: process.env.NM_EMAIL_ADD || "kcarteu3@gmail.com",
        to: email,
        subject: "Bill Acknowledgement",
        html: `<h1>Bill Acknowledgement</h1>
        <p>Owner has acknowledge ${bill_type} Bill receipt for this month. To check, please login at UPA.</p>
        <a href=https://upa-sp2.onrender.com> Click here</a>`
    });
}

export const sendFeedbackCreation = (email) => {
    transport.sendMail({
        from: process.env.NM_EMAIL_ADD || "kcarteu3@gmail.com",
        to: email,
        subject: "UPA Feedback Creation",
        html: `<h1>Feedback Creation</h1>
        <p>Tenant sent a feedback. To pay, please login at UPA.</p>
        <a href=https://upa-sp2.onrender.com> Click here</a>`
    });
}

export const sendFeedbackReply = (email) => {
    transport.sendMail({
        from: process.env.NM_EMAIL_ADD || "kcarteu3@gmail.com",
        to: email,
        subject: "UPA Feedback Replied",
        html: `<h1>Feedback Replied</h1>
        <p>Owner replied to a feedback you sent. To pay, please login at UPA.</p>
        <a href=https://upa-sp2.onrender.com> Click here</a>`
    });
}
