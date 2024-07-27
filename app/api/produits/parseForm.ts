import formidable from "formidable";

async function parseForm(req: Request) {
  return new Promise<any>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req as never, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
}

export default parseForm;
