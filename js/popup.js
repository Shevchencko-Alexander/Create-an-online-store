import { cartItems, updateLocal, cartCount, fillListItemsCart, } from './cart.js';
import { products } from './data.js';
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');
const popupBtnNo = document.querySelector('.no');
const popupBtnYes = document.querySelector('.yes');
popupBtnNo.addEventListener('click', () => {
    popup.classList.remove('visible');
    popupContent.classList.remove('popup__visible-content');
    cartItems.pop();
});
popupBtnYes.addEventListener('click', () => {
    popup.classList.remove('visible');
    popupContent.classList.remove('popup__visible-content');
    updateLocal();
    cartCount();
    fillListItemsCart(cartItems);
});
export const addToCart = () => {
    const allItems = document.querySelectorAll('.main__item');
    allItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            const target = e.target;
            popup.classList.add('visible');
            popupContent.classList.add('popup__visible-content');
            cartItems.push(products[Number(target.id)]);
        });
    });
};
