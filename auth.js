var sqlite3 = require('sqlite3');
module.exports = {
  create_token: function(){
    let key = '';
    for(var i = 0; i < 30; i++){
      key += String.fromCharCode(74*Math.random()+48);
    }
    return key;
  },
  auth: function(db, req){
    return new Promise((resolve, reject)=>{
      if(!req.get('cookie') || !req.get('cookie').includes('session-key=')){
        resolve(null);
        return null;
      }
      var token = req.get('cookie').slice(12);
      if(token.length == 0){
        resolve(null);
      }
      db.all("SELECT * FROM users WHERE session_key='" + token + "'", function(err, rows){
        if(err || rows.length>1){
          resolve(null);
          console.log(err);
          return null;
        }
        resolve(rows[0]);
      });
    });
  }

}
