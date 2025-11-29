import { AbstractComponent } from "../../framework/view/abstractComponent.js";

function createAddPetModalComponentTemplate() {
    return `
        <div class="modal addPetModal">
            <div class="modalContent">
                <button class="modalClose">&times;</button>
                <h2>Добавить нового питомца</h2>
                <form class="modalForm">
                    <div class="modalPhoto">
                        <input type="file" id="petPhoto" hidden accept="image/*">
                        <div class="uploadPhoto">
                            <img src="img/icons/photo.png" class="photoTrigger">
                            <span class="photoText">
                                <span class="photoTitle">Фото питомца</span>
                                <span class="photoHint">(нажмите или перетащите)</span>
                            </span>
                        </div>
                    </div>
                    <div class="inputData">
                        <label>Кличка</label>
                        <input id="petName" type="text" placeholder="Введите кличку">
                    </div>
                    <div class="inputData">
                        <label>Порода</label>
                        <input id="petBreed" type="text" placeholder="Введите породу">
                    </div>
                    <div class="inputData">
                        <label>Дата рождения</label>
                        <input id="petBirthday" type="date" placeholder="Введите дату рождения">
                    </div>
                    <div class="inputData">
                        <label>Пол</label>
                        <select id="petGender">
                            <option value="">Выберите пол</option>
                            <option value="Самец">Самец</option>
                            <option value="Самка">Самка</option>
                        </select>
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
                    <div class="inputData">
                        <label>Особые приметы</label>
                        <textarea id="petSpecialFeatures" rows="4" cols="30" placeholder="Особые приметы"></textarea>
                    </div>
                    <button type="submit" class="submitForm btn btnPrimary">+ Добавить питомца</button>
                </form>
            </div>
        </div>
    `;
}

export default class AddPetModalComponent extends AbstractComponent {
    #onSubmit = null;

    constructor({ onSubmit }) {
        super();
        this.#onSubmit = onSubmit;

        const form = this.element.querySelector('.modalForm');
        if (form) {
            form.addEventListener('submit', this.#submitHandler.bind(this));
        }

        const fileInput = this.element.querySelector('#petPhoto');
        const uploadArea = this.element.querySelector('.uploadPhoto');
        const previewImg = this.element.querySelector('.photoTrigger');

        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());

            fileInput.addEventListener('change', this.#handleFileSelect.bind(this, previewImg, uploadArea));

            uploadArea.addEventListener('dragover', (evt) => {
                evt.preventDefault();
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (evt) => {
                evt.preventDefault();
                uploadArea.classList.remove('dragover');
                const files = evt.dataTransfer.files;
                if (files && files[0]) {
                    fileInput.files = files;
                    this.#handleFileSelect(previewImg, uploadArea);
                }
            });
        }

        const btn = this.element.querySelector('.modalClose');
        if (btn) btn.addEventListener('click', this.#closeHandler.bind(this));
    }

    get template() {
        return createAddPetModalComponentTemplate();
    }

    #submitHandler(evt) {
        evt.preventDefault();

        const fileInput = this.element.querySelector('#petPhoto');
        const petData = {
            name: this.element.querySelector('#petName').value.trim(),
            breed: this.element.querySelector('#petBreed').value.trim(),
            birthday: this.element.querySelector('#petBirthday').value,
            gender: this.element.querySelector('#petGender').value.trim(),
            isSterilized: this.element.querySelector('#petSterilized').value.trim(),
            isChipped: this.element.querySelector('#petChipped').value.trim(),
            specialFeatures: this.element.querySelector('#petSpecialFeatures').value.trim(),
            photo: './img/avatar.jpg',
            gallery: []
        };

        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                petData.photo = e.target.result;
                this.#onSubmit(petData);
                this.element.remove();
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            this.#onSubmit(petData);
            this.element.remove();
        }
    }

    #handleFileSelect(previewImg, uploadArea) {
        const fileInput = this.element.querySelector('#petPhoto');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                if (previewImg) {
                    previewImg.src = reader.result;
                    previewImg.style.width = '100px';
                    previewImg.style.height = '100px';
                    previewImg.style.objectFit = 'cover';
                    previewImg.style.padding = '0';
                    previewImg.style.border = 'none';
                    const textSpan = uploadArea.querySelector('.photoText');
                    if (textSpan) textSpan.style.display = 'none';
                }
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }

    #closeHandler(evt) {
        evt.preventDefault();
        this.element.remove();
    }
}