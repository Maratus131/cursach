import { RenderPosition, render } from "./framework/render.js";
import PetModel from "./model/petModel.js";
import PetsApiService from "./petsApiService.js";
import ContentPresenter from "./presenter/contentPresenter.js";
import SidebarPresenter from "./presenter/sidebarPresenter.js";
import FooterComponent from "./view/footerComponent.js";
import HeaderComponent from "./view/headerComponent.js";


const END_POINT = 'https://69283e14b35b4ffc5014d057.mockapi.io'
const bodyContainer = document.querySelector('.bodyContainer');
const asideContainer = document.querySelector('.asideContainer');
const contentContainer = document.querySelector('.mainContent')
const petModel = new PetModel({
    petsApiService: new PetsApiService(END_POINT)
});

const sidebarPresenter = new SidebarPresenter(asideContainer, petModel);
const contentPresenter = new ContentPresenter(contentContainer, petModel);

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
sidebarPresenter.init();
contentPresenter.init();
render(new FooterComponent(), bodyContainer, RenderPosition.BEFOREEND);