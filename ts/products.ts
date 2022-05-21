import { products, Product } from './data.js';
import { addToCart } from './popup.js';

const listItems = document.querySelector('.main__items');

const allLinks: NodeListOf<HTMLLinkElement> =
   document.querySelectorAll('.main__link');

const range: HTMLInputElement | null = document.querySelector('.main__range');
const rangeValue = document.querySelector('.main__value');

const searchInput: HTMLInputElement | null =
   document.querySelector('.main__input');

const createItem = (item: Product) => {
   return `
		<div class="main__item item" id="${item.id}">
			<img src="${item.img}" class="item__img" />
			<span class="item__name">${item.name}</span>
			<span class="item__price">${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
         }).format(item.price)}</span>
		</div>
	`;
};

const fillListItems = (products: Product[]) => {
   listItems!.innerHTML = '';

   if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
         listItems!.innerHTML += createItem(products[i]);
      }
   }

   addToCart();
};

fillListItems(products);

const fillListItemsByGroup = (products: Product[], selectGroup: string) => {
   listItems!.innerHTML = '';

   if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
         if (products[i].group === selectGroup) {
            listItems!.innerHTML += createItem(products[i]);
         }
         if (selectGroup === 'All') {
            listItems!.innerHTML += createItem(products[i]);
         }
      }
   }

   addToCart();
};

allLinks.forEach((item) => {
   item.addEventListener('click', (e) => {
      e.preventDefault();

      let target = e.target as HTMLElement;

      allLinks.forEach((el) => {
         el.classList.remove('active-link');
      });

      fillListItemsByGroup(products, target.innerHTML);

      target.classList.add('active-link');

      range!.value = '6';
      rangeValue!.innerHTML = `$${range!.value}`;

      searchInput!.value = '';
   });
});

const fillListItemsByPrice = (products: Product[], selectPrice: number) => {
   listItems!.innerHTML = '';

   if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
         if (products[i].price > selectPrice) {
            listItems!.innerHTML += createItem(products[i]);
         }
      }
   }

   addToCart();
};

let timerId: number;

range!.addEventListener('input', () => {
   rangeValue!.innerHTML = `$${range!.value}`;
   searchInput!.value = '';

   allLinks.forEach((el) => {
      el.classList.remove('active-link');
   });

   clearTimeout(timerId);
   timerId = setTimeout(() => {
      if (range!.value) {
         fillListItemsByPrice(products, Number(range!.value));
      }
   }, 1000);
});

const fillListItemsBySearch = (products: Product[], str: string) => {
   listItems!.innerHTML = '';

   if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
         if (products[i].name.includes(str)) {
            listItems!.innerHTML += createItem(products[i]);
         }
      }
   }

   addToCart();
};

let searchTimerId: number;

searchInput!.addEventListener('input', () => {
   clearTimeout(searchTimerId);

   const newStr =
      searchInput!.value.charAt(0).toUpperCase() + searchInput!.value.slice(1);

   searchTimerId = setTimeout(() => {
      fillListItemsBySearch(products, newStr);
   }, 2000);
});

searchInput!.addEventListener('focus', () => {
   range!.value = '6';
   rangeValue!.innerHTML = `$${range!.value}`;

   allLinks.forEach((el) => {
      el.classList.remove('active-link');
   });

   fillListItems(products);
});
