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

export const sendIssueAssignedEmail = async ({
  email,
  issueId,
  title,
}) => {
  await transporter.sendMail({
    from: `"Public Issue Reporting Portal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your issue has been assigned",
    text: `
Your issue has been assigned to a Municipal Officer.

Issue ID: ${issueId}
Title: ${title}

You can track your issue through the Public Issue Reporting Portal.
    `,
  });

  console.log(`Issue assigned email sent to ${email}`);
};


export const sendIssueStatusEmail = async ({
  email,
  issueId,
  title,
  status,
  remark,
}) => {
  await transporter.sendMail({
    from: `"Public Issue Reporting Portal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your issue is ${status}`,
    text: `
Your issue status has been updated.

Issue ID: ${issueId}
Title: ${title}
Status: ${status}

${remark ? `Officer remark: ${remark}` : ""}

You can track your issue through the Public Issue Reporting Portal.
    `,
  });

  console.log(
    `Issue ${status} email sent to ${email}`
  );
};

export const sendNewIssueOfficerEmail = async ({
  citizenName,
  citizenEmail,
  issueId,
  title,
  village,
  address,
}) => {
  await transporter.sendMail({
    from: `"Public Issue Reporting Portal" <${process.env.EMAIL_USER}>`,
    to: process.env.OFFICER_EMAIL,
    subject: `New Issue Created - Issue #${issueId}`,
    text: `
Hello Officer,

A new issue has been submitted by a citizen.

Citizen Name: ${citizenName}
Citizen Email: ${citizenEmail}

Issue ID: ${issueId}
Title: ${title}
Village: ${village || "N/A"}
Address: ${address || "N/A"}

Please review the issue from the officer dashboard.

Public Issue Reporting Portal
    `,
  });

  console.log(
    `New issue email sent to officer: ${process.env.OFFICER_EMAIL}`
  );
};