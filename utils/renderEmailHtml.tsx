import Email from "@/emails";
import { render } from "@react-email/components";

export async function renderEmailHtml(
  email: string,
  name: string,
  message: string
) {
  return await render(<Email email={email} name={name} message={message} />);
}
