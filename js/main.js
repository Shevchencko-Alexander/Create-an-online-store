import { products } from './data.js';
const listItems = document.querySelector('.featured__items');
const createItem = (item) => {
    return `
		<div class="featured__item item">
			<img src="${item.img}" class="item__img" />
			<span class="item__name">${item.name}</span>
			<span class="item__price">${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(item.price)}</span>
		</div>
	`;
};
const fillListItems = (products) => {
    listItems.innerHTML = '';
    if (products.length > 0) {
        for (let i = 0; i < 3; i++) {
            listItems.innerHTML += createItem(products[i]);
        }
    }
};
fillListItems(products);
