const { Resend } = require("resend");
const emailTemplate = require("./mailTemplate");

require("dotenv").config({ path: "../../.env" });

const resend = new Resend(process.env.RESEND_API_SECRET);

// wwelcome message
async function notify(email, username) {
  const { data, error } = await resend.emails.send({
    from: `support <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: "Welcome Message 🚀🚀🚀",
    html: emailTemplate(username),
  });

  if (error) {
    return console.error({ error });
  }
}

async function cancellation(email, username) {
  const { data, error } = await resend.emails.send({
    from: `support<${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: "Cancellation Message 🚀🚀🚀",
    html: `
          <p> I Hope we meet again ${username} 🥹 </p>
          `,
  });

  if (error) {
    return console.error({ error });
  }
}

module.exports = {
  notify,
  cancellation,
};
