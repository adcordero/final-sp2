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
        <a href=http://localhost:5173/verification/${confirm_code}> Click here</a>
        </div>`
    }).catch(err => console.log(err));

    // <a href=http://localhost:3000/api/user/confirm/${confirm_code}> Click here</a>

    // console.log("Done")
}