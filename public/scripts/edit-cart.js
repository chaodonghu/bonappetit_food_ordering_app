// Function for editing items in cart
const editCart = (id, quantity) => {
  console.log("quantity and id", id, quantity);
  let cart = getCart()
  let matchingProduct = cart.foods.findIndex((food) => {
    return food.item_id === id;
  })
  // If new quantity is > 0, quantity will be updated
  if (quantity > 0) {
    cart.foods[matchingProduct].quantity = quantity;
    // Deletes item if quantity === 0
  } else {
    cart.foods.splice(matchingProduct, 1);
  }
  setCart(cart);
};

$(() => {
  $('#edit-item-quantity').on('click', (e) => {
    $(e.target).on('change', (e) => {
      let quantity = $(e.target).val();
      let item = $(e.target).closest('#edit-item-quantity');
      editCart(item.data('id'), quantity);
    })
  })
});
