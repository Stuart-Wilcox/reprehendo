var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pageRouter = express.Router();
var router = express.Router();
var path = require('path');
var fs = require('fs');
var PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);

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
  console.log(req.body);
  res.send('OK');
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
  console.log(req.body);
  res.redirect('/users/' + req.body.email);
});

pageRouter.route('/users/:uname')
.get(function(req, res){
  fs.readFile(path.join(__dirname, 'views/html/dashboard.html'), 'utf-8', function(err, data){
    if(!err){
      data = data.replace("{{username}}", req.params.uname);
      res.send(data);
    }
  });
});

pageRouter.route('/users/:uname/view_chores')
.get(function(req, res){
  fs.readFile(path.join(__dirname, 'views/html/view_chores.html'), 'utf-8', function(err, data){
    if(!err){
      res.send(data);
    }
  });
});

pageRouter.route('/users/:uname/find_roommates')
.get(function(req, res){
  fs.readFile(path.join(__dirname, 'views/html/find_roomates.html'), 'utf-8', function(err, data){
    if(!err){
      res.send(data);
    }
  });
});

pageRouter.route('/users/:uname/messageboard')
.get(function(req, res){
  fs.readFile(path.join(__dirname, 'views/html/message_board.html'), 'utf-8', function(err, data){
    if(!err){
      res.send(data);
    }
  });
});

pageRouter.route('/users/:uname/add_location_roommates')
.get(function(req, res){
  fs.readFile(path.join(__dirname, 'views/html/add_loc_roommates.html'), 'utf-8', function(err, data){
    if(!err){
      res.send(data);
    }
  });
})
.post(function(req, res){
  console.log(req.body);
  res.redirect(`/users/${req.params.uname}/`);
});

pageRouter.route('/users/:uname/schedule_chores')
.get(function(req, res){
  fs.readFile(path.join(__dirname, 'views/html/schedule_chores.html'), 'utf-8', function(err, data){
    if(!err){
      res.send(data);
    }
  });
})
.post(function(req, res){
  console.log(req.body);
  res.redirect(`/users/${req.params.uname}/`);
});

pageRouter.route('/users/:uname/emergency_contact')
.get(function(req, res){
  fs.readFile(path.join(__dirname, 'views/html/emergency_contact.html'), 'utf-8', function(err, data){
    if(!err){
      res.send(data);
    }
  });
});


app.use(express.static('views'));
app.use('/', pageRouter)
app.use('/api', router);


app.listen(PORT);

console.log('Listening on port '+PORT+'...');
