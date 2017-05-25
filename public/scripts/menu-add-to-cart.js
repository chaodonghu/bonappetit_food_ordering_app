
$(() => {
  $('#shopping-cart').text(' 0')
  const cart = {}
  cart.foods = []

  let cartItemCount = 0;

  $('.add-item').on('click', (e) => {

    let element = $(e.target);
    let item = element.closest('#item-details');
    cartItemCount += 1

    $('#shopping-cart').text(' ' + cartItemCount)
    addItem(item.data('id'), item.data('name'), item.data('price'), item.data('image-url'))
  })
});

// function renderMiniCart(items) {
//   items.forEach((i) => {
//
//     $('#cart-div').append("<div>" + item.name + "</div>");
//   })
// }
