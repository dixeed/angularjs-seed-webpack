import data from './data.json';

export default class HomeComponent {
  constructor() {
    'ngInject';

    this.content = data.content;
    this.subTitle = data.title;
  }
}
