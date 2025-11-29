import { render, RenderPosition } from "../framework/render.js";
import AddPetModalComponent from "../view/sidebar/addPetModalComponent.js";
import PetItemComponent from "../view/sidebar/petItemComponent.js";
import SidebarComponent from "../view/sidebar/sidebarComponent.js";

export default class SidebarPresenter {
    #container = null;
    #petModel = null;
    #sidebarComponent = null;

    constructor(container, petModel) {
        this.#container = container;
        this.#petModel = petModel;

        this.#petModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#renderSidebar();
    }

    #renderSidebar() {
        this.#container.innerHTML = '';

        const activePet = this.#getActivePet();

        this.#sidebarComponent = new SidebarComponent(activePet);

        render(this.#sidebarComponent, this.#container, RenderPosition.BEFOREEND);

        this.#sidebarComponent.setAddPetClickHandler(() => {
            this.#handleAddPet();
        });

        this.#renderPetsList();
    }

    #renderPetsList() {
        const petsContainer = this.#sidebarComponent.element.querySelector('.petList');
        if (!petsContainer) return;

        petsContainer.innerHTML = "";

        const pets = this.#petModel.pets || [];
        const selectedId = this.#petModel.selectedPetId;

        const petsForList = pets.filter(pet => pet.id !== selectedId);

        petsForList.forEach((pet) => {
            const petItem = new PetItemComponent(pet, false);
            petItem.setClickHandler(() => this.#handlePetSelect(pet.id));
            render(petItem, petsContainer, RenderPosition.BEFOREEND);
        });
    }


    #handlePetSelect = (petId) => {
        this.#petModel.setSelectedPet(petId);
    };

    #handleModelChange = () => {
        this.#renderSidebar();
    };

    #handleAddPet() {
        const modal = new AddPetModalComponent({
            onSubmit: (petData) => {
                const newId = this.#petModel.addPet(petData);
                this.#petModel.setSelectedPet(newId);
            }
        });

        document.body.appendChild(modal.element);
    }

    #getActivePet() {
        return this.#petModel.pets.find(
            (p) => p.id === this.#petModel.selectedPetId
        );
    }
}
