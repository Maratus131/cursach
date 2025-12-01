import { generateID } from "../utils.js";
import Observable from "../framework/observable.js";
import { UserAction, UpdateType } from "../const.js";

export default class PetModel extends Observable {
    #petsApiService = null;
    #pets = [];
    #selectedPetId = null;
    #activeTab = 'diary';

    constructor({ petsApiService }) {
        super();
        this.#petsApiService = petsApiService;
    }

    async init() {
        try {
            const pets = await this.#petsApiService.pets;
            this.#pets = pets;
            this.#selectedPetId = pets[0]?.id;
        } catch (e) {
            console.error("Ошибка загрузки питомцев:", e);
            this.#pets = [];
        }

        this._notify(UpdateType.INIT);
    }

    get pets() {
        return this.#pets;
    }

    get selectedPetId() {
        return this.#selectedPetId;
    }

    get activeTab() {
        return this.#activeTab;
    }

    setActiveTab(tab) {
        this.#activeTab = tab;
        this._notify(UserAction.CHANGE_TAB, tab);
    }

    setSelectedPet(id) {
        const petExists = this.#pets.some(pet => pet.id === id);
        if (petExists) {
            this.#selectedPetId = id;
        } else {
            console.error(`Питомец с ID: ${id} не найден.`)
        }

        this._notify(UserAction.SELECT_PET, id);
    }

    async addPet(pet) {
        const id = pet.id || generateID();
        const newPet = {
            id,
            name: pet.name || 'Без имени',
            photo: pet.photo,
            breed: pet.breed || '',
            birthday: pet.birthday || '',
            gender: pet.gender || '',
            isSterilized: pet.isSterilized || 'нет',
            isChipped: pet.isChipped || 'нет',
            specialFeatures: pet.specialFeatures || '',
            age: (typeof pet.age === 'number') ? pet.age : this.#computeAge(pet.birthday),
            diary: pet.diary || [],
            gallery: pet.gallery || [],
            visits: pet.visits || []
        };
        this._notify(UserAction.LOADING_START);

        try {
            const createdPet = await this.#petsApiService.addPet(newPet);
            this.#pets.push(createdPet);
            this._notify(UserAction.ADD_PET, createdPet);
            return createdPet;
        } catch (err) {
            console.error("Ошибка при добавлении питомца:", err);
            throw err;
        } finally {
            this._notify(UserAction.LOADING_END);
        }
    }

    async addGalleryImage(petId, imageUrl) {
        const petToUpdate = this.#pets.find(p => p.id === petId);
        
        petToUpdate.gallery.push(imageUrl);
        this._notify(UserAction.ADD_GALLERY_IMAGE, petToUpdate);
        
        this._notify(UserAction.LOADING_START);
        try {
            await this.#petsApiService.updatePet(petToUpdate); 
        } catch (err) {
            console.error("Ошибка сохранения изображения в галерее на сервере:", err);
            petToUpdate.gallery.pop();
            this._notify(UserAction.UPDATE_PET);
            throw err;
        } finally {
            this._notify(UserAction.LOADING_END);
        }
    }

    async addDiaryNote(petId, note) {
        const petToUpdate = this.#pets.find(p => p.id === petId);

        petToUpdate.diary.push(note);
        this._notify(UserAction.ADD_DIARY_NOTE, petToUpdate);

        this._notify(UserAction.LOADING_START);
        try {
            await this.#petsApiService.updatePet(petToUpdate);
        } catch (err) {
            console.error("Ошибка сохранения записи в дневнике на сервере:", err);
            petToUpdate.diary.pop();
            this._notify(UserAction.UPDATE_PET);
            throw err;
        } finally {
            this._notify(UserAction.LOADING_END);
        }
    }

    async addVisit(petId, visit) {
        const petToUpdate = this.#pets.find(p => p.id === petId);

        petToUpdate.visits.push(visit);
        this._notify(UserAction.ADD_VISIT, petToUpdate);

        this._notify(UserAction.LOADING_START);
        try {
            await this.#petsApiService.updatePet(petToUpdate);
        } catch (err) {
            console.error("Ошибка сохранения записи в дневнике на сервере:", err);
            petToUpdate.diary.pop();
            this._notify(UserAction.UPDATE_PET);
            throw err;
        } finally {
            this._notify(UserAction.LOADING_END);
        }
    }

    #computeAge(birthday) {
        if (!birthday) return 0;
        const b = new Date(birthday);
        if (isNaN(b)) return 0;
        const diff = Date.now() - b.getTime();
        return Math.floor(diff / (365.25 * 24 * 3600 * 1000));
    }
}