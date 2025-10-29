document.addEventListener('DOMContentLoaded', () => {

    const API_BASE_URL = 'https://hjbe0v8t82.execute-api.us-east-1.amazonaws.com';
    const lastActionText = document.getElementById('last-action-text');
    const controlButtons = document.querySelectorAll('.control-panel .btn');

    const buttonMapping = {
        'btn-forward': 'ADELANTE',
        'btn-backward': 'ATRAS',
        'btn-stop': 'DETENER',
        'btn-turn-left-1': 'VUELTA_ADELANTE_IZQ',
        'btn-turn-right-1': 'VUELTA_ADELANTE_DER',
        'btn-turn-left-2': 'VUELTA_ATRAS_IZQ',
        'btn-turn-right-2': 'VUELTA_ATRAS_DER',
        'btn-turn-90-left': 'GIRO_90_IZQ',
        'btn-turn-90-right': 'GIRO_90_DER',
        'btn-turn-360-left': 'GIRO_360_IZQ',
        'btn-turn-360-right': 'GIRO_360_DER'
    };

    async function sendApiCommand(codigoOperacion) {
        const endpoint = `${API_BASE_URL}/api/v1/iot/control/movimiento`;
        const payload = {
            codigoOperacion: codigoOperacion,
            nombreDispositivo: "ROVER-CURIOSITY",
            pais: "México",
            ciudad: "Guadalajara",
            latitud: 20.6597,
            longitud: -103.3496
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            console.log('Comando enviado. Evento ID:', result.id);

        } catch (error) {
            console.error('Fallo al enviar el comando a la API:', error.message);
            lastActionText.textContent = 'Error de conexión';
        }
    }

    function handleControlClick(event) {
        const button = event.currentTarget;
        const buttonId = button.id;
        const buttonText = button.textContent;
        const codigoOperacion = buttonMapping[buttonId];

        lastActionText.textContent = buttonText;

        if (codigoOperacion) {
            sendApiCommand(codigoOperacion);
        } else {
            console.warn(`No se encontró mapeo para el botón con id: ${buttonId}`);
        }
    }

    controlButtons.forEach(button => {
        button.addEventListener('click', handleControlClick);
    });

});