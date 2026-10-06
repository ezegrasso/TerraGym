// Arma el link wa.me. Solo usa el número si está en formato internacional (+54...);
// si no, abre WhatsApp para elegir el contacto a mano.
export function buildWhatsAppUrl({ phone, text }) {
    const digits = phone?.trim().startsWith('+') ? phone.replace(/\D/g, '') : ''
    return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}