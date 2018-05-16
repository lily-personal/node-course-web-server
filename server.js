const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n');
  next();
})
app.use(express.static(__dirname+'/public'));

//app.use((req,res,next)=>{
//  res.render('Maintenance.hbs');
//})

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    WelcomeMessage:'Welcome to our website.',
    currentYear: new Date().getFullYear()
    });
});

app.get('/About',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/Project',(req,res)=>{
  res.render('project.hbs',{
    pageTitle:'Project Page',
    currentYear: new Date().getFullYear()
  });
});
app.get('/Bad',(req,res)=>{
  res.send({
    ErrorMessage:'The link does not exist',
    ErrorNumber:200
  });
});

app.listen(port,()=>{
  console.log(`The server is listening on port ${port}`);
});
