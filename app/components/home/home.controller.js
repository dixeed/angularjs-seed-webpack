import data from './data.json';
import imgTest from 'resolve-test.jpg';

export default class HomeComponent {
  constructor() {
    'ngInject';

    this.content = data.content;
    this.subTitle = data.title;
    this.imgSrc = imgTest;
  }

  $onInit() {
    this.input = '';
  }
}
