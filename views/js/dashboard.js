function getPath(text){
  var p = window.location.pathname;
  return (p + '/' + text).replace('//', '/');
}

console.log(getPath());
document.getElementById("view_chores").setAttribute('href', getPath('view_chores'));
document.getElementById("find_roommates").setAttribute('href', getPath('find_roommates'));
document.getElementById("messageboard").setAttribute('href', getPath('messageboard'));
document.getElementById("add_location_roommates").setAttribute('href', getPath('add_location_roommates'));
document.getElementById("schedule_chores").setAttribute('href', getPath('schedule_chores'));
document.getElementById("emergency_contact").setAttribute('href', getPath('emergency_contact'));
