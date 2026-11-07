const fs = require('fs');
const path = require('path');

const domain = "https://sistemasexcel.site/";
const files = [
    'index.html', 'cotizaciones.html', 'ventas.html', 
    'botica.html', 'veterinaria.html'
];

files.forEach(file => {
    let content;
    try {
        content = fs.readFileSync(file, 'utf8');
        if (content.includes('\u0000')) { // fallback if it was actually utf16
            content = fs.readFileSync(file, 'utf16le');
        }
    } catch (e) {
        console.log(`Could not read ${file}`);
        return;
    }
    
    if (content.includes('<link rel="canonical"')) {
        console.log(`Skipping ${file}, already has canonical.`);
        return;
    }
    
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "Sistemas Excel";
    
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']\s*\/?>/i);
    const description = descMatch ? descMatch[1].trim() : "Sistemas Excel y automatización en VBA.";
    
    const url = file.toLowerCase() === 'index.html' ? domain : domain + file;
    
    const ogTags = `
    <!-- SEO & Open Graph Tags -->
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${domain}img/logo.jpeg" />
    <meta name="twitter:card" content="summary_large_image" />
`;

    content = content.replace(/<\/head>/i, `${ogTags}</head>`);
    
    // Determine encoding to write back
    const isUtf16 = fs.readFileSync(file).includes(Buffer.from([0xff, 0xfe]));
    fs.writeFileSync(file, content, isUtf16 ? 'utf16le' : 'utf8');
    console.log(`Updated ${file}`);
});
