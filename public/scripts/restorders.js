$(() => {
  $('.ready-btn').click(function() {
    let orderID = $(this).closest('li').data('id');
    $.ajax(`/restaurants/complete`, {
      method: 'POST',
      data: { orderID }
    })
    .done(() => console.log('req sucessfull'))
    .fail(err => console.log(err));
  })
});
