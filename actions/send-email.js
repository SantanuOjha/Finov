
"use server";

import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  // Initialize the Resend instance with your API key
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  if (!to || !subject || !react) {
    console.error("Missing required parameters: to, subject, or react.");
    return { success: false, error: "Missing required parameters." };
  }

  try {
    // Use the Resend instance to send an email
    const data = await resend.emails.send({
      from: '<FINOVA@resend.dev>',
      to,
      subject,
      react,  // React email component if you're using one
    });

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : null,
    });
    return { success: false, error: error.message };
  }
}
