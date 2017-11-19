function validate(event){
  if(this.username.value.length == 0){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Please enter a username.
      </div>
      `);
    $("#username").focus();
    return;
  }

  if(this.password.value.length < 8){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Please enter a valid password.
      </div>
      `);
    $("#password").focus();
    return;
  }

  this.password.value = santize(this.password.value);
  this.username.value = santize(this.username.value);
}
