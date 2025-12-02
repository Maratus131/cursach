import { AbstractComponent } from '../framework/view/abstractComponent.js'
import { getYearWord, computeAge } from '../utils.js';

function createPetTitleComponentTemplate(pet) {
    return (
        `
        <div class="petTitle">
                <h1>${pet.name}</h1>
                <div class="breed">
                    ${pet.breed}, ${computeAge(pet.birthday)}  ${getYearWord(computeAge(pet.birthday))}
                </div>
        </div>
    `
    );
}

export default class PetTitleComponent extends AbstractComponent {
    #pet = null;

    constructor(pet) {
        super();
        this.#pet = pet;
    }

    get template() {
        return createPetTitleComponentTemplate(this.#pet);
    }
}