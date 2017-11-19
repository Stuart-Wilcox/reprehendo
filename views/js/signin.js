function validate(event){
  if(this.email.value.length == 0){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Please enter an email.
      </div>
      `);
    $("#email").focus();
    return;
  }

  if(this.password.value.length < 8){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Please enter a valid password.s
      </div>
      `);
    $("#password").focus();
    return;
  }

  this.password.value = santize(this.password.value);
  this.email.value = santize(this.email.value);
}
