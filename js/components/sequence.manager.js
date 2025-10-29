let _api;
let _updateStatus;

let createBtn, refreshBtn, nameInput, stepsInput, tableBody;

async function createSequence() {
    const name = nameInput.value.trim();
    const steps = parseInt(stepsInput.value, 10);

    if (!name || isNaN(steps) || steps <= 0) {
        _updateStatus('Datos de secuencia inválidos');
        return;
    }

    _updateStatus('Creando secuencia...');
    try {
        const result = await _api.crearSecuencia(name, steps);
        _updateStatus(`Secuencia creada (ID: ${result.id})`);
        nameInput.value = '';
        stepsInput.value = '5';
        await loadSequences();
    } catch (error) {
        _updateStatus('Error al crear secuencia');
    }
}

async function executeSequence(event) {
    const button = event.currentTarget;
    const idSecuencia = button.dataset.id;
    
    if (!idSecuencia) return;

    _updateStatus(`Ejecutando secuencia ${idSecuencia}...`);
    try {
        await _api.ejecutarSecuencia(idSecuencia);
        _updateStatus(`Secuencia ${idSecuencia} ejecutada`);
    } catch (error) {
        _updateStatus('Error al ejecutar secuencia');
    }
}

async function loadSequences() {
    _updateStatus('Cargando secuencias...');
    try {
        const sequences = await _api.getSecuencias();
        renderTable(sequences);
        _updateStatus('Secuencias cargadas');
    } catch (error) {
        _updateStatus('Error al cargar secuencias');
    }
}

function renderTable(sequences) {
    tableBody.innerHTML = '';
    
    if (!sequences || sequences.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No hay secuencias disponibles.</td></tr>';
        return;
    }

    sequences.forEach(seq => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${seq.id_secuencia}</td>
            <td>${seq.nombre_secuencia}</td>
            <td>${seq.numero_pasos}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary btn-seq-exec" data-id="${seq.id_secuencia}">
                    Ejecutar
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll('.btn-seq-exec').forEach(button => {
        button.addEventListener('click', executeSequence);
    });
}

export const SequenceManager = {
    init: (api, updateStatus) => {
        _api = api;
        _updateStatus = updateStatus;

        createBtn = document.getElementById('btn-seq-create');
        refreshBtn = document.getElementById('btn-seq-refresh');
        nameInput = document.getElementById('seq-name-input');
        stepsInput = document.getElementById('seq-steps-input');
        tableBody = document.getElementById('seq-table-body');

        createBtn.addEventListener('click', createSequence);
        refreshBtn.addEventListener('click', loadSequences);

        loadSequences();
    }
};