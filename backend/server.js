import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const PROMPT = `Extract ALL transactions from this bank statement. Return ONLY raw JSON:
{
  "transactions": [
    {
      "date": "YYYY-MM-DD",
      "description": "full text",
      "upi_ref": "number or null",
      "source": "name or null",
      "amount": 0.00,
      "type": "debit|credit",
      "balance": 0.00
    }
  ],
  "confidence": 0.95
}`;

app.post('/extract-transactions', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const fileData = fs.readFileSync(req.file.path);
    const base64 = fileData.toString('base64');

    const result = await model.generateContent([
      PROMPT,
      { inlineData: { data: base64, mimeType: req.file.mimetype } }
    ]);

    const text = result.response.text();
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);

    fs.unlinkSync(req.file.path);
    res.json(parsed);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/log-error', (req, res) => {
  console.error('[Frontend Error]', req.body);
  res.json({ status: 'logged' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
