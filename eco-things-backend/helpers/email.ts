const sgMail = require('@sendgrid/mail');
const config = require('../config/config');
export class EmailHelper {
	sendEmail = async (mailOptions) => {
		sgMail.setApiKey(config.SENDGRID_API_KEY);
		const msg = {
			to: mailOptions.to,
			from: mailOptions.from,
			subject: mailOptions.subject,
			html: mailOptions.text
		};

		if (config.default.sendEmails) {
			await sgMail.send(msg);
		}

		return { success: true }
	}
}