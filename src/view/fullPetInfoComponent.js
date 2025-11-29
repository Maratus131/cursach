import { AbstractComponent } from '../framework/view/abstractComponent.js'

function createFullPetInfoComponentTemplate(pet) {
    return (
        `
            <div class="fullPetInfo">
                <h3>
                    Информация о питомце
                </h3>
                <div class="info">
                    <div class="birthday">Дата рождения: ${pet.birthday}</div>
                    <div class="gender">Пол: ${pet.gender}</div>
                    <div class="isSterilized">Стерилизован: ${pet.isSterilized}</div>
                    <div class="isChipped">Чип: ${pet.isChipped}</div>
                    <div class="specialFeatures">Особые приметы: ${pet.specialFeatures}</div>
                </div>
            </div>
    `
    );
}

export default class PetInfoComponent extends AbstractComponent {
    #pet = null;

    constructor(pet) {
        super();
        this.#pet = pet;
    }
    
    get template() {
        return createFullPetInfoComponentTemplate(this.#pet);
    }
}