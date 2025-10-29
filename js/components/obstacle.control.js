const obstacleMapping = {
    'btn-obs-forward': 'OBS_ADELANTE',
    'btn-obs-backward': 'OBS_ATRAS',
    'btn-obs-left': 'OBS_IZQUIERDA',
    'btn-obs-right': 'OBS_DERECHA',
    'btn-obs-general': 'OBS_GENERAL'
};

let _api;
let _updateStatus;

async function handleObstacleClick(event) {
    const button = event.currentTarget;
    const buttonId = button.id;
    const buttonText = button.textContent;
    const codigoObstaculo = obstacleMapping[buttonId];

    if (!codigoObstaculo) {
        console.warn(`No se encontró mapeo para el obstáculo: ${buttonId}`);
        return;
    }

    _updateStatus(buttonText);

    try {
        const result = await _api.registrarObstaculo(codigoObstaculo);
        console.log('Obstáculo enviado. Evento ID:', result.id);
    } catch (error) {
        _updateStatus('Error de conexión');
    }
}

export const ObstacleControl = {
    init: (api, updateStatus) => {
        _api = api;
        _updateStatus = updateStatus;

        document.querySelectorAll('#obstacle-section .btn').forEach(button => {
            button.addEventListener('click', handleObstacleClick);
        });
    }
};