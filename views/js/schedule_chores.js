function validate(event){
  if(this.date.value.length < 2){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Please enter a date.
      </div>
      `);
    $("#date").focus();
    return;
  }

  if(this.time.value.length < 2){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Please enter a time.
      </div>
      `);
    $("#time").focus();
    return;
  }

  $('#name').val(sanitize($("#name").val()));

}
