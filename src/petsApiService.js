import ApiService from "./framework/view/apiService.js";

const Method = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};

export default class PetsApiService extends ApiService {
    get pets() {
        return this._load({ url: 'pet' })
            .then(ApiService.parseResponse);
    }

    async addPet(pet) {
        const response = await this._load({
            url: 'pet',
            method: Method.POST,
            body: JSON.stringify(pet),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return ApiService.parseResponse(response);
    }

    async updatePet(pet) {
        const response = await this._load({
            url: `pet/${pet.id}`,
            method: Method.PUT, 
            body: JSON.stringify(pet),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return ApiService.parseResponse(response);
    }
}