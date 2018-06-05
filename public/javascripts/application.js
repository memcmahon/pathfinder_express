$('#signup').click(function() {
  $('div.signup').toggle('medium');
})

$('#login').click(function() {
  $('div.login').toggle('medium');
})

$('.save-btn').click(function() {
  var trail_id = this.getAttribute('data-trail');
  event.preventDefault();
  $(this).css('background-color', '#E8EBF1');
  $(this).text('Saved');
  $.post("/mytrails", { trail_id: trail_id });
})
