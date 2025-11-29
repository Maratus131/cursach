import { pets } from "../mocks/pets.js";
import { generateID } from "../utils.js";

export default class PetModel {
    #pets = pets;
    #observers = [];
    #selectedPetId = null;
    #activeTab = 'diary';

    constructor() {
        this.#selectedPetId = this.#pets[0].id;
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
        this._notifyObservers();
    }

    setSelectedPet(id) {
        const petExists = this.#pets.some(pet => pet.id === id);
        if (petExists) {
            this.#selectedPetId = id;
            this._notifyObservers();
        } else {
            console.error(`Питомец с ID: ${id} не найден.`)
        }
    }

    addDiaryNote(petId, note) {
        const pet = this.#pets.find(p => p.id === petId);
        if (pet) {
            pet.diary.push(note);
            this._notifyObservers();
        }
    }

    addPet(pet) {
        const id = pet.id || generateID();
        const newPet = {
            id,
            name: pet.name || 'Без имени',
            photo: pet.photo || './img/avatar.jpg',
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

        this.#pets.push(newPet);
        this._notifyObservers();
        return id;
    }

    addGalleryImage(petId, imageUrl) {
        const pet = this.#pets.find(p => p.id === petId);
        if (pet) {
            pet.gallery.push(imageUrl);
            this._notifyObservers();
        }
    }

    addVisit(petId, visit) {
        const pet = this.#pets.find(p => p.id === petId);
        if (pet) {
            pet.visits.push(visit);
            this._notifyObservers();
        }
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    #computeAge(birthday) {
        if (!birthday) return 0;
        const b = new Date(birthday);
        if (isNaN(b)) return 0;
        const diff = Date.now() - b.getTime();
        return Math.floor(diff / (365.25 * 24 * 3600 * 1000));
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer())
    }
}