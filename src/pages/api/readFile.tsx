import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const filePath = path.join(process.cwd(), 'src', 'utils', 'privateKey.txt');
  console.log('Chemin du fichier :', filePath);
  req
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.status(200).json({ content: fileContent });
  } catch (err) {
    console.error('Erreur lors de la lecture du fichier :', err);
    res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
  }
}
