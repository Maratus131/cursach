import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createGalleryModalTemplate(images) {
    return `
        <div class="modal galleryModal">
            <div class="modalContent">
                <button class="modalClose">&times;</button>
                <h2>Галерея изображений</h2>
                <div class="fullGallery">
                    ${images.map(img => `<img src="${img}" class="fullImage">`).join('')}
                </div>
            </div>
        </div>
    `;
}

export default class GalleryModalComponent extends AbstractComponent {
    #images = [];

    constructor({ images }) {
        super();
        this.#images = images;

        const closeBtn = this.element.querySelector('.modalClose');
        closeBtn?.addEventListener('click', this.#closeHandler.bind(this));

        this.element.addEventListener('click', (event) => {
            if (event.target === this.element) {
                this.#closeHandler(event);
            }
        });
    }

    get template() {
        return createGalleryModalTemplate(this.#images);
    }

    #closeHandler(evt) {
        evt.preventDefault();
        this.element.remove();
    }
}