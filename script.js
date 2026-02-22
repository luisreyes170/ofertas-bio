async function loadOffers() {
    const container = document.getElementById('dynamic-offers');

    try {
        // En producción el bot actualizará este JSON
        const response = await fetch('offers.json');
        if (!response.ok) throw new Error('No se pudo cargar el archivo de ofertas');

        const data = await response.json();

        if (!data.offers || data.offers.length === 0) {
            container.innerHTML = '<div class="tagline">Próximamente más ofertas destacadas...</div>';
            return;
        }

        container.innerHTML = ''; // Limpiar loding

        data.offers.forEach(offer => {
            const card = document.createElement('a');
            card.href = offer.url;
            card.className = 'link-card offer-item';
            card.target = '_blank';

            card.innerHTML = `
                ${offer.image ? `<div class="offer-image-container"><img src="${offer.image}" class="offer-image" alt="${offer.title}"></div>` : ''}
                <div class="offer-content">
                    ${offer.discount ? `<span class="offer-badge">${offer.discount}% OFF</span>` : ''}
                    <span class="text offer-title">${offer.title}</span>
                    <div class="offer-footer">
                        ${offer.price ? `<span class="offer-price">$${offer.price}</span>` : ''}
                        <span class="offer-cta">Ver oferta →</span>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error cargando ofertas:', error);
        container.innerHTML = '<div class="tagline">¡Mira nuestras historias para ver ofertas hoy!</div>';
    }
}

document.addEventListener('DOMContentLoaded', loadOffers);
