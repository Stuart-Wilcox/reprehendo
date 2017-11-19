function sanitize(text){
  text = text.replace('<', '&lt;');
  text = text.replace('>', '&gt;');
  return text;
}
