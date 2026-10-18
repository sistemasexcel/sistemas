/**
 * WhatsApp Modal Handler - Sistemas Excel
 * Controla la actualización dinámica del modal de opciones de WhatsApp según el sistema seleccionado.
 */

const WHATSAPP_PHONE = "51922784328";

const WHATSAPP_SYSTEMS = {
    botica: {
        id: "botica",
        name: "BoticaPro EX 13.5",
        badge: "💊 Boticas y Farmacias",
        demoText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y estoy interesado(a) en BoticaPro EX 13.5. Quisiera acceder a la versión demo para conocer sus funcionalidades antes de adquirirlo. ¿Podrían indicarme cómo obtenerla y cuál es su precio? 💻",
        comprarText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y deseo adquirir BoticaPro EX 13.5. ¿Podrían brindarme información sobre el precio, las licencias disponibles y los pasos para realizar la compra? 💊"
    },
    ventas: {
        id: "ventas",
        name: "Sistema de Ventas e Inventario V6.5",
        badge: "📦 Ventas e Inventario",
        demoText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y estoy interesado(a) en el Sistema de Ventas e Inventario V6.5. Quisiera acceder a la versión demo para conocer sus funcionalidades antes de adquirirlo. ¿Podrían indicarme cómo obtenerla y cuál es su precio? 💻",
        comprarText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y deseo adquirir el Sistema de Ventas e Inventario V6.5. ¿Podrían brindarme información sobre el precio, las licencias disponibles y los pasos para realizar la compra? 📦"
    },
    cotizaciones: {
        id: "cotizaciones",
        name: "Sistema de Cotizaciones Pro",
        badge: "📄 Cotizaciones Pro (Excel)",
        demoText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y estoy interesado(a) en el Sistema de Cotizaciones Pro. Quisiera acceder a la versión demo para conocer sus funcionalidades antes de adquirirlo. ¿Podrían indicarme cómo obtenerla y cuál es su precio? 💻",
        comprarText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y deseo adquirir el Sistema de Cotizaciones Pro. ¿Podrían brindarme información sobre el precio, las licencias disponibles y los pasos para realizar la compra? 📄"
    },
    cotizadorpro: {
        id: "cotizadorpro",
        name: "Cotizador Pro Web",
        badge: "🌐 Cotizador Web (Nube)",
        demoText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y estoy interesado(a) en el Cotizador Pro Web. Quisiera acceder a la versión demo para conocer sus funcionalidades antes de adquirirlo. ¿Podrían indicarme cómo obtenerla y cuál es su precio? 💻",
        comprarText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y deseo adquirir el Cotizador Pro Web. ¿Podrían brindarme información sobre el precio, las licencias disponibles y los pasos para realizar la compra? 🌐"
    },
    veterinaria: {
        id: "veterinaria",
        name: "VET-SYSTEM PRO V7.5",
        badge: "🐾 Veterinarias y Clínicas",
        demoText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y estoy interesado(a) en el VET-SYSTEM PRO V7.5. Quisiera acceder a la versión demo para conocer sus funcionalidades antes de adquirirlo. ¿Podrían indicarme cómo obtenerla y cuál es su precio? 💻",
        comprarText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y deseo adquirir el VET-SYSTEM PRO V7.5. ¿Podrían brindarme información sobre el precio, las licencias disponibles y los pasos para realizar la compra? 🐾"
    },
    credipro: {
        id: "credipro",
        name: "CrediPro V1.5",
        badge: "💳 Préstamos y Cobranzas Web",
        demoText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y estoy interesado(a) en el sistema CrediPro V1.5. Quisiera acceder a la versión demo para conocer sus funcionalidades antes de adquirirlo. ¿Podrían indicarme cómo obtenerla y cuál es su precio? 💻",
        comprarText: "¡Hola! 👋 Vengo desde la web de Sistemas Excel y deseo adquirir el sistema CrediPro V1.5. ¿Podrían brindarme información sobre el precio, las licencias disponibles y los pasos para realizar la compra? 💳"
    }
};

function initWhatsappModal(defaultSystemId) {
    const modalEl = document.getElementById('whatsappContactModal');
    if (!modalEl) return;

    function updateContent(systemId) {
        const data = WHATSAPP_SYSTEMS[systemId] || WHATSAPP_SYSTEMS[defaultSystemId] || WHATSAPP_SYSTEMS['botica'];

        const titleEl = document.getElementById('wspModalSystemName');
        const badgeEl = document.getElementById('wspModalSystemBadge');
        const demoLinkEl = document.getElementById('wspDemoLink');
        const comprarLinkEl = document.getElementById('wspComprarLink');

        if (titleEl) titleEl.textContent = data.name;
        if (badgeEl) badgeEl.textContent = data.badge;

        const baseUrl = `https://wa.me/${WHATSAPP_PHONE}?text=`;
        const demoUrl = baseUrl + encodeURIComponent(data.demoText);
        const comprarUrl = baseUrl + encodeURIComponent(data.comprarText);

        if (demoLinkEl) {
            demoLinkEl.href = demoUrl;
        }
        if (comprarLinkEl) {
            comprarLinkEl.href = comprarUrl;
        }
    }

    modalEl.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const systemId = (button && button.getAttribute('data-system-id')) || defaultSystemId || 'botica';
        updateContent(systemId);
    });

    // Carga inicial de datos del sistema por defecto
    updateContent(defaultSystemId || 'botica');
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    const defaultSys = document.body.getAttribute('data-page-system') || 'botica';
    initWhatsappModal(defaultSys);
});
