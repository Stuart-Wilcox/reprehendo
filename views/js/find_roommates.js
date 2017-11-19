function validate(event){
  if(this.q.value.length < 1){
    event.preventDefault();
    return;
  }
  this.q.value = sanitize(this.q.value);
}
