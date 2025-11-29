import { AbstractComponent } from '../../framework/view/abstractComponent.js'

function createSidebarComponentTemplate(pet) {
    return (
        `
        <aside class="sidebar">
            <img src="${pet.photo}" alt="${pet.name}" class="petAvatar">
            
            <h3 class="sidebarTitle">Мои питомцы</h3>
            <div class="petList">

            </div>
            <button class="addPet btn btnPrimary" for="modalToggle">+ Добавить питомца</button>
        </aside>
    `
    );
}

export default class SidebarComponent extends AbstractComponent {
    #pet = null;

    constructor(pet) {
        super();
        this.#pet = pet;
    }

    get template() {
        return createSidebarComponentTemplate(this.#pet);
    }

    setAddPetClickHandler(callback) {
        this.element.querySelector('.addPet').addEventListener('click', callback);
    }

}