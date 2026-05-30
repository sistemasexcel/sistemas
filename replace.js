const fs = require('fs');
const file = 'd:/01. SISTEMAS EN EXCEL - PROYECTOS/SITIOS WEB/WEB_SISTEMAS_EXCEL/botica.html';
let content = fs.readFileSync(file, 'utf8');

// Mensual: 8 -> 10
content = content.replace(/8<\/span>\s*<span class="currency text-white" style="font-size: 1rem;">USD<\/span>/g, '10</span>\n                                        <span class="currency text-white" style="font-size: 1rem;">USD</span>');
content = content.replace(/data-price-usd="8\.00"/g, 'data-price-usd="10.00"');
content = content.replace(/data-version="BoticaPro Plan Mensual"\s*data-hotmart="#"/g, 'data-version="BoticaPro Plan Mensual" data-hotmart="https://pay.hotmart.com/L102677652I"');

// Anual: 19 -> 22
content = content.replace(/19<\/span>\s*<span class="currency text-white" style="font-size: 1rem;">USD<\/span>/g, '22</span>\n                                        <span class="currency text-white" style="font-size: 1rem;">USD</span>');
content = content.replace(/data-price-usd="19\.00"/g, 'data-price-usd="22.00"');
content = content.replace(/data-version="BoticaPro Plan Anual"\s*data-hotmart="#"/g, 'data-version="BoticaPro Plan Anual" data-hotmart="https://pay.hotmart.com/B105636557U"');

// Permanente: 27 -> 33
content = content.replace(/27<\/span>\s*<span class="currency text-white" style="font-size: 1rem;">USD<\/span>/g, '33</span>\n                                        <span class="currency text-white" style="font-size: 1rem;">USD</span>');
content = content.replace(/data-price-usd="27\.00"/g, 'data-price-usd="33.00"');
content = content.replace(/data-version="BoticaPro Licencia Permanente"\s*data-hotmart="#"/g, 'data-version="BoticaPro Licencia Permanente" data-hotmart="https://pay.hotmart.com/D105636552A"');

// Red Local: 49/52 -> 55
content = content.replace(/49<\/span>\s*<span class="currency text-white" style="font-size: 1rem;">USD<\/span>/g, '55</span>\n                                        <span class="currency text-white" style="font-size: 1rem;">USD</span>');
content = content.replace(/52<\/span>\s*<span class="currency text-white" style="font-size: 1rem;">USD<\/span>/g, '55</span>\n                                        <span class="currency text-white" style="font-size: 1rem;">USD</span>');
content = content.replace(/data-price-usd="49\.00"/g, 'data-price-usd="55.00"');
content = content.replace(/data-price-usd="52\.00"/g, 'data-price-usd="55.00"');
content = content.replace(/data-version="BoticaPro Plan Red Local"\s*data-hotmart="#"/g, 'data-version="BoticaPro Plan Red Local" data-hotmart="https://pay.hotmart.com/Y106060643U"');

fs.writeFileSync(file, content);
console.log('Done');
