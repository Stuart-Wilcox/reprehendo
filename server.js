var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pageRouter = express.Router();
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sqlite3 = require('sqlite3');
var auth = require(path.join(__dirname, '/auth'));
let db = new sqlite3.Database('database.db');
var PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);

db.serialize(function(){
  db.run('CREATE TABLE if not exists users(username TEXT, email TEXT, password TEXT, session_key TEXT, expires INTEGER, property INTEGER)');
  db.run('CREATE TABLE if not exists roommates(uname1 TEXT, uname2 TEXT)');
  db.run('CREATE TABLE if not exists properties(id INTEGER, address TEXT, unit TEXT, city TEXT, province TEXT)');
  db.run('CREATE TABLE if not exists chore(name TEXT, person TEXT, date TEXT, time TEXT)');
  // db.run('DROP TABLE users');
  // db.run('DROP TABLE roommates');
  // db.run('DROP TABLE properties');
  // db.run('DROP TABLE chore');
});
//
 //db.close();

pageRouter.route('/')
.get(function(req, res){
  fs.readFile(path.join(__dirname, 'views/html/index.html'), 'utf-8', function(err, data){
    if(!err){
      res.send(data);
    }
  });
});

pageRouter.route('/signup')
.get(function(req, res){
  fs.readFile(path.join(__dirname, 'views/html/signup.html'), 'utf-8', function(err, data){
    if(!err){
      res.send(data);
    }
  });
})
.post(function(req, res){
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  db.all("SELECT * FROM users WHERE username='"+ username +"'", function(err, rows){
    if(err || rows.length > 0){
      res.redirect('/signup');
    }else{
      var stmt = "INSERT INTO users(username,password) VALUES ('"+ username +"','"+ password +"')";
      db.run(stmt);
      res.redirect('/signin');
    }
  });
});

pageRouter.route('/signin')
.get(function(req, res){
  fs.readFile(path.join(__dirname, 'views/html/signin.html'), 'utf-8', function(err, data){
    if(!err){
      res.send(data);
    }
  });
})
.post(function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  db.all("SELECT * FROM users WHERE username='"+username+"'", function(err, rows){
    if(err || rows.length != 1){
      console.log(err);
      res.redirect('/signin');
      return;
    }
    var user = rows[0];
    if(user.password != password){
      res.redirect('/signin');
    }
    else{
      let key = '';
      for(var i = 0; i < 30; i++){
        key += String.fromCharCode(74*Math.random()+48);
      }
      db.run('UPDATE users SET session_key = ?, expires = ? WHERE username = ?', [key, 10000, username]);
      res.set('Set-Cookie', 'session-key='+key);
      res.redirect('/users/'+username+"/");
    }
  });
});

pageRouter.route('/users/:uname')
.get(function(req, res){
  auth.auth(db, req).then((data)=>{
    if(!data){
      res.redirect('/');
      return;
    }
    else{
      fs.readFile(path.join(__dirname, 'views/html/dashboard.html'), 'utf-8', function(err, file){
        if(!err){
          file = file.replace("{{username}}", req.params.uname);
          console.log(data.property);
          db.all('SELECT * FROM properties WHERE id="'+ data.property +'"', function(err, rows){
            console.log(rows);
            if(err || rows.length != 1){
              return;
            }
            file = file.replace('{{address}}', rows[0].address);
          });
          file = file.replace('{{address}}', "");
          file = file.replace("{{roommates}}", "");
          res.send(file);
        }
      });
    }
  });
});

pageRouter.route('/users/:uname/view_chores')
.get(function(req, res){
  auth.auth(db, req).then((data) =>{
    if(!data){
      res.redirect('/');
      return;
    }else{
      fs.readFile(path.join(__dirname, 'views/html/view_chores.html'), 'utf-8', function(err, data){
        if(!err){
          var uname = req.params.uname;

          res.send(data);
        }
      });
    }
  })
});

pageRouter.route('/users/:uname/find_roommates')
.get(function(req, res){
  auth.auth(db, req).then((data)=>{
    if(!data){
      res.redirect('/');
      return;
    }else{
      fs.readFile(path.join(__dirname, 'views/html/find_roomates.html'), 'utf-8', function(err, data){
        if(!err){
          res.send(data);
        }
      });
    }
  })
})
.post(function(req, res){
  res.redirect('/users/'+req.params.uname+"/find_roommates/");
});

pageRouter.route('/users/:uname/messageboard')
.get(function(req, res){
  auth.auth(db, req).then((data)=>{
    if(!data){
      res.redirect('/');
      return;
    }else{
      fs.readFile(path.join(__dirname, 'views/html/message_board.html'), 'utf-8', function(err, data){
        if(!err){
          res.send(data);
        }
      });
    }
  })
});

pageRouter.route('/users/:uname/add_location_roommates')
.get(function(req, res){
  auth.auth(db, req).then((data)=>{
    if(!data){
      res.redirect('/');
      return;
    }else{
      fs.readFile(path.join(__dirname, 'views/html/add_loc_roommates.html'), 'utf-8', function(err, data){
        if(!err){
          res.send(data);
        }
      });
    }
  });
})
.post(function(req, res){
  auth.auth(db, req).then((data)=>{
    if(!data){
      res.redirect('/');
      return;
    }else{
      if(req.body.username){
        db.run("UPDATE roommates SET user1=?, user2=?", [req.params.uname, req.body.username]);
      }else{
        var id = 10000*Math.random();
        var address = req.body.address;
        var unit = req.body.unit;
        var city = req.body.city;
        var province = req.body.province;
        db.run('UPDATE properties SET id=?,address=?, unit=?, city=?, province=?', [id, address, unit, city, province]);
        db.run('UPDATE users SET property=? WHERE username=?', [id, req.params.uname]);
      }

    res.redirect(`/users/${req.params.uname}/`);
    }
  });
});

pageRouter.route('/users/:uname/schedule_chores')
.get(function(req, res){
  auth.auth(db, req).then((data)=>{
    if(!data){
      res.redirect('/');
      return;
    }else{
      fs.readFile(path.join(__dirname, 'views/html/schedule_chores.html'), 'utf-8', function(err, data){
        if(!err){
          res.send(data);
        }
      });
    }
  });
})
.post(function(req, res){
  auth.auth(db, req).then((data)=>{
    if(!data){
      res.redirect('/');
      return;
    }else{
      var name = req.body.name;
      var person = req.body.person;
      var date = req.body.date;
      var time = req.body.time;

      db.run('UPDATE chore SET name=?,person=?,date=?,time=?', [name, person, date, time]);
      res.redirect(`/users/${req.params.uname}/`);
    }
  });
});

pageRouter.route('/users/:uname/emergency_contact')
.get(function(req, res){
  auth.auth(db, req).then((data)=>{
    if(!data){
      res.redirect('/');
      return;
    }else{
      fs.readFile(path.join(__dirname, 'views/html/emergency_contact.html'), 'utf-8', function(err, data){
        if(!err){
          res.send(data);
        }
      });
    }
  });
});

pageRouter.route('/logout')
.get(function(req, res){
  auth.auth(db, req).then((data)=>{
    if(!data){
      res.redirect('/');
      return;
    }else{
      res.set('Set-Cookie', 'session-key=none');
      db.run('UPDATE users SET session_key = ?, expires = ? WHERE username = ?', ['', 0, data.username]);
      res.redirect('/');
    }
  });
});


app.use(express.static('views'));
app.use('/', pageRouter)
app.use('/api', router);


app.listen(PORT);

console.log('Listening on port '+PORT+'...');
