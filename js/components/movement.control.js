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

let _api;
let _updateStatus;

async function handleControlClick(event) {
    const button = event.currentTarget;
    const buttonId = button.id;
    const buttonText = button.textContent;
    const codigoOperacion = buttonMapping[buttonId];

    if (!codigoOperacion) {
        console.warn(`No se encontró mapeo para el botón: ${buttonId}`);
        return;
    }

    _updateStatus(buttonText);

    try {
        const result = await _api.registrarMovimiento(codigoOperacion);
        console.log('Movimiento enviado. Evento ID:', result.id);
    } catch (error) {
        _updateStatus('Error de conexión');
    }
}

export const MovementControl = {
    init: (api, updateStatus) => {
        _api = api;
        _updateStatus = updateStatus;

        document.querySelectorAll('#movement-section .btn').forEach(button => {
            button.addEventListener('click', handleControlClick);
        });
    }
};