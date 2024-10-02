import { transporter } from "@/lib/nodemailer";
import { renderEmailHtml } from "@/utils/renderEmailHtml";

export async function POST(req: Request) {
  try {
    const { email, name, message } = await req.json();

    const options = {
      from: email,
      to: "cheikhkanteye.contact@gmail.com",
      subject: `Message de ${name}`,
      html: await renderEmailHtml(email, name, message),
    };

    await transporter.sendMail(options);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, error: error }), {
      status: 500,
    });
  }
}
