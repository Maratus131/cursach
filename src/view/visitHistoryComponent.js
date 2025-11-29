import { AbstractComponent } from '../framework/view/abstractComponent.js';

function createVisitHistoryTemplate(visits) {
    return `
        <div class="doctorVisitHistory">
        <div class="visitHistory">
            <label class="addVisit">+ Добавить посещение</label>
            ${visits.map(visit => `
                <div class="visit card">
                    <div class="cardHeader">${visit.date}</div>
                    <div class="cardText">${visit.text}</div>
                </div>
            `).join('')}
        </div>
        </div>
    `;
}

export default class VisitHistoryComponent extends AbstractComponent {
    #visits = [];
    #onAddVisitClick = null;

    constructor(visits) {
        super();
        this.#visits = visits;
    }

    get template() {
        return createVisitHistoryTemplate(this.#visits);
    }

    setAddVisitClickHandler(callback) {
        this.#onAddVisitClick = callback;
        const btn = this.element.querySelector('.addVisit');
        if (btn) btn.addEventListener('click', this.#onAddVisitClick);
    }
}