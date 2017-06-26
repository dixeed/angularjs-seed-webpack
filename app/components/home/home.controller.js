import data from './data.json';
import imgTest from 'resolve-test.jpg';

export default class HomeComponent {
  constructor($log) {
    'ngInject';

    this.content = data.content;
    this.subTitle = data.title;
    this.imgSrc = imgTest;
    this.$log = $log;
  }

  $onInit() {
    this.input = '';
    // object rest/spread test
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    this.$log.log(x); // 1
    this.$log.log(y); // 2
    this.$log.log(z); // { a: 3, b: 4 }
  }
}
