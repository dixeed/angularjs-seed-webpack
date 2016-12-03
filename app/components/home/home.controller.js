import data from './data.json';

HomeCtrl.$inject = [];

export default HomeCtrl;

function HomeCtrl() {
  this.content = data.content;
  this.subTitle = data.title;
}
