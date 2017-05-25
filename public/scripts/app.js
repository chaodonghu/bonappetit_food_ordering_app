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

  $('#loginForm').on('submit', function(e) {
    e.preventDefault()

    let username = $('#username').val()
    let password = $('#pwd').val()

    $.ajax('/login', {
      method: 'POST',
      data: { username, password }
    })
    .done((data) => { if (data.length > 0) window.location.reload() })
    .fail(err => console.log(err))
  })
  $('#logout-btn').on('click', function(e) {
    e.preventDefault()
    console.log('clicked')
    $.ajax('/logout', {
      method: 'POST',
    }).done(() => {
      console.log('session cleared')
      window.location.reload()
    })
  })
})



