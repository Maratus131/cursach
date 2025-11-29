import PetTitleComponent from "../view/petTitleComponent.js";
import PetInfoComponent from "../view/fullPetInfoComponent.js";
import { render, RenderPosition } from "../framework/render.js";
import NavigationComponent from "../view/navigationComponent.js";
import DiaryComponent from "../view/diaryComponent.js";
import VisitHistoryComponent from "../view/visitHistoryComponent.js";
import AddNoteModalComponent from "../view/addNoteModalComponent.js";
import AddVisitModalComponent from "../view/addVisitModalComponent.js";
import AddImageModalComponent from "../view/addImageModal.js";
import GalleryModalComponent from "../view/galleryModal.js";
import { parseDate, isDateOverdue } from "../utils.js";
import NotificationComponent from "../view/notificationComponent.js";


export default class ContentPresenter {
    #container = null;
    #petModel = null;
    #petInfoComponent = null;
    #petTitleComponent = null;
    #navigationComponent = null;
    #contentSlot = null;

    constructor(container, petModel) {
        this.#container = container;
        this.#petModel = petModel;

        this.#petModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#renderContent();
    }

    #renderContent() {
        this.#container.innerHTML = '';

        const selectedPet = this.#getSelectedPet();
        if (!selectedPet) return;

        this.#checkLastVisitDate(selectedPet);

        this.#petTitleComponent = new PetTitleComponent(selectedPet);
        render(this.#petTitleComponent, this.#container, RenderPosition.BEFOREEND);

        this.#petInfoComponent = new PetInfoComponent(selectedPet);
        render(this.#petInfoComponent, this.#container, RenderPosition.BEFOREEND);

        const activeTab = this.#petModel.activeTab;
        this.#navigationComponent = new NavigationComponent(activeTab);
        render(this.#navigationComponent, this.#container, RenderPosition.BEFOREEND);

        this.#contentSlot = document.createElement('div');
        this.#container.appendChild(this.#contentSlot);

        this.#navigationComponent.setHandlers(
            () => {
                this.#petModel.setActiveTab('diary');
                this.#showDiary(selectedPet.diary, selectedPet.gallery);
            },
            () => {
                this.#petModel.setActiveTab('visits');
                this.#showVisits(selectedPet.visits);
            }
        );

        if (activeTab === 'visits') {
            this.#showVisits(selectedPet.visits);
        } else {
            this.#showDiary(selectedPet.diary, selectedPet.gallery);
        }
    }

    #checkLastVisitDate(pet) {
        if (!pet.visits || pet.visits.length === 0) {
            this.#renderNotification();
            return;
        }

        const sortedVisits = [...pet.visits].sort((a, b) => {
            return parseDate(b.date) - parseDate(a.date);
        });

        const lastVisit = sortedVisits[0];

        if (isDateOverdue(lastVisit.date)) {
            this.#renderNotification();
        }
    }

    #renderNotification() {
        const notification = new NotificationComponent();

        render(notification, this.#container, RenderPosition.BEFOREEND);
    }

    #showDiary(notes, images) {
        this.#contentSlot.innerHTML = '';
        const diaryComponent = new DiaryComponent(notes, images);
        render(diaryComponent, this.#contentSlot, RenderPosition.BEFOREEND);

        diaryComponent.setAddNoteClickHandler(() => this.#handleAddNote());
        diaryComponent.setAddImageClickHandler(() => this.#handleAddImage());
        diaryComponent.setGalleryClickHandler(() => this.#handleOpenGallery(images));
    }

    #showVisits(visits) {
        this.#contentSlot.innerHTML = '';
        const visitComponent = new VisitHistoryComponent(visits);
        render(visitComponent, this.#contentSlot, RenderPosition.BEFOREEND);

        visitComponent.setAddVisitClickHandler(() => this.#handleAddVisit());
    }

    #handleAddNote() {
        const modal = new AddNoteModalComponent({
            onSubmit: (noteData) => {
                const selectedPet = this.#getSelectedPet();
                if (selectedPet) {
                    this.#petModel.addDiaryNote(selectedPet.id, noteData);
                }
            }
        });

        document.body.appendChild(modal.element);
    }

    #handleAddImage() {
        const modal = new AddImageModalComponent({
            onSubmit: (data) => {
                const selectedPet = this.#getSelectedPet();
                if (selectedPet) {
                    this.#petModel.addGalleryImage(selectedPet.id, data.imageUrl);
                }
            }
        });

        document.body.appendChild(modal.element);
    }


    #handleAddVisit() {
        const modal = new AddVisitModalComponent({
            onSubmit: (visitData) => {
                const selectedPet = this.#getSelectedPet();
                if (selectedPet) {
                    this.#petModel.addVisit(selectedPet.id, visitData);
                }
            }
        });

        document.body.appendChild(modal.element);
    }

    #handleOpenGallery(images) {
        const modal = new GalleryModalComponent({ images });
        document.body.appendChild(modal.element);
    }

    #handleModelChange() {
        this.#renderContent();
    }

    #getSelectedPet() {
        return this.#petModel.pets.find(p => p.id === this.#petModel.selectedPetId);
    }
}