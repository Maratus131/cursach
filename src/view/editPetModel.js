import { AbstractComponent } from '../framework/view/abstractComponent.js';

function createEditPetModalComponent(pet) {
    return `
            <div class="modal editPetModal">
                <div class="modalContent">
                    <button class="modalClose">&times;</button>
                    <h2>Редактировать питомца</h2>
                    <form class="modalForm">

                        <input type="file" id="petPhoto" hidden accept="image/*">

                        <div class="modalPhoto">
                            <img src="${pet.photo}" class="photoTrigger">
                        </div>

                        <div class="inputData">
                            <label>Кличка</label>
                            <input id="petName" type="text">
                        </div>

                        <div class="inputData">
                            <label>Порода</label>
                            <input id="petBreed" type="text">
                        </div>

                        <div class="inputData">
                            <label>Дата рождения</label>
                            <input id="petBirthday" type="date">
                        </div>
                        <div class="inputData">
                            <label>Особые приметы</label>
                            <textarea id="petSpecialFeatures" rows="4" cols="30" placeholder="Особые приметы"></textarea>
                        </div>
                        <div class="inputData">
                        <label>Стерилизован ли ваш питомец</label>
                        <select id="petSterilized">
                            <option value="">Выберите вариант</option>
                            <option value="Да">Да</option>
                            <option value="Нет">Нет</option>
                        </select>
                    </div>
                    <div class="inputData">
                        <label>Чипирован ли ваш питомец</label>
                        <select id="petChipped">
                            <option value="">Выберите вариант</option>
                            <option value="Да">Да</option>
                            <option value="Нет">Нет</option>
                        </select>
                    </div>
                        <button type="submit" class="btn btnPrimary">Сохранить</button>
                    </form>
                </div>
            </div>`;
}

export default class EditPetModalComponent extends AbstractComponent {
    #pet = null;
    #onSubmit = null;

    constructor(pet, { onSubmit }) {
        super();
        this.#pet = pet;
        this.#onSubmit = onSubmit;

        this.element.querySelector('#petName').value = this.#pet.name;
        this.element.querySelector('#petBreed').value = this.#pet.breed;
        this.element.querySelector('#petBirthday').value = this.#pet.birthday;
        this.element.querySelector('#petSpecialFeatures').value = this.#pet.specialFeatures;
        this.element.querySelector('#petSterilized').value = this.#pet.isSterilized;
        this.element.querySelector('#petChipped').value = this.#pet.isChipped;

        const birthdayInput = this.element.querySelector('#petBirthday');
        if (this.#pet.birthday) {
            const parts = this.#pet.birthday.split('-');

            if (parts.length === 3) {
                const [day, month, year] = parts;
                birthdayInput.value = `${year}-${month}-${day}`;
            } else {
                birthdayInput.value = this.#pet.birthday;
            }
        }

        const form = this.element.querySelector('.modalForm');
        if (form) {
            form.addEventListener('submit', this.#submitHandler.bind(this));
        }

        const btn = this.element.querySelector('.modalClose');
        if (btn) btn.addEventListener('click', this.#closeHandler.bind(this));

        const previewImg = this.element.querySelector('.photoTrigger');
        if (previewImg) {
            previewImg.style.width = '100px';
            previewImg.style.height = '100px';
            previewImg.style.objectFit = 'cover';
            previewImg.style.padding = '0';
            previewImg.style.border = 'none';
        }
    }

    get template() {
        return createEditPetModalComponent(this.#pet);
    }

    #submitHandler(e) {
        e.preventDefault();

        const raw = this.element.querySelector('#petBirthday').value;
        const [yyyy, mm, dd] = raw.split('-');
        const birthday = `${dd}-${mm}-${yyyy}`;

        const updated = {
            name: this.element.querySelector('#petName').value.trim(),
            breed: this.element.querySelector('#petBreed').value.trim(),
            birthday: birthday,
            specialFeatures: this.element.querySelector('#petSpecialFeatures').value.trim(),
            isSterilized: this.element.querySelector('#petSterilized').value.trim(),
            isChipped: this.element.querySelector('#petChipped').value.trim()
        };

        this.#onSubmit(updated);
        this.element.remove();
    }


    #closeHandler(evt) {
        evt.preventDefault();
        this.element.remove();
    }
}
