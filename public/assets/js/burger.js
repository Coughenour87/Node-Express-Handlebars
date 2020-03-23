console.log('loaded')
$('.devour').click(function(){
    console.log('test')
  const id = $(this).val()
  $.ajax({
      method: 'PUT',
      url:'/api/burger/'+id
  }).then(results=>{
      if(results ==='OK'){
        location.reload()
      }
  })
})

$("#addburger").on("submit", function(event) {
  event.preventDefault();
  console.log("hello");
  var newBurger = {
      burger: $("#theBurgerName").val().trim()
  };
  $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
  }).then(
      function() {
        console.log("added new burger");
        location.reload();
      }
  );
});