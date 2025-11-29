import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createAddNoteModalComponent() {
    return `
        <div class="modal addNoteModal">
            <div class="modalContent">
                <button class="modalClose">&times;</button>
                <h2>Добавить новую запись</h2>
                <form class="modalForm">
                    <div class="inputData">
                        <label>Дата записи</label>
                        <input id="noteDate" type="date" placeholder="Введите дату записи">
                    </div>
                    <div class="inputData">
                        <label>Описание</label>
                        <textarea id="noteText" rows="4" cols="30" placeholder="Введите текст"></textarea>
                    </div>
                    <button type="submit" class="submitForm btn btnPrimary">+ Добавить запись</button>
                </form>
            </div>
        </div>
    `;
}

export default class AddNoteModalComponent extends AbstractComponent {
    #onSubmit = null;

    constructor({ onSubmit }) {
        super();

        this.#onSubmit = onSubmit;

        const dateInput = this.element.querySelector('#noteDate');
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
        return createAddNoteModalComponent();
    }

    #submitHandler(evt) {
        evt.preventDefault();

        const raw = this.element.querySelector('#noteDate').value;

        const [yyyy, mm, dd] = raw.split('-');
        const date = `${dd}-${mm}-${yyyy}`;

        const text = this.element.querySelector('#noteText').value.trim();

        const noteData = { date, text };

        this.#onSubmit(noteData);
        this.element.remove();
    }



    #closeHandler(evt) {
        evt.preventDefault();
        this.element.remove();
    }
}