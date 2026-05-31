const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, 'public', 'images', 'cotizador');

// Asegurar que el directorio de salida existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const imagesToDownload = [
  { name: 'casa-nueva.jpg', url: 'https://i.ibb.co/4g4YVc36/Casa-Nueva-formulario.jpg' },
  { name: 'foto-quincho.png', url: 'https://i.ibb.co/ZzW4MZBW/Foto-quincho.png' },
  { name: 'tiny-house.webp', url: 'https://i.ibb.co/KpD3k2k7/b8effec28acd483c8ea82e4200c7e8e5.webp' },
  { name: 'casa-1-piso.png', url: 'https://i.ibb.co/Qv22wmyt/Casa-1-piso.png' },
  { name: 'casa-2-pisos.jpg', url: 'https://i.ibb.co/Xk3BFY2H/Casa-de-2-pisos.jpg' },
  { name: 'casa-3-pisos.png', url: 'https://i.ibb.co/Y75kLP3s/Casa-3-pisos.png' },
  { name: 'terraza-abierta.png', url: 'https://i.ibb.co/TxXy2tkB/Terraza-abierta.png' },
  { name: 'terraza-techada.jpg', url: 'https://i.ibb.co/Pz4S7BtT/Terraza-techada.jpg' },
  { name: 'quincho-completo.jpg', url: 'https://i.ibb.co/WWmSSWvq/Quincho-completo.jpg' },
  { name: 'terraza-madera.webp', url: 'https://i.ibb.co/d0pL3y6H/Terraza-madera.webp' },
  { name: 'terraza-acero-y-madera.png', url: 'https://i.ibb.co/Cy5XdKk/terraza-acero-y-madera.png' },
  { name: 'terraza-ladrillo-madera.png', url: 'https://i.ibb.co/TMY0RD6T/terraza-ladrillo-madera.png' },
  { name: 'tiny-vivienda.png', url: 'https://i.ibb.co/pBStCHWC/Casa-1-piso.png' },
  { name: 'tiny-airbnb.jpg', url: 'https://i.ibb.co/fYHjr8t3/airbnb.jpg' },
  { name: 'tiny-office.jpg', url: 'https://i.ibb.co/prXF1cXL/home-office.jpg' },
  { name: 'tiny-15-25.png', url: 'https://i.ibb.co/HTrQWXxj/cbfa1458-aa53-4420-a4aa-6375277cf2a1.png' },
  { name: 'tiny-25-35.png', url: 'https://i.ibb.co/SDN0kCTF/tiny-house-25-35m2.png' },
  { name: 'tiny-35-50.png', url: 'https://i.ibb.co/qYWVKqrP/tiny-50m2.png' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (status code: ${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function start() {
  console.log('Iniciando descarga de imágenes locales para el cotizador...');
  for (const img of imagesToDownload) {
    const dest = path.join(outputDir, img.name);
    try {
      await downloadFile(img.url, dest);
      console.log(`✓ Descargado: ${img.name}`);
    } catch (error) {
      console.error(`✗ Error descargando ${img.name}:`, error.message);
    }
  }
  console.log('Proceso de descarga finalizado.');
}

start();
