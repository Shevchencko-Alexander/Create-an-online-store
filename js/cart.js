const body = document.body;
const listItemsCart = document.querySelector('.cart__elems');
const cart = document.querySelector('.cart');
const cartContent = document.querySelector('.cart__content');
const cartBtnOpen = document.querySelector('.header__bag');
const cartBtnClose = document.querySelector('.cart__close');
const cartBtnCheckout = document.querySelector('.cart__checkout');
const cartItemsCounts = document.querySelector('.header__counts');
const cartTotalValue = document.querySelector('.cart__total-result');
export let cartItems = !localStorage.cartItems
    ? []
    : JSON.parse(localStorage.getItem('cartItems'));
export const updateLocal = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
export const cartCount = () => {
    if (cartItems.length > 0) {
        let count = cartItems.length;
        cartItemsCounts.innerHTML = count.toString();
        cartItemsCounts.classList.add('visible');
    }
    else {
        cartItemsCounts.classList.remove('visible');
    }
};
cartCount();
cartBtnCheckout.addEventListener('click', () => {
    const order = {
        cartItems,
        value: cartTotalValue.textContent,
    };
    localStorage.setItem('order', JSON.stringify(order));
});
cartBtnClose.addEventListener('click', () => {
    cart.classList.remove('visible');
    cartContent.classList.remove('cart__visible-content');
    body.classList.remove('noScroll');
});
cartBtnOpen.addEventListener('click', () => {
    cart.classList.add('visible');
    cartContent.classList.add('cart__visible-content');
    body.classList.add('noScroll');
});
const createItemCart = (elem) => {
    return `
			<div class="cart__elem elem" id="${elem.id}">
				<div class="elem__body">
					<img src="${elem.img}" class="elem__img" />
					<div class="elem__info">
						<h3 class="elem__title">${elem.name}</h3>
						<span class="elem__price">${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(elem.price)}</span>
						<span class="elem__remove" id="${elem.id}">remove</span>
					</div>
				</div>
				<div class="elem__count">
					<img
						src="./img/cart/arrowUp.svg"
						class="elem__arrow-up"
						id="${elem.id}"
					/>
					<span class="elem__counts">${elem.count}</span>
					<img
						src="./img/cart/arrowDown.svg"
						class="elem__arrow-down"
						id="${elem.id}"
					/>
				</div>
			</div>
		`;
};
const cartValue = () => {
    let value = 0;
    cartItems.forEach((elem) => {
        value += elem.price * elem.count;
    });
    cartTotalValue.innerHTML = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};
const addDeleteCartItem = () => {
    const allAddBtn = document.querySelectorAll('.elem__arrow-up');
    const allDeleteBtn = document.querySelectorAll('.elem__arrow-down');
    const allCartItems = document.querySelectorAll('.cart__elem');
    allAddBtn.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const target = e.target;
            allCartItems.forEach((el, index) => {
                if (target.id === el.id) {
                    cartItems[index].count += 1;
                    updateLocal();
                    fillListItemsCart(cartItems);
                }
            });
        });
    });
    allDeleteBtn.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const target = e.target;
            allCartItems.forEach((el, index) => {
                if (target.id === el.id) {
                    if (cartItems[index].count > 1) {
                        cartItems[index].count -= 1;
                    }
                    else {
                        cartItems.splice(index, 1);
                        updateLocal();
                        cartCount();
                        fillListItemsCart(cartItems);
                    }
                    updateLocal();
                    fillListItemsCart(cartItems);
                }
            });
        });
    });
};
const removeCartItem = () => {
    const allRemoveBtn = document.querySelectorAll('.elem__remove');
    const allCartItems = document.querySelectorAll('.cart__elem');
    allRemoveBtn.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const target = e.target;
            allCartItems.forEach((el, index) => {
                if (target.id === el.id) {
                    cartItems.splice(index, 1);
                    updateLocal();
                    cartCount();
                    fillListItemsCart(cartItems);
                }
            });
        });
    });
};
export const fillListItemsCart = (cartItems) => {
    listItemsCart.innerHTML = '';
    if (cartItems.length > 0) {
        for (let i = 0; i < cartItems.length; i++) {
            listItemsCart.innerHTML += createItemCart(cartItems[i]);
        }
    }
    removeCartItem();
    addDeleteCartItem();
    cartValue();
};
fillListItemsCart(cartItems);
