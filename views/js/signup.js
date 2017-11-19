function validate(event){
  if(this.password.value.length < 8){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Passwords must be at least 8 characters.
      </div>
      `);
      this.password.value = "";
      this.password2.value = "";
      $('#password').focus();
      return;
  }else{
    $("#alert-placeholder").html("");
  }

  if(this.password.value != this.password2.value){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Passwords did not match.
      </div>
      `);
    this.password.value = "";
    this.password2.value = "";
    $('#password').focus();
  }
  else{
    $("#alert-placeholder").html("");
  }

  if(this.username.value.length < 5){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Username must be at least 5 characters long.
      </div>
      `);
      $("#username").focus();
      return;
  }

  this.password.value = sanitize(this.password.value);
  this.email.value = sanitize(this.email.value);
  this.password1.value = sanitize(this.email.value);
}
