$('#devour').click(function(){
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