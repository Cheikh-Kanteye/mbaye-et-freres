import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function saveFileLocally(
  file: File,
  saveDir: string
): Promise<{ filePath: string; fileName: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      const ext = path.extname(file.name); // Obtenir l'extension du fichier
      const fileName = `${uuidv4()}${ext}`; // Générer un nom de fichier unique
      const filePath = path.join(saveDir, fileName);

      // Convertir le fichier en buffer et l'enregistrer localement
      await fs.promises.writeFile(
        filePath,
        Buffer.from(await file.arrayBuffer())
      );

      resolve({ filePath, fileName });
    } catch (error) {
      console.error("Error saving file locally:", error);
      reject(error);
    }
  });
}
