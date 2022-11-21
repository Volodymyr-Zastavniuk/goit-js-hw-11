// import loadMore from '../index';

// export default class EndlessScroll {
//   constructor() {
//     this.options = { threshold: 0.5 };
//     this.target = 'null';
//     this.observer = new IntersectionObserver(this.onItersection, this.options);
//     this.loadMore = loadMore;
//   }
//   startObserver() {
//     this.target = document.querySelector('.gallery a:last-child');
//     this.observer.observe(this.target);
//   }

//   onItersection(entries, observer) {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         loadMore();

//         console.log('REMOVE OLD OBSERVER');
//         observer.unobserve(entry.target);
//       }
//     });
//   }
// }
