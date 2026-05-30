const fs = require('fs');
const botica = fs.readFileSync('d:/01. SISTEMAS EN EXCEL - PROYECTOS/SITIOS WEB/WEB_SISTEMAS_EXCEL/botica.html', 'utf8');
const ventas = fs.readFileSync('d:/01. SISTEMAS EN EXCEL - PROYECTOS/SITIOS WEB/WEB_SISTEMAS_EXCEL/ventas.html', 'utf8');

// Extract botica precio
const boticaPrecioMatch = botica.match(/<section id="precio".*?<\/section>/s);
let boticaPrecio = boticaPrecioMatch[0];

// Extract botica plans modal
const boticaModalMatch = botica.match(/<!-- Modal Planes y Precios -->[\s\S]*?(?=<!-- Modal Pagos -->|<!-- WhatsApp Flotante)/s);
let boticaModal = boticaModalMatch[0];

// Function to generate ventas checklist
function getVentasChecklist(colorClass, inlineColor) {
    let iconStyle = inlineColor ? `style="color: ${inlineColor};"` : `class="${colorClass}"`;
    return `
                                    <ul class="list-unstyled check-list mb-4" style="font-size: 0.85rem;">
                                        <li><i class="bi bi-check-circle-fill" ${iconStyle}></i> Punto de Venta (POS)</li>
                                        <li><i class="bi bi-check-circle-fill" ${iconStyle}></i> Módulo de Compras</li>
                                        <li><i class="bi bi-check-circle-fill" ${iconStyle}></i> Gestión de Clientes y Proveedores</li>
                                        <li><i class="bi bi-check-circle-fill" ${iconStyle}></i> Reportes Automáticos</li>
                                        <li><i class="bi bi-check-circle-fill" ${iconStyle}></i> Kardex en Tiempo Real</li>
                                        <li><i class="bi bi-check-circle-fill" ${iconStyle}></i> Alertas de Vencimiento</li>
                                        <li><i class="bi bi-check-circle-fill" ${iconStyle}></i> Apertura y Cierre de Caja</li>
                                        <li><i class="bi bi-check-circle-fill" ${iconStyle}></i> Multiusuario</li>
                                    </ul>`;
}

// Process boticaPrecio
boticaPrecio = boticaPrecio.replace(/<span class="text-gradient-botica">Botica<\/span>/g, '<span class="text-gradient-ven">Negocio</span>');
boticaPrecio = boticaPrecio.replace(/BoticaPro/g, 'VentasPro');

// Replace checklists in boticaPrecio
boticaPrecio = boticaPrecio.replace(/<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?<\/ul>/, getVentasChecklist('text-success', null).trim());
boticaPrecio = boticaPrecio.replace(/<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?<\/ul>/, getVentasChecklist('text-info', null).trim());
boticaPrecio = boticaPrecio.replace(/<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?<\/ul>/, getVentasChecklist('text-warning', null).trim());
boticaPrecio = boticaPrecio.replace(/<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?<\/ul>/, getVentasChecklist('', '#a78bfa').trim());
boticaPrecio = boticaPrecio.replace(/<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?<\/ul>/, getVentasChecklist('', '#84cc16').trim());


// Do the same for boticaModal
boticaModal = boticaModal.replace(/BoticaPro/g, 'VentasPro');
boticaModal = boticaModal.replace(/<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?<\/ul>/, getVentasChecklist('text-success', null).trim());
boticaModal = boticaModal.replace(/<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?<\/ul>/, getVentasChecklist('text-info', null).trim());
boticaModal = boticaModal.replace(/<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?<\/ul>/, getVentasChecklist('text-warning', null).trim());
boticaModal = boticaModal.replace(/<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?<\/ul>/, getVentasChecklist('', '#a78bfa').trim());
boticaModal = boticaModal.replace(/<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?<\/ul>/, getVentasChecklist('', '#84cc16').trim());


// Update ventas content
let newVentas = ventas;

if (newVentas.match(/<section id="precio".*?<\/section>/s)) {
    newVentas = newVentas.replace(/<section id="precio".*?<\/section>/s, boticaPrecio);
}

// Inject modal before footer
if (!newVentas.includes('id="plansModal"')) {
    newVentas = newVentas.replace(/<!-- Footer -->/, boticaModal + '\n    <!-- Footer -->');
} else {
    newVentas = newVentas.replace(/<!-- Modal Planes y Precios -->[\s\S]*?(?=<!-- Modal Pagos -->|<!-- Footer -->)/s, boticaModal);
}

fs.writeFileSync('d:/01. SISTEMAS EN EXCEL - PROYECTOS/SITIOS WEB/WEB_SISTEMAS_EXCEL/ventas.html', newVentas);
console.log('Update Complete');
