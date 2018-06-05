$('#signup').click(function() {
  $('div.signup').toggle('medium');
})

$('#login').click(function() {
  $('div.login').toggle('medium');
})

$('.save-btn').click(function() {
  event.preventDefault();
  $(this).css('background-color', 'pink');
})
