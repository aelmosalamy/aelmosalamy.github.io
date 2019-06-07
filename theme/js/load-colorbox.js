// sets a colorbox object for every element under the "mybox" class
$(document).ready(function(){
  $(".mybox").colorbox(
    {
    rel: "mybox",
    maxWidth:"90%",
    maxHeight:"90%",
    scrolling: false,
  });
});

// stops the document to scroll white colorbox is open
$(document).on('cbox_open', function() {
    $('body').css({ overflow: 'hidden' });
}).on('cbox_closed', function() {
    $('body').css({ overflow: '' });
});
