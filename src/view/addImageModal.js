import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createAddImageModalComponentTemplate() {
    return `
        <div class="modal addImage">
            <div class="modalContent">
                <button class="modalClose">&times;</button>
                <h2>Добавить фото в галерею</h2>
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
                    <button type="submit" class="submitForm btn btnPrimary">+ Добавить фото</button>
                </form>
            </div>
        </div>
    `;
}

export default class AddImageModalComponent extends AbstractComponent {
    #onSubmit = null;

    constructor({ onSubmit }) {
        super();
        this.#onSubmit = onSubmit;

        const form = this.element.querySelector('.modalForm');
        form?.addEventListener('submit', this.#submitHandler.bind(this));

        const fileInput = this.element.querySelector('#petPhoto');
        const uploadArea = this.element.querySelector('.uploadPhoto');
        const previewImg = this.element.querySelector('.photoTrigger');

        uploadArea?.addEventListener('click', () => fileInput.click());

        fileInput?.addEventListener('change', () => {
            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = () => {
                    previewImg.src = reader.result;
                    previewImg.style.width = '100px';
                    previewImg.style.height = '100px';
                    previewImg.style.objectFit = 'cover';
                    previewImg.style.padding = '0';
                    previewImg.style.border = 'none';

                    const textSpan = uploadArea.querySelector('.photoText');
                    if (textSpan) textSpan.style.display = 'none';
                };
                reader.readAsDataURL(fileInput.files[0]);
            }
        });

        const btn = this.element.querySelector('.modalClose');
        btn?.addEventListener('click', this.#closeHandler.bind(this));
    }

    get template() {
        return createAddImageModalComponentTemplate();
    }

    #submitHandler(evt) {
        evt.preventDefault();

        const fileInput = this.element.querySelector('#petPhoto');

        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64 = e.target.result;

                if (typeof this.#onSubmit === 'function') {
                    this.#onSubmit({ imageUrl: base64 });
                }

                this.element.remove();
            };

            reader.readAsDataURL(fileInput.files[0]);

        } else {
            this.element.remove();
        }
    }

    #closeHandler(evt) {
        evt.preventDefault();
        this.element.remove();
    }
}