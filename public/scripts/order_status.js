$(document).ready(function () {
  let isEmpty = false;

  $('.txt-input').on('input blur', function() {
    let chars = $(this).val();

    if (!chars.trim()) {
      isEmpty = true;
    } else {
      isEmpty = false;
    }
  });


  $('.oid').on('submit', function(event) {
    event.stopPropagation();
    event.preventDefault();

    let id = $(this).data('id');
    let val = Number($(this).find('.txt-input').val());

    const timeData = {
      id: id,
      val: val
    }

    if (isEmpty) {
      alert('Please enter time in minutes to continue.');
      return;
    }

    $.ajax('/admin/order_status', {
        method: 'post',
        data: timeData
    })
    .then(function() {
      $('.txt-input').val('');
    })
    .fail(function(error) {
      //display any errors
        console.error(error);
    });
    return;
  });

  $('.done').on('submit', function(event) {
    event.stopPropagation();
    event.preventDefault();


    let id = $(this).data('id');
    let done = true;
    let notDone =false;

    const status = {
      id: id,
      done: done,
      notDone: notDone
    }

    $.ajax('/admin/done', {
          method: 'post',
          data: status
      })
      .then(function() {
        $('.txt-input').val('');
      })
      .fail(function(error) {
        //display any errors
        console.error(error);
      });
      return;
  });
});
