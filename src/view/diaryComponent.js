import { AbstractComponent } from "../framework/view/abstractComponent.js";

const MAX_VISIBLE_IMAGES = 4;


function createDiaryTemplate(notes, images = []) {
    const visibleImages = images.slice(0, MAX_VISIBLE_IMAGES);

    return (
        `
        <div class="personalDiaryAndImages">
            <div class="personalDiary">
                <label class="addNote">+ Добавить запись в дневник</label>
                ${notes.map(note => `
                    <div class="note card">
                        <div class="cardHeader">${note.date}</div>
                        <div class="cardText">${note.text}</div>
                    </div>
                `).join('')}
            </div>
            <div>
                <div class="addImage">
                <label class="addPhoto">+ Добавить изображение в галерею</label>
            </div>
            
            ${images.length > 0 ? `
                    <div class="gallery">
                        ${visibleImages.map(img => `<img src="${img}">`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
        `
    );
}

export default class DiaryComponent extends AbstractComponent {
    #notes = [];
    #images = [];
    #onAddNoteClick = null;
    #onAddImageClick = null;
    #onGalleryClick = null;

    constructor(notes, images) {
        super();
        this.#notes = notes;
        this.#images = images;
    }

    get template() {
        return createDiaryTemplate(this.#notes, this.#images);
    }

    setAddNoteClickHandler(callback) {
        this.#onAddNoteClick = callback;
        const btn = this.element.querySelector('.addNote');
        if (btn) btn.addEventListener('click', this.#onAddNoteClick);
    }

    setAddImageClickHandler(callback) {
        this.#onAddImageClick = callback;
        const btn = this.element.querySelector('.addImage');
        if (btn) btn.addEventListener('click', this.#onAddImageClick);
    }

    setGalleryClickHandler(callback) {
        this.#onGalleryClick = (event) => {
            // Проверяем, что клик не по кнопке добавления изображения, чтобы избежать конфликтов
            if (!event.target.closest('.addImage')) {
                callback(event);
            }
        };
        const gallery = this.element.querySelector('.gallery');
        if (gallery) gallery.addEventListener('click', this.#onGalleryClick);
    }
}