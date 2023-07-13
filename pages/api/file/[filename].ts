import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import getCurrentUser from '../../../app/actions/getCurrentUser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
      return res.status(405).send('Método não permitido');
    }

    const { filename } = req.query;
    const filePath = path.join(process.cwd(), 'upload', filename as string);
    try {
      const file = fs.readFileSync(filePath);
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  
      res.send(file);
    } catch (error) {
      console.error('Error getting file:', error);
      res.status(500).end();
    }
  } else {
    res.status(405).send('Método não permitido');
  }
}
