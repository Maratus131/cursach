import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createAddVisitModalComponent() {
    return `
        <div class="modal addVisitModal">
            <div class="modalContent">
                <button class="modalClose">&times;</button>
                <h2>Добавить новое посещение</h2>
                <form class="modalForm">
                    <div class="inputData">
                        <label>Дата посещения</label>
                        <input id="visitDate" type="date" placeholder="Введите дату посещения">
                    </div>
                    <div class="inputData">
                        <label>Описание</label>
                        <textarea id="visitText" rows="4" cols="30" placeholder="Введите текст"></textarea>
                    </div>
                    <button type="submit" class="submitForm btn btnPrimary">+ Добавить посещение</button>
                </form>
            </div>
        </div>
    `;
}

export default class AddVisitModalComponent extends AbstractComponent {
    #onSubmit = null;

    constructor({ onSubmit }) {
        super();

        this.#onSubmit = onSubmit;

        const dateInput = this.element.querySelector('#visitDate');
        if (dateInput) {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            dateInput.value = `${yyyy}-${mm}-${dd}`;
        }

        const form = this.element.querySelector('.modalForm');
        if (form) {
            form.addEventListener('submit', this.#submitHandler.bind(this));
        }

        const btn = this.element.querySelector('.modalClose');
        if (btn) btn.addEventListener('click', this.#closeHandler.bind(this));
    }

    get template() {
        return createAddVisitModalComponent();
    }

    #submitHandler(evt) {
        evt.preventDefault();

        const raw = this.element.querySelector('#visitDate').value;

        const [yyyy, mm, dd] = raw.split('-');
        const date = `${dd}-${mm}-${yyyy}`;

        const text = this.element.querySelector('#visitText').value.trim();

        const noteData = { date, text };

        this.#onSubmit(noteData);
        this.element.remove();
    }

    #closeHandler(evt) {
        evt.preventDefault();
        this.element.remove();
    }
}
