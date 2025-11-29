import { AbstractComponent } from "../../framework/view/abstractComponent.js";
import { getYearWord } from "../../utils.js";

function createPetItemTemplate(pet, isActive = false) {
    return `
        <div class="petItem${isActive ? ' petItem--active' : ''}">
            <img src="${pet.photo}" alt="Фото питомца">
            <div class="briefPetInfo">
                <div class="petName">${pet.name}</div>
                <div class="petBreed">${pet.breed}, ${pet.age} ${getYearWord(pet.age)}</div>
            </div>
        </div>
    `;
}

export default class PetItemComponent extends AbstractComponent {
    #pet = null;
    #isActive = false;
    #clickHandler = null;

    constructor(pet, isActive = false) {
        super();
        this.#pet = pet;
        this.#isActive = isActive;
    }

    get template() {
        return createPetItemTemplate(this.#pet, this.#isActive);
    }

    setClickHandler(handler) {
        this.#clickHandler = handler;
        this.element.addEventListener('click', this.#clickHandler);
    }
}
