import re

with open('d:/01. SISTEMAS EN EXCEL - PROYECTOS/SITIOS WEB/WEB_SISTEMAS_EXCEL/botica.html', 'r', encoding='utf8') as f:
    botica = f.read()

with open('d:/01. SISTEMAS EN EXCEL - PROYECTOS/SITIOS WEB/WEB_SISTEMAS_EXCEL/ventas.html', 'r', encoding='utf8') as f:
    ventas = f.read()

# Extract botica precio
botica_precio_match = re.search(r'<section id="precio".*?</section>', botica, flags=re.DOTALL)
botica_precio = botica_precio_match.group(0)

# Extract botica plans modal
botica_modal_match = re.search(r'<!-- Modal Planes y Precios -->[\s\S]*?(?=<!-- Modal Pagos -->|<!-- WhatsApp Flotante)', botica)
botica_modal = botica_modal_match.group(0)

def get_checklist(color_class, inline_color):
    icon_style = f'style="color: {inline_color};"' if inline_color else f'class="{color_class}"'
    return f'''<ul class="list-unstyled check-list mb-4" style="font-size: 0.85rem;">
                                        <li><i class="bi bi-check-circle-fill" {icon_style}></i> Punto de Venta (POS)</li>
                                        <li><i class="bi bi-check-circle-fill" {icon_style}></i> Módulo de Compras</li>
                                        <li><i class="bi bi-check-circle-fill" {icon_style}></i> Gestión de Clientes y Proveedores</li>
                                        <li><i class="bi bi-check-circle-fill" {icon_style}></i> Reportes Automáticos</li>
                                        <li><i class="bi bi-check-circle-fill" {icon_style}></i> Kardex en Tiempo Real</li>
                                        <li><i class="bi bi-check-circle-fill" {icon_style}></i> Alertas de Vencimiento</li>
                                        <li><i class="bi bi-check-circle-fill" {icon_style}></i> Apertura y Cierre de Caja</li>
                                        <li><i class="bi bi-check-circle-fill" {icon_style}></i> Multiusuario</li>
                                    </ul>'''

# Process botica_precio
botica_precio = botica_precio.replace('<span class="text-gradient-botica">Botica</span>', '<span class="text-gradient-ven">Negocio</span>')
botica_precio = botica_precio.replace('BoticaPro', 'VentasPro')

botica_precio = re.sub(r'<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?</ul>', get_checklist('text-success', None), botica_precio, count=1)
botica_precio = re.sub(r'<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?</ul>', get_checklist('text-info', None), botica_precio, count=1)
botica_precio = re.sub(r'<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?</ul>', get_checklist('text-warning', None), botica_precio, count=1)
botica_precio = re.sub(r'<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?</ul>', get_checklist('', '#a78bfa'), botica_precio, count=1)
botica_precio = re.sub(r'<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?</ul>', get_checklist('', '#84cc16'), botica_precio, count=1)

# Process botica_modal
botica_modal = botica_modal.replace('BoticaPro', 'VentasPro')

botica_modal = re.sub(r'<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?</ul>', get_checklist('text-success', None), botica_modal, count=1)
botica_modal = re.sub(r'<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?</ul>', get_checklist('text-info', None), botica_modal, count=1)
botica_modal = re.sub(r'<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?</ul>', get_checklist('text-warning', None), botica_modal, count=1)
botica_modal = re.sub(r'<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?</ul>', get_checklist('', '#a78bfa'), botica_modal, count=1)
botica_modal = re.sub(r'<ul class="list-unstyled check-list mb-4" style="font-size: 0\.85rem;">[\s\S]*?</ul>', get_checklist('', '#84cc16'), botica_modal, count=1)


# Update ventas
if '<section id="precio"' in ventas:
    ventas = re.sub(r'<section id="precio".*?</section>', botica_precio, ventas, flags=re.DOTALL)

if 'id="plansModal"' not in ventas:
    ventas = ventas.replace('<!-- Footer -->', botica_modal + '\n    <!-- Footer -->')
else:
    ventas = re.sub(r'<!-- Modal Planes y Precios -->[\s\S]*?(?=<!-- Modal Pagos -->|<!-- Footer -->)', botica_modal, ventas)

with open('d:/01. SISTEMAS EN EXCEL - PROYECTOS/SITIOS WEB/WEB_SISTEMAS_EXCEL/ventas.html', 'w', encoding='utf8') as f:
    f.write(ventas)

print("Python Update Complete")
