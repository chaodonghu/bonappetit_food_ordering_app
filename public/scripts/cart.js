// Dong - Checks for localStorage. If it doesn't exist, it creates an instance of localStorage
// and returns it. If it does exist, it returns localStorage.
const getCart = () => {
  if (!localStorage.getItem('cart')) {
    const cart = {}
    cart.foods= []
    return cart;
  } else {
    return JSON.parse(localStorage.getItem('cart'));
  }
}
// Sets localStorage to cart.
const setCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}
// Adds items to cart/localStorage. Updates quantity if item is already in cart.
const addItem = (id, name, price, img) => {
  let cart = getCart();
  let matchingProduct = cart.foods.findIndex((food) => {
    return food.item_id === id;
  })
  if (matchingProduct === -1) {
    const food = {};
    food.item_id = id;
    food.name = name;
    food.price = price;
    food.image_url = img;
    food.quantity = 1;
    cart.foods.push(food)
  } else {
    cart.foods[matchingProduct].quantity += 1;
  }
  setCart(cart)
}

function toggleTotal() {

  //
  // $('.delete-item').on('click', () => {
  //   console.log('total subtracted')
  //   $('.total-amount').html('').append(roundMoney(createSubtotal() * 1.13).toFixed(2));
  // });
  //
  // $('.edit-item-quantity').on('click', (e) => {
  //   $(e.target).on('change', (e) => {
  //     $('.total-amount').html('').append(roundMoney(createSubtotal() * 1.13).toFixed(2));
  //   })
  // })
}
