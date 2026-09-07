import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendIssueCreatedEmail = async ({
  email,
  firstName,
  issueId,
  title,
}) => {
  await transporter.sendMail({
    from: `"Public Issue Reporting Portal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your issue has been submitted",
    text: `
Hello ${firstName || "Citizen"},

Your issue has been successfully submitted.

Issue ID: ${issueId}
Title: ${title}

You can track the progress of your issue through the Public Issue Reporting Portal.

Thank you.
    `,
  });

  console.log(`Issue created email sent to ${email}`);
};