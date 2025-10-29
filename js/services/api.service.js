export class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    _getBasePayload() {
        return {
            nombreDispositivo: "ROVER-CURIOSITY",
            pais: "México",
            ciudad: "Guadalajara",
            latitud: 20.6597,
            longitud: -103.3496
        };
    }

    async _fetch(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            return response.status === 204 || response.status === 200 && response.headers.get('content-length') === '0' 
                ? null 
                : response.json();
        } catch (error) {
            console.error(`Fallo en API: ${endpoint}`, error.message);
            throw error;
        }
    }

    registrarMovimiento(codigoOperacion) {
        const payload = { ...this._getBasePayload(), codigoOperacion };
        return this._fetch('/api/v1/iot/control/movimiento', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }

    registrarObstaculo(codigoObstaculo) {
        const payload = { ...this._getBasePayload(), codigoObstaculo };
        return this._fetch('/api/v1/iot/control/obstaculo', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }

    crearSecuencia(nombreSecuencia, cantidadMovimientos) {
        const payload = { nombreSecuencia, cantidadMovimientos };
        return this._fetch('/api/v1/iot/control/secuencia', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }

    ejecutarSecuencia(idSecuencia) {
        const payload = { ...this._getBasePayload(), idSecuencia };
        return this._fetch('/api/v1/iot/control/secuencia/ejecutar', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }

    getSecuencias() {
        return this._fetch('/api/v1/iot/query/secuencia', {
            method: 'GET',
        });
    }
}