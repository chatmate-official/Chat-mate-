import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const port = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const HUGGINGFACE_APK_URL = 'https://huggingface.co/chatmateofficial/chatmateapp/resolve/main/app-release.apk?download=true';

// Direct redirect to new Hugging Face app-release.apk download
app.get(['/ChatMate.apk', '/app-release.apk', '/api/download/app'], (req, res) => {
  const localApkPath = path.resolve(__dirname, 'public', 'app-release.apk');

  if (fs.existsSync(localApkPath) && fs.statSync(localApkPath).size > 200) {
    res.download(localApkPath, 'app-release.apk');
  } else {
    res.redirect(HUGGINGFACE_APK_URL);
  }
});

// AI endpoints
app.post('/api/ai/chat-reply', async (req, res) => {
  try {
    const { partnerName, partnerBio, userMessage } = req.body;
    const systemInstruction = `You are playing the role of ${partnerName || 'Alex'} on ChatMate. Bio: "${partnerBio}". Keep responses short and friendly.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage || 'Hey',
      config: { systemInstruction },
    });

    res.json({ reply: response.text || "Hey! Nice to connect with you!" });
  } catch (err) {
    res.json({ reply: "Hey there! How's your day going?" });
  }
});

app.post('/api/ai/icebreakers', async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: "Generate 4 fun conversation starters for dating chat.",
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });
    res.json({ icebreakers: JSON.parse(response.text || '[]') });
  } catch (err) {
    res.json({ icebreakers: ["What's your favorite travel destination?", "Coffee or Tea?"] });
  }
});

async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await (await import('fs')).readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        );
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.use(express.static(path.resolve(__dirname, 'public')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

setupServer();
