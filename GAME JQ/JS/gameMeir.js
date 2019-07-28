var gel = {

  t_jump: 300,
  t_rot: 2,
  t_play: 60,
  play: false,
  good_p: 0,
  bad_p: 0,
  level: 1,
  points: 0,
  level_point: 10,
  max_level: 5,
  record_list: [],
  new_row: {},
  min_rec: 0,
  record_str: "",
  ttt : null,
  
  tonull: function() {
    this.t_jump = 300;
    this.rot = 2;
    this.t_play = 6;
    this.play = false;
    this.good_p = 0;
    this.bad_p = 0;
    this.level = 1;
    this.points = 0;
    this.level_point = 10;
    this.max_level = 5;
    this.record_list = [];
    this.new_row = {};
    this.min_rec = 0;
    this.record_str = "";
    clearTimeout(this.ttt);

  }, 

  start_but: document.getElementById('start'),
  stop_but: document.getElementById('stop'),
  field: document.getElementById('field'),
  target: document.getElementById('target'),
  timeD: document.getElementById('timeD'),
  pointsD: document.getElementById('pointsD'),
  toleD: document.getElementById('toleD'),

  target_w: target.offsetWidth,
  target_h: target.offsetHeight,
  x_max: document.getElementById('field').offsetWidth,
  y_max: document.getElementById('field').offsetHeight,
}



gel.x_max -= gel.target_w;
gel.y_max -= gel.target_h;

// gel.start_but.addEventListener("click", startGame);
// gel.stop_but.addEventListener("click", stopGame);

// document.getElementById('continue').addEventListener("click", startGame);
// document.getElementById('newgame').addEventListener("click", newGame);


function newGame () {
  gel.tonull();
  startGame();
  start_local()
}

function startGame () {
  gel.play=true;
  toleD.textContent = gel.level_point;
  display_from_class('stop', 'bb');
  document.getElementById('stop').addEventListener("click", stopGame);
  display_from_class('field', 'ff');
  gel.pointsD.textContent = gel.points;
  gel.target.addEventListener("mousemove", startMove);
  gel.target.addEventListener("click", targetClick);
  gel.field.addEventListener("click", fieldClick);
  gel.target.style.animation ='t_rot '+gel.t_rot+'s infinite linear';
  // clearTimeout(tt);
  timeGame();
  start_local()
  
}

function stopGame () {
  gel.play=false;
  gel.target.removeEventListener("mousemove", startMove);
  display_from_class('continue', 'bb');
  document.getElementById('continue').addEventListener("click", startGame);
  gel.target.style.animation = 'none';
  gel.target.removeEventListener("click", targetClick);
  gel.field.removeEventListener("click", fieldClick);
  targetMove ()
  clearTimeout(gel.ttt); 
}

function endGame () {
  gel.play=false;
  gel.target.removeEventListener("mousemove", startMove);
  display_from_class('newgame', 'bb');
  document.getElementById('newgame').addEventListener("click", newGame);
  display_from_class('field', 'ff');
  gel.target.style.animation = 'none';
  gel.target.removeEventListener("click", targetClick);
  gel.field.removeEventListener("click", fieldClick);
  targetMove ()
  clearTimeout(gel.ttt); 
}


function display_from_class (x,y) {
  field_obj = document.getElementsByClassName(y);
  for (var i = 0; i < field_obj.length; i++) field_obj[i].style.display ="none";
  document.getElementById(x).style.display = "block";
}

function startMove() {
   setTimeout(targetMove, gel.t_jump);
   gel.target.removeEventListener("mousemove", startMove);
}
function targetMove () {
  if (gel.play) {
    target.style.top = Math.floor((Math.random() * gel.y_max) + 1)+'px';
    target.style.left = Math.floor((Math.random() * gel.x_max) + 1)+'px';
    gel.target.addEventListener("mousemove", startMove);
    // console.log(t_test*10 + " " + gel.t_jump + " " + gel.t_rot);
    t_test = 0;
    
  } 
  else {
    
    target.style.top = 0+'px';
    target.style.left = 0+'px';
  }
}


function targetClick () {
  if(gel.play) { 
    gel.good_p++;
    gel.bad_p--;
    gel.points +=  10 * gel.level
    if(gel.good_p !== gel.level_point) gel.points += gel.level;
    gel.toleD.textContent = gel.level_point-gel.good_p;
    gel.pointsD.textContent = gel.points;
    console.log(gel.points)
    if (gel.good_p >= gel.level_point) startLevel();
    
  }
  
}

function fieldClick () {
  if(gel.play) {
    gel.bad_p++;
    gel.points -= gel.level;
    gel.pointsD.textContent = gel.points;
  };
}

function startLevel (){
    if (gel.level<gel.max_level) { 
      gel.t_jump -= 50;
      gel.t_rot -= 0.25;
      gel.level++;
      gel.good_p = 0;
      gel.bad_p = 0;
      gel.t_play +=10;
      stopGame();
      display_from_class('new_level', 'bb');
      document.getElementById('new_level').addEventListener("click", startGame);
      lev.textContent = `${gel.level}`;
    } 
    else {
    winGame();
    }
  
}



function winGame () {
  stopGame();
  display_from_class('wingame', 'bb');
  if (gel.points > gel.min_rec) {
    display_from_class('newRecord', 'ff');
    document.getElementById('sub').addEventListener("click", toList);
  } 
  else 
  { 
    document.getElementById('wingame').addEventListener("click", newGame);
  }
}


function timeGame () {
  if (gel.t_play > 0) {
    gel.t_play--;
    gel.timeD.textContent = gel.t_play;
    timer();
  }
  else {
    display_from_class ("newgame", "bb");
    display_from_class ("timeOver", "ff");
    times.textContent = gel.good_p;
    poi.textContent = gel.points;
    changeClass("bigPOP","hover_bkgr_fricc0","hover_bkgr_fricc");
    document.getElementById('endBigPOP')
    times1.textContent = gel.good_p;
    poi1.textContent = gel.points;
    document.getElementById('endBigPOP').addEventListener("click", function () { changeClass("bigPOP","hover_bkgr_fricc","hover_bkgr_fricc0");});
    // setTimeout(alert(`You hit the target ${gel.good_p} times. And get ${gel.points} points.`),1000);
    if (gel.points > gel.min_rec) {
      display_from_class('newRecord', 'ff');
      document.getElementById('sub').addEventListener("click", toList);
    } 
    else { 
      document.getElementById('newgame').addEventListener("click", newGame);
    }
  }
}
 
// var ttt;
function timer() {
    gel.ttt = setTimeout(timeGame, 1000);
}


// var t_test =0;
// function timeTest () {
//   t_test++;
//   timerTest();
//   }


// var tt;
// function timerTest() {
//     tt = setTimeout(timeTest, 10);
// }



Date.prototype.ddmmyyyy = function() {
  
  var mm = this.getMonth() + 1; 
  var dd = this.getDate();

  return [(dd>9 ? '' : '0') + dd,
          (mm>9 ? '' : '0') + mm,
          this.getFullYear()
         ].join('.');
};

function today () {
  var date = new Date();
return date.ddmmyyyy();
}



function newRecord () {
  stopGame();
  display_from_class("newRecord","ff");
  gel.start_but.removeEventListener("click", startGame);
}


class r_row {
  constructor(point, name, date) {
    this.point = point;
    this.name = name;
    this.date = date;
  }
}

function toList () {
      
    gel.new_row = new r_row (
    gel.points,
    document.getElementById("name").value,
    today()
    );
    
    // console.log(gel.new_row);
    // console.log(typeof gel.record_list);
    // console.log(typeof JSON.parse(localStorage.getItem("goodList")));
    // console.log(JSON.parse(localStorage.getItem("goodList")) != null);
      if (JSON.parse(localStorage.getItem("goodList"))) {
        console.log("ku");

        gel.record_list = JSON.parse(localStorage.getItem("goodList"));
        gel.record_list.push(gel.new_row);
        gel.record_list.sort(function(a,b) {return b.point-a.point});
        if (gel.record_list.length<=5) {
          gel.min_rec = gel.record_list[gel.record_list.length-1].point;
        } 
        else {
        gel.min_rec = gel.record_list[4].point;
        gel.record_list=gel.record_list.slice(0, 5);
        }
        console.log(gel.record_list);
        
      }
      else {
        gel.record_list[0] = gel.new_row;
        gel.min_rec = gel.record_list[0].point;
        console.log(gel.record_list[0]);
        console.log(gel.min_rec);
      }


      localStorage.setItem("goodList", JSON.stringify(gel.record_list));
      console.log(JSON.parse(localStorage.getItem("goodList")));
      listDisp ();
      endGame();
}



function listDisp() {
  var rec_dis = document.getElementById("recordList");
  // recordList.appendChild("<p>")
  gel.record_str ='';
  for (let i = 0; i < ((gel.record_list.length<5) ? gel.record_list.length : 5); i++) { 
  gel.record_str += `<div id = 'r${i+1}' class="popup" onmouseenter="popUp('myPopup${i+1}','show')" onmouseleave="popUp('myPopup${i+1}','show')" >${gel.record_list[i].name} - ${gel.record_list[i].point}
  <span class="popuptext" id="myPopup${i+1}">${gel.record_list[i].date}</span>
  </div> <br>`;
  }
 
  
  rec_dis.innerHTML = gel.record_str;
  console.log(gel.record_str);
  
  }

function changeClass(x,y,z) {
    var el = document.getElementById(x);
    el.classList.remove(y);
    el.classList.add(z);
}



// Get element by id = "x", and set him class "y".
function popUp(x,y) {
  var popup = document.getElementById(x);
  popup.classList.toggle(y);
}
// 
function new_local () {
  var record_list0 =[];
  // var r_row1, r_row2, r_row3 = new r_row;
  r_row1 = new r_row ( 5, "David", "7.12.1974" );
  r_row2 = new r_row ( 6, "Shlomo", "17.19.1994" );
  r_row3 = new r_row ( 7, "Daniel", "27.30.2014" );
  r_row4 = new r_row ( 8, "Moshe", "27.24.2017" );
  r_row5 = new r_row ( 9, "Ruven", "27.15.2019" );
    
  record_list0 = [ r_row1, r_row2, r_row3, r_row4, r_row5];
  localStorage.setItem("goodList", JSON.stringify(record_list0));
  console.log(JSON.parse(localStorage.getItem("goodList")));
  start_local();
}

function removeLocal () {
  localStorage.removeItem("goodList");
  gel.record_list = [];
  gel.min_rec =0;
  listDisp ();
}

function start_local() {
  if (JSON.parse(localStorage.getItem("goodList"))) {
    document.getElementById('clRec').addEventListener("click", removeLocal);
    document.getElementById('exaRec').addEventListener("click", new_local);
    gel.record_list = JSON.parse(localStorage.getItem("goodList"));
  
    listDisp();
    gel.record_list = JSON.parse(localStorage.getItem("goodList"));
    gel.min_rec = gel.record_list[gel.record_list.length-1].point;
  } 
  // else {
    // new_local () 
    // gel.record_list = JSON.parse(localStorage.getItem("goodList"));
    // listDisp();
    // gel.record_list = JSON.parse(localStorage.getItem("goodList"));
    // gel.min_rec = gel.record_list[gel.record_list.length-1].point;
  // }

  display_from_class('start', 'bb');
  gel.start_but.addEventListener("click", newGame);

}


// function time_overalert() {
//   $(".trigger_popup_fricc").click(function(){
//      $('.hover_bkgr_fricc').show();
//   });
//   $('.hover_bkgr_fricc').click(function(){
//       $('.hover_bkgr_fricc').hide();
//   });
//   $('.popupCloseButton').click(function(){
//       $('.hover_bkgr_fricc').hide();
//   });
// };