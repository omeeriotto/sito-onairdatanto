import { Resend } from "resend";

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Config Resend mancante: RESEND_API_KEY");
  }
  return new Resend(apiKey);
}

export const resendFrom =
  process.env.RESEND_FROM_EMAIL ||
  "Adriano Carlucci <info@adrianocarlucci.it>";

export const resendReplyTo =
  process.env.RESEND_REPLY_TO_EMAIL || "adriano.carlucci28@gmail.com";
