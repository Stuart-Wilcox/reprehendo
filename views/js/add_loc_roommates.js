function validate1(event){
  if(this.address.value.length < 1){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Please enter an address.
      </div>
      `);
    $("#address").focus();
    return;
  }
  if(this.city.value.length < 1){
    event.preventDefault();
    $("#alert-placeholder").html(`
      <br/>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Please enter an a city.
      </div>
      `);
    $("#city").focus();
    return;
  }
  this.address.value = santize(this.address.value);
  this.unit.value = santize(this.unit.value);
  this.city.value = santize(this.city.value);
  this.province.value = santize(this.province.value);
}


function validate2(event){
  if(this.username.value.length < 1){
    event.preventDefault();
    return;
  }
  this.username.value = sanitize(this.username.value);
}
