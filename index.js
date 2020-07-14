
var score;
$('button').click(pingPongGame);
function pingPongGame(){
     score = 0;
    $('#player').css('display','none');
    var CurrentUser = $('#username').val();
    var user = localStorage.getItem(CurrentUser);
    if(CurrentUser!=user){
      alert("this is your first time")
      localStorage.setItem(CurrentUser,CurrentUser);
      localStorage.setItem(CurrentUser +'MaxScore',0);
    }
    alert("press Enter key to Start and press e to end the Game")
    $(document).keydown(function(event){
        if(event.key=='Enter')
        startGame(score,CurrentUser);
    })
}

function startGame(score,name){
  
   var boll = $('#bol');
   let height = window.innerHeight-27;
   let width = 35;
   var widthchk = true;
   var heightchk = true;
   var id = setInterval(() => {
    
       if(widthchk)
       {
           if(width<window.innerWidth-30)
            boll.css('left',width++);
           else{
             widthchk=false;
           }
       }else{
           if(width>0)
           boll.css('left',width--);
           else{
               widthchk=true;
           }
       }
    if(heightchk)
      {
          boll.css('top',height);
          height--;
          if(height<=20)
          {
           let coordinate_top = checkCoordinate();
           var ball = document.getElementById('bol');
           var ball_coordinate = ball.getBoundingClientRect();
           var slider = document.getElementById('container');
           var slider_coordinate = slider.getBoundingClientRect();
           if(ball_coordinate.x<slider_coordinate.x+150)
              widthchk = false;
              if(coordinate_top){
                heightchk = false;
              }else{
                  clearInterval(id);
                  endGame(score,name);
              }
            }
      }else{
           boll.css('top',height);
           height++;
        if(height>=window.innerHeight-50)
          { 
              score+=10;
             if(checkCoordinate()){
                 heightchk = true;
             }else{
                 clearInterval(id);
                 endGame(score,name);
             }
          }
      }
   },0);
   var shift = 0;
   $(document).keydown(function(event){
       if(event.key=='e')
           {
             clearInterval(id);
             endGame(score,name);
             return;
           }
        if(event.key=='d'){
            if(shift<=window.innerWidth-330){
              shift=shift+20;
              $('#container').css('left',shift);
            }       
        }else if(event.key=='a'){
            if(shift>=10){
              shift=shift-20;
              $('#container').css('left',shift);
            }
        }
   })
}

function checkCoordinate(){
    var bol = document.getElementById('bol');
    var bol_coordinate = bol.getBoundingClientRect();
    var slider = document.getElementById('container');
    var slider_coordinate = slider.getBoundingClientRect();
    if(bol_coordinate.x>=slider_coordinate.x&&bol_coordinate.x<=slider_coordinate.x+300)
    return true;
    else
    return false;
  }

function endGame(score,name){
    var username = localStorage.getItem(name);
    var maxScore = localStorage.getItem(name+'MaxScore');

    if(maxScore=='null')
        maxScore = 0;
    if(maxScore<score){
        localStorage.setItem(username+'MaxScore',score);
        alert(username +" "+"your MaxScore "+ score);
    }else{
        alert(username +" " + 'your Score is = '+ score);
    }
    alert('Press Enter to start again');
   return;
}

    