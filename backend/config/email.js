import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const env = (key, fallback = '') => String(process.env[key] ?? fallback).trim();

const smtpHost = env('SMTP_HOST');
const useSmtp = Boolean(smtpHost);
const allowNoAuth = env('SMTP_ALLOW_NO_AUTH', 'false').toLowerCase() === 'true';
const smtpUser = env('SMTP_USER') || env('EMAIL_USER');
const smtpPass = env('SMTP_PASS') || env('EMAIL_PASS');
const adminEmail = env('ADMIN_EMAIL');

// Prefer explicit SMTP configuration if provided; otherwise default to Gmail service
const transporter = nodemailer.createTransport(
  useSmtp
    ? {
        host: smtpHost,
        port: Number(env('SMTP_PORT', '587')),
        secure: env('SMTP_SECURE', 'false').toLowerCase() === 'true',
        ...(allowNoAuth ? {} : {
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        }),
        // Add timeout settings
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 5000,    // 5 seconds
        socketTimeout: 20000,     // 20 seconds
      }
    : {
        service: 'gmail',
        auth: {
          user: env('EMAIL_USER'),
          pass: env('EMAIL_PASS'),
        },
        // Add timeout settings for Gmail
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 5000,    // 5 seconds
        socketTimeout: 20000,     // 20 seconds
      }
);

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export const isEmailConfigured = () => {
  const hasGmailConfig = !useSmtp && !!(env('EMAIL_USER') && env('EMAIL_PASS'));
  const hasSmtpConfig = !!(
    smtpHost &&
    (allowNoAuth || (smtpUser && smtpPass))
  );
  return hasGmailConfig || hasSmtpConfig;
};

export const sendContactEmail = async (name, email, subject, message) => {
  if (!isEmailConfigured()) {
    throw new Error('Email is not configured. Set EMAIL_USER/EMAIL_PASS or SMTP_ env vars.');
  }

  const fromAddress = smtpUser || env('EMAIL_USER') || adminEmail || 'no-reply@portfolio.local';

  const mailOptions = {
    from: fromAddress,
    to: adminEmail || fromAddress,
    replyTo: email, // so admin can reply directly to the sender
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin: 10px 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Message:</h3>
          <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #888; font-size: 12px;">
          <p>This email was sent from your portfolio contact form.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

// Send confirmation email to user who submitted the contact form
export const sendConfirmationEmail = async (userName, userEmail, subject, adminName = 'Rishu Kumar Sinha') => {
  if (!isEmailConfigured()) {
    throw new Error('Email is not configured. Set EMAIL_USER/EMAIL_PASS or SMTP_ env vars.');
  }

  const fromAddress = smtpUser || env('EMAIL_USER') || adminEmail || 'no-reply@portfolio.local';
  const supportEmail = adminEmail || fromAddress;

  const mailOptions = {
    from: `"${adminName}" <${fromAddress}>`,
    to: userEmail,
    replyTo: supportEmail,
    subject: `Thank you for contacting ${adminName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Thank You!</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi ${userName},
          </p>
          
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to me through my portfolio contact form. I've successfully received your message regarding "<strong>${escapeHtml(subject)}</strong>".
          </p>
          
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            I appreciate you taking the time to contact me, and I'll make sure to get back to you as soon as possible. I typically respond within 24-48 hours.
          </p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #667eea;">
            <p style="color: #333; font-size: 14px; margin: 0; font-weight: 600;">What happens next?</p>
            <ul style="color: #555; font-size: 14px; line-height: 1.8; margin: 10px 0 0 20px; padding: 0;">
              <li>I've received your message and saved it</li>
              <li>I'll review it and prepare a thoughtful response</li>
              <li>You'll hear back from me soon!</li>
            </ul>
          </div>
          
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 10px;">
            If you have any urgent matters, feel free to reach out directly at:
          </p>
          
          <div style="margin: 20px 0;">
            <p style="color: #667eea; font-size: 14px; margin: 5px 0;">
              📧 Email: <a href="mailto:${supportEmail}" style="color: #667eea; text-decoration: none;">${supportEmail}</a>
            </p>
            <p style="color: #667eea; font-size: 14px; margin: 5px 0;">
              📱 Phone: <a href="tel:+917644031967" style="color: #667eea; text-decoration: none;">+91 7644031967</a>
            </p>
          </div>
          
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin-top: 30px;">
            Best regards,<br>
            <strong style="color: #333;">${adminName}</strong><br>
            <span style="color: #888; font-size: 13px;">Full-Stack Developer</span>
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
          <p style="margin: 0;">
            This is an automated confirmation email. Please do not reply to this message.
          </p>
          <p style="margin: 10px 0 0 0;">
            If you need to send an additional message, please use the contact form on my portfolio.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Confirmation email error:', error);
    throw error;
  }
};

export default transporter;
