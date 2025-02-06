'use server';

import { ReferralStatusEmailProps } from '../types';
import { referralStatusEmailMessage } from '../utils';
import client from '@sendgrid/mail';
client.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendReferralStatusEmail = async (
  emailData: ReferralStatusEmailProps
) => {
  try {
    console.log('Sending Referral Status Email 🚀🚀');
    const {
      userFirstName,
      referralFirstName,
      referralLastName,
      userEmail,
      oldStatus,
      newStatus,
      subject,
    } = emailData;
    const message = referralStatusEmailMessage({
      userFirstName,
      referralFirstName,
      referralLastName,
      oldStatus,
      newStatus,
    });
    const emailMessage = {
      to: userEmail,
      bcc: process.env.SENDER_EMAIL,
      from: process.env.SENDER_EMAIL as string,
      subject,
      html: message,
    };
    await client.send(emailMessage);
    console.log('Email Sent 🚀🚀');
  } catch (error: any) {
    console.error('Error sending email to user');
    throw new Error(error.message);
  }
};
