import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files (JS, CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'dist'), { index: false }));

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  try {
    const htmlPath = path.join(__dirname, 'dist', 'index.html');
    res.sendFile(htmlPath);
  } catch (error) {
    console.error('Error serving HTML:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

