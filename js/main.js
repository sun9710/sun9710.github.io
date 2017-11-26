

/** 申敏锐 17/11/18 20:23
  ！！！window.onload无法访问外部的turn变量
  ！！！window.onload无法访问外部的turn变量
  ！！！window.onload无法访问外部的turn变量   */
/*
var lyrics[0]="[00:00.80]带你去旅行
var lyrics[1]="[00:01.25]逆流成河
var lyrics[2]="[00:00.61]在人间 
var lyrics[3]="[00:00.07]尽头 
*/
window.onload=function(){
    onload1();
    onload2();
    // setBgImage();
}
//playerControl的window.onload()函数
//window.onload=function(){
function onload1(){
    var geciDIV = document.getElementById('geciDIV');
    var geciUL = document.getElementById('geciUL');
    var audio=document.getElementById('audio');
    var playListUL = document.getElementById('playListUL');
    var sum = 0;//记录当前播放歌曲的顺序(从0开始)
usualLyicsSet (lyrics[sum]);//对歌词文件的初始化     

//播放列表事件的触发函数---->playPlayList()
function  playPlayList(event0) {
        for (var i = 0; i < playListUL.children.length; i++) {
            playListUL.children[i].firstChild.className="";
          if (playListUL.children[i].firstChild==event0) {
               sum=i;
          }
        };
      event0.className="active";
      usualLyicsSet (lyrics[sum]);
      var beforeSRC=audio.src.substring(0,audio.src.lastIndexOf('/')+1);
      audio.src = beforeSRC+event0.title;
      audio.load();
      audio.currentTime=0;

      audio.oncanplay = function () { 
        ifPlay ("play");
        //musicProgressFUN();
        console.log(audio.duration);
      }  
      ploitTitle(event0.title);
       setBgImage();
}       
     
//为播放列表添加事件
playListUL.addEventListener("click",function  (ev) {
 
      var evEn=ev||window.event;
       playPlayList(evEn.target);

     });
//为上一首和下一首添加事件
      var prev = document.getElementById('prev');
      var next = document.getElementById('next');

      prev.addEventListener("click",function  (event) {
         var playListUL = document.getElementById('playListUL');
         //alert(playListUL.children[0].firstChild.title);
         for (var i = 0; i < playListUL.children.length; i++) {
            if (playListUL.children[i].firstChild.className=="active") {
               var sum = i;
            }; 
         };
         if (sum>0) {
           playPlayList(playListUL.children[sum-1].firstChild);
           console.log("已经跳到上一首了");
         }else{
            alert("没有上一首了");
         }
      });
      next.addEventListener("click",function  (event) {
         var playListUL = document.getElementById('playListUL');
         for (var i = 0; i < playListUL.children.length; i++) {
            if (playListUL.children[i].firstChild.className=="active") {
             var sum = i;
            }; 
         };
         if (sum<playListUL.children.length-1) {
             playPlayList(playListUL.children[sum+1].firstChild);
         }else{
          alert("没有下一首了");
         }

      });
    

//为播放和停止添加事件
//！！！！！window.onload无法访问外部的turn变量
    audio.onplay=function(){
       usualLyicsSet (lyrics[sum],12);
    }
      audio.onpause=function(){
      // clearInterval(window.turn);
       console.log(audio.src);
    }

    
}
 function onload2(){     
//添加音量的静音和播放事件
    var IFsound = document.getElementById('IFsound');
    IFsound.addEventListener("click",function  (event) {
          ifSound(event);
        });
//添加音乐播放和停止事件
    var playORstop = document.getElementById('playORstop');
    playORstop.addEventListener("click",function  (event) {
      ifPlay (event);
    });
//添加音乐进度条移动事件
    var music_progress = document.getElementById('music_progress');
        var music_progress_Icon = document.getElementById('music_progress_Icon');
        var music_progressRate = document.getElementById('music_progressRate');
        music_progress_Icon.addEventListener("mousedown",function  (event) {
          event.preventDefault();
          //将点击事件的初始位置赋值给musicDisX;
          musicDisX= event.clientX;
          //为document添加mousemove的监听器；注意：只能使用document来监听，
          //使用music_progress_Icon会出现图标无法移动的问题
            music_progress.addEventListener("mousemove",music_progressMove);
            //为document添加mouseup的监听器；注意：只能使用document来监听，
          //使用music_progress_Icon会出现当鼠标移出图标区域时，无法触发事件的问题
            music_progress.addEventListener("mouseup",function  (event) {
              //当mouseup事件触发时，立即解除对mousemove的监听
                music_progress.removeEventListener("mousemove",music_progressMove);
                
                musicProgressFUN (setMusicProgressFUN());

            });
            music_progress.addEventListener("mouseout",function  (event) {
              //当mouseout事件触发时，立即解除对mousemove的监听
                music_progress.removeEventListener("mousemove",music_progressMove);
                
                musicProgressFUN (setMusicProgressFUN("mouseout"));

            });
        });


//添加音量进度条移动事件
        var volume_progress = document.getElementById('volume_progress');
        var volume_progress_Icon = document.getElementById('volume_progress_Icon');
        var volume_progressRate = document.getElementById('volume_progressRate');
        volume_progress_Icon.addEventListener("mousedown",function  (event) {
          event.preventDefault();
          //将点击事件的初始位置赋值给musicDisX;
          volumeDisX= event.clientX;
          //为document添加mousemove的监听器；注意：只能使用document来监听，
          //使用music_progress_Icon会出现图标无法移动的问题
            volume_progress.addEventListener("mousemove",volume_progressMove);
            //为document添加mouseup的监听器；注意：只能使用document来监听，
          //使用music_progress_Icon会出现当鼠标移出图标区域时，无法触发事件的问题
            volume_progress.addEventListener("mouseup",function  (event) {
              //当mouseup事件触发时，立即解除对mousemove的监听
                volume_progress.removeEventListener("mousemove",volume_progressMove);
                volumeFUN();
            });
            volume_progress.addEventListener("mouseout",function  (event) {
              //当mouseup事件触发时，立即解除对mousemove的监听
                volume_progress.removeEventListener("mousemove",volume_progressMove);
                volumeFUN();
            });
        });
        
//控制audio的函数
        var music_control = document.getElementById('music_control');
        volumeFUN();//控制audio音量的函数(初始化)
        musicProgressFUN();//控制audio播放进度(自动播放)的函数(初始化)

        
    }




//显示当前时间播放的歌词
var turn = null;
function judge(seconds){
   clearInterval(turn);
   console.log(turn+"turn");
   var time=0;
   var sum=0;
   var audio=document.getElementById('audio');
   turn=setInterval(function(){
       time = audio.currentTime;
       for (var i = 0; i < geciUL.children.length; i++) {
          geciUL.children[i].className="";
        };
        for (var i = 0; i < seconds.length; i++) {
            if (audio.currentTime==audio.duration) {
              geciUL.children[seconds.length-1].className="";
              clearInterval(turn);
              break;
            };
            if(time>=Number(seconds[seconds.length-1][0])){//当到达最后一句歌词时
              geciUL.children[seconds.length-1].className="active";
              break;
            }
            if (time<Number(seconds[0][0])) {
              geciUL.children[0].className="active";
              break;
            };
           if(time>=Number(seconds[i][0])&&time<=Number(seconds[i+1][0])){
             // console.log(time);
              geciUL.children[i].className="active";
              if (i>7) {
              	 
              	geciUL.style.marginTop= -((i-7)*30)+"px";
              };
               break;
            }
        }
   },500);
}




function usualLyicsSet (lyrics,set) {
  
  var lyrics0=lyrics;
  lyrics0=jieXI(lyrics0)
  lyrics0=formTimeBrowser(lyrics0);
  if (set==null) {
    createLyricsLI(lyrics0);
  };
  
  judge(lyrics0);
}

//将歌词字符串转换为2维数组
function jieXI(lyrics){
    var s = lyrics.split("[");
   var nav=new Array();
   var nav2=new Array();
    for (var i = 0; i < s.length; i++) {
      nav=s[i].split("]");
      for (var j = 0; j < nav.length-1; j++) {  
        nav[j]=nav[j].substring(0);
      };
        var sum=0;
        var y=0;
        while(sum<=nav.length-2){
             if (nav2.length==0) {
                nav2[0]=new Array();
                nav2[0][0]=nav[sum];
                nav2[0][1]=nav[nav.length-1];
              }else{ 
                y=nav2.length;
                nav2[y]=new Array();
               // alert(typeof nav2[0])
                 nav2[y][0]=nav[sum];
                 nav2[y][1]=nav[nav.length-1];
             }
             sum++;
        }
    };
    console.log(nav2);
    return nav2;
}

//将歌词的时间格式转化为与播放器相同的格式：
function formTimeBrowser(seconds){
	var sum=0;
	var num=new Array();
    for (var i = 0; i < seconds.length; i++) {
    	num=seconds[i][0].split(":");
    	sum=parseInt(Number(num[1])*100)+parseInt(num[0])*6000;
    	seconds[i][0]=sum/100;
    };
    seconds.sort(function(a,b){
    	return Number(a[0])-Number(b[0]);
    });
    return seconds;
}

//将歌词（li）完整的显示在geciUL中
function createLyricsLI(Lyrics){
  geciUL.style.marginTop=0+"px";//将其拉回初始位置
  removeAllChild(geciUL);
	for (var i = 0; i < Lyrics.length; i++) {
	    var li=document.createElement('li');
        li.innerText=Lyrics[i][1];
        if (i==0) {
          li.className="active";
        };
        geciUL.appendChild(li);
	};

  
}
//删除一个元素的所有节点
function removeAllChild(obj)  
{  
    while(obj.hasChildNodes()) //当div下还存在子节点时 循环继续  
    {  
        obj.removeChild(obj.firstChild);  
    }  
} 

function ploitTitle (title) {//当切换歌曲时，利用歌曲列表title来获取
  var musicAuthor = document.getElementById('musicAuthor');
  var musicName = document.getElementById("musicName");
  musicName.innerText = title.split("-")[0];
   musicAuthor.innerText = title.split("-")[1].split(".")[0];
   //切换歌手图片
   var name0 = title.split("-")[1].split(".")[0];
   var music_img = document.getElementById("music_img").firstElementChild;
   var bfSRC = music_img.src.substring(0,music_img.src.lastIndexOf('/')+1);
   music_img.src = bfSRC+name0+".jpg";
   console.log(music_img.src);

}

//切换歌曲时改变背景图片的函数
function setBgImage () {//背景图片的命名格式必须为:bgX.jpg(如：bg0.jpg)
  var url = getStyle(contanier,"background");
  var bfURl=url.substring(0,url.lastIndexOf('.'));//剪切的中间路径
  var bgName = bfURl.substring(bfURl.lastIndexOf('/')+1);//背景图片名（无后缀）
  bgName= Number(bgName.substring(2));//背景图片的序号
  bfURl=bfURl.substring(0,bfURl.lastIndexOf('/')+1);//背景图片路径
  
   // var i=0;//取随机数无法取得预期的效果（基本随机的数较小，无法轮到后面的图片）
   // while(bgName==("bg"+i)){
   //        i = (parseInt(Math.random()*10))%7;
   // }
   bgName="bg"+((bgName+1)%7); 
  contanier.style.background=bfURl+bgName+'.jpg")';
 
}


function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}
