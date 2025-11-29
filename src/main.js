import { RenderPosition, render } from "./framework/render.js";
import PetModel from "./model/petModel.js";
import ContentPresenter from "./presenter/contentPresenter.js";
import SidebarPresenter from "./presenter/sidebarPresenter.js";
import FooterComponent from "./view/footerComponent.js";
import HeaderComponent from "./view/headerComponent.js";

const bodyContainer = document.querySelector('.bodyContainer');
const asideContainer = document.querySelector('.asideContainer');
const contentContainer = document.querySelector('.mainContent')
const petModel = new PetModel();
const sidebarPresenter = new SidebarPresenter(asideContainer, petModel);
const contentPresenter = new ContentPresenter(contentContainer, petModel);

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
sidebarPresenter.init();
contentPresenter.init();
render(new FooterComponent(), bodyContainer, RenderPosition.BEFOREEND);