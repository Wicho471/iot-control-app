import { ApiService } from './services/api.service.js';
import { MovementControl } from './components/movement.control.js';
import { ObstacleControl } from './components/obstacle.control.js';
import { SequenceManager } from './components/sequence.manager.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const API_BASE_URL = 'https://hjbe0v8t82.execute-api.us-east-1.amazonaws.com';
    const lastActionText = document.getElementById('last-action-text');

    const updateStatus = (message) => {
        lastActionText.textContent = message;
    };

    const api = new ApiService(API_BASE_URL);

    SequenceManager.init(api, updateStatus);
    MovementControl.init(api, updateStatus);
    ObstacleControl.init(api, updateStatus);

});