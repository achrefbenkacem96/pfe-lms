import { Resend } from "resend"
import nodemailer from "nodemailer"
 
const resend = new Resend(process.env.RESEND_API_KEY)
const appUrl = process.env.NEXT_PUBLIC_APP_URL
export const sendPasswordResetEmail = async (
  email: string,
  token: string,
)=> {
  const resetLink =`http://localhost:3000/auth/new-password?token=${token}` 
  let transporter =  nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: "ashrefbenkassem@gmail.com",
      pass: "yecp wong mksq suzy",
    },
  })
  // pass: "pknn-lbmx-arsb-jwse",
  
  transporter.sendMail(
  {
    from: "ashrefbenkassem@gmail.com",
    to: email,
    subject: `Reset your password`,
    html: `<p>Click <a href="${resetLink}">here </a> to reset password.</p>`,
    
  },
  (err, info) => {
    console.log(err)
    console.log("end function sendPassword authentification-controller");
    if (err) {
      console.log("error");
    }else {
        console.log("success");
    }
  }
  )
  
}
export const sendVerificationEmail = async (
  email: string,
  token: string,
  
) => {
 const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
 let transporter =  nodemailer.createTransport({
   service: "gmail",
   host: "smtp.gmail.com",
   port: 587,
   secure: true,
   auth: {
     user: "ashrefbenkassem@gmail.com",
     pass: "yecp wong mksq suzy",
   },
 })
 // pass: "pknn-lbmx-arsb-jwse",
 
 transporter.sendMail(
 {
   from: "ashrefbenkassem@gmail.com",
   to: email,
   subject: `Confirm your email`,
   html: `<p>Click <a href="${confirmLink}">here </a> to confirm email.</p>`,
   
 },
 (err, info) => {
   console.log(err)
   console.log("end function sendPassword authentification-controller");
   if (err) {
     console.log("error");
   }else {
       console.log("success");
   }
 }
 )
 
}
export const sendContactFormMessage = async (
  from: string,
  to: string,
  {
    email,
    message,
  }: {
    email: string
    message: string
  },
) => {
  let transporter =  nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: "ashrefbenkassem@gmail.com",
      pass: "yecp wong mksq suzy",
    },
  })
  // pass: "pknn-lbmx-arsb-jwse",
  
  transporter.sendMail(
  {
    from: from,
    to: to,
    subject: `${appUrl}: Contact request from ${email}`,
    html: message,
    
  },
  (err, info) => {
    console.log(err)
    console.log("end function sendPassword authentification-controller");
    if (err) {
      console.log("error");
    }else {
        console.log("success");
    }
  }
  )
 
}
