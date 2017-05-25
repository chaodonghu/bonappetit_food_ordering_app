$(() => {
  $.ajax({
    method: 'GET',
    url: '/users'
  }).done(users => {
    for (var user of users) {
      $('<div>').text(`${user.first_name}, ${user.last_name}, phone: ${user.phone}`).appendTo($('body'));
    }
  })
  console.log('app.js running')
  $.ajax({
    method: 'GET',
    url: '/restaurants'
  }).done(restaurants => {
    for(var restaurant of restaurants) {
      $('<div>').text(restaurant.name).appendTo($('body'));
    }
  })
})



