$(() => {
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

    $.ajax('/logout', {
      method: 'POST',
    }).done(() => {
      console.log('session cleared')
      window.location.reload()
    })
  })

  $('.restaurant-auth').on('submit', function(e) {
    e.preventDefault()

    let restaname = $('#restaname').val()
    let password = $('#pwd').val()

    $.ajax('/restaurants/login', {
      method: 'POST',
      data: { restaname, password }
    })
    .done((data) => { if (data.length > 0) window.location.reload() })
    .fail(err => console.log(err))
  })
})
