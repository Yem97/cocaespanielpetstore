import { Resend } from 'resend';
import { Inquiry } from '../types';

// Initialize only if key exists so the file doesn't crash on build if missing
const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendInquiryNotification(inquiry: Inquiry) {
  if (!resend) {
    console.warn("RESEND_API_KEY not found. Skipping notification email.");
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pawsandheritage.com';

  const html = `
    <h2>New Inquiry Received</h2>
    <p><strong>Name:</strong> ${inquiry.full_name}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>WhatsApp:</strong> ${inquiry.whatsapp}</p>
    <p><strong>Country:</strong> ${inquiry.country}</p>
    <p><strong>Breed Interest:</strong> ${inquiry.breed_interest}</p>
    ${inquiry.pet_name ? `<p><strong>Specific Pet:</strong> ${inquiry.pet_name}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${inquiry.message}</p>
  `;

  return resend.emails.send({
    from: 'Paws & Heritage <onboarding@resend.dev>', // Should use verified domain in production
    to: adminEmail,
    subject: `New Inquiry from ${inquiry.full_name} (${inquiry.country})`,
    html,
  });
}

export async function sendInquiryConfirmation(inquiry: Inquiry) {
  if (!resend) {
    console.warn("RESEND_API_KEY not found. Skipping confirmation email.");
    return;
  }

  const html = `
    <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #B8860B;">Welcome to Paws & Heritage</h2>
      <p>Dear ${inquiry.full_name},</p>
      <p>Thank you for reaching out to us regarding your interest in our ${inquiry.breed_interest === 'Both' ? 'Maine Coons and Cocker Spaniels' : inquiry.breed_interest + 's'}. We have successfully received your inquiry.</p>
      <p>We review every application carefully to ensure our pets find the perfect homes. One of our team members will review your details and get back to you within 24-48 hours.</p>
      <p>If you have any urgent questions, feel free to reply to this email.</p>
      <br />
      <p>Warm regards,</p>
      <p><strong>The Paws & Heritage Team</strong></p>
    </div>
  `;

  return resend.emails.send({
    from: 'Paws & Heritage <onboarding@resend.dev>', // Should use verified domain in production
    to: inquiry.email,
    subject: 'We received your inquiry - Paws & Heritage',
    html,
  });
}
