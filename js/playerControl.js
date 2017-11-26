
/*function onload2()函数已经放到了main.js文件里*/
//  function onload2(){     
// //添加音量的静音和播放事件
// 		var IFsound = document.getElementById('IFsound');
// 		IFsound.addEventListener("click",function  (event) {
//          	ifSound(event);
//         });
// //添加音乐播放和停止事件
// 		var playORstop = document.getElementById('playORstop');
// 		playORstop.addEventListener("click",function  (event) {
// 			ifPlay (event);
// 		});
// //添加音乐进度条移动事件
// 		var music_progress = document.getElementById('music_progress');
//         var music_progress_Icon = document.getElementById('music_progress_Icon');
//         var music_progressRate = document.getElementById('music_progressRate');
//         music_progress_Icon.addEventListener("mousedown",function  (event) {
//         	event.preventDefault();
//         	//将点击事件的初始位置赋值给musicDisX;
//         	musicDisX= event.clientX;
//         	//为document添加mousemove的监听器；注意：只能使用document来监听，
//         	//使用music_progress_Icon会出现图标无法移动的问题
//             music_progress.addEventListener("mousemove",music_progressMove);
//             //为document添加mouseup的监听器；注意：只能使用document来监听，
//         	//使用music_progress_Icon会出现当鼠标移出图标区域时，无法触发事件的问题
//             music_progress.addEventListener("mouseup",function  (event) {
//             	//当mouseup事件触发时，立即解除对mousemove的监听
//                 music_progress.removeEventListener("mousemove",music_progressMove);
                
//                 musicProgressFUN (setMusicProgressFUN());

//             });
//         });


// //添加音量进度条移动事件
//         var volume_progress = document.getElementById('volume_progress');
//         var volume_progress_Icon = document.getElementById('volume_progress_Icon');
//         var volume_progressRate = document.getElementById('volume_progressRate');
//         volume_progress_Icon.addEventListener("mousedown",function  (event) {
//         	event.preventDefault();
//         	//将点击事件的初始位置赋值给musicDisX;
//         	volumeDisX= event.clientX;
//         	//为document添加mousemove的监听器；注意：只能使用document来监听，
//         	//使用music_progress_Icon会出现图标无法移动的问题
//             volume_progress.addEventListener("mousemove",volume_progressMove);
//             //为document添加mouseup的监听器；注意：只能使用document来监听，
//         	//使用music_progress_Icon会出现当鼠标移出图标区域时，无法触发事件的问题
//             volume_progress.addEventListener("mouseup",function  (event) {
//             	//当mouseup事件触发时，立即解除对mousemove的监听
//                 volume_progress.removeEventListener("mousemove",volume_progressMove);
//                 volumeFUN();
//             });
//         });
        
// //控制audio的函数
//         var music_control = document.getElementById('music_control');
//         volumeFUN();//控制audio音量的函数(初始化)
//         musicProgressFUN();//控制audio播放进度(自动播放)的函数(初始化)

        
//     }


//对音乐进度条监听事件的函数
var musicDisX=0;
function music_progressMove(event) {
	clearInterval(progressTime);
	var length=event.clientX-musicDisX;//鼠标移动的长度
	var width1=music_progressRate.offsetWidth;//进度条music_progressRate的初始长度
	if ((width1+length+music_progress_Icon.offsetWidth)<=music_progress.offsetWidth) {
		music_progressRate.style.width=width1+length+"px";
	    musicDisX=event.clientX;
	};
	
}
//对音量进度条监听事件的函数
var volumeDisX=0;
function volume_progressMove(event) {
	var length=event.clientX-volumeDisX;//鼠标移动的长度
	var width1=volume_progressRate.offsetWidth;//进度条music_progressRate的初始长度
	if ((width1+length+volume_progress_Icon.offsetWidth)<=volume_progress.offsetWidth) {
		volume_progressRate.style.width=width1+length+"px";
	    volumeDisX=event.clientX;
	};
	
}

//是否静音图标的切换
function ifSound(){
	var src1 = "sound.png";
	var src2 = "NOsound.png";
    var src= event.target.src;
    var volume_progressRate = document.getElementById('volume_progressRate');
    var beforeSRC=src.substring(0,src.lastIndexOf('/')+1);
    var src= src.substring(src.lastIndexOf('/')+1);
    if (src==src1) {
  	    event.target.src=beforeSRC+src2;
  	    event.currentTarget.title="";
  	    volume_progressRate.style.display="none";
  	    volumeFUN(0);
    }else{
        
  	    event.target.src=beforeSRC+src1;
  	    event.currentTarget.title="静音";
  	    volume_progressRate.style.display="block";
  	    volumeFUN();

    }

}
//是否播放图标的切换
function ifPlay (argument) {
    var playORstop  = document.getElementById('playORstop');
	var src1 = "play.png";
	var src2 = "stop.png";
    var elementSrc= playORstop.firstChild.src;
    var beforeSRC=elementSrc.substring(0,elementSrc.lastIndexOf('/')+1);
    var src= elementSrc.substring(elementSrc.lastIndexOf('/')+1);
    if (argument=="play") {
        playORstop.firstChild.src=beforeSRC+src2;
        playORstop.firstChild.title="停止";
        ifAudioFUN ("play");
    }else{
        if (src==src1) {
  	        playORstop.firstChild.src=beforeSRC+src2;
  	        playORstop.firstChild.title="停止";
            ifAudioFUN ("play");
        }else{
  	        playORstop.firstChild.src=beforeSRC+src1;
  	        playORstop.firstChild.title="播放";
            ifAudioFUN ("stop");
        }
    }
}



//控制audio音量的函数
function volumeFUN (volumeSUM) {
	var audio = document.getElementById('audio');
    if (volumeSUM==null) {
        var sum = Math.round((volume_progressRate.offsetWidth/
        (volume_progress.offsetWidth-volume_progress_Icon.offsetWidth))*100)/100;
        console.log(audio.duration+"sum");
        audio.volume=sum;
    }else{
    	audio.volume=volumeSUM;
    }
    
}
//控制audio播放和停止的函数
function ifAudioFUN (judge) {
	var audio = document.getElementById('audio');
    if (judge=="play") {
        audio.play();
        musicProgressFUN();//控制audio播放进度(自动播放)的函数
    }else if(judge=="stop"){
    	audio.pause();
    };
    console.log(audio.currentTime+"time");
}
//控制audio播放进度(自动播放)的函数
var progressTime;
function musicProgressFUN (rate1) {
	var volume_progressRate = document.getElementById('volume_progressRate');
	var audio = document.getElementById('audio');
    var nowTime = document.getElementById('nowTime');
    var allTime = document.getElementById('allTime');
    var rate = 0;  
    console.log(audio.duration+"audio.duration")  ; 
    allTime.innerText=formTimeScreen(audio.duration); 
    clearInterval(progressTime);
    progressTime = setInterval(function  (argument) {
    	if (rate1!=null) {//如果是手动设置的参数，则强制等于参数
    	 	music_progressRate.style.width=(music_progress.offsetWidth-
            music_progress_Icon.offsetWidth)*rate1+"px";
            nowTime.innerText=formTimeScreen(audio.currentTime);
            rate1=null;
            return;
        };
    	if (audio.currentTime==audio.duration) {//如果已经播放完毕，手动取消定时器
    		music_progressRate.style.width=0+"px";
            nowTime.innerText=formTimeScreen(0);
    		clearInterval(progressTime);	
    		return;
    	};
    	nowTime.innerText=formTimeScreen(audio.currentTime);
    	rate = parseInt(audio.currentTime)/parseInt(audio.duration);
        music_progressRate.style.width=(music_progress.offsetWidth-
        music_progress_Icon.offsetWidth)*rate+"px";
    },1000);
    

}

//设置audio播放进度(手动干预)的函数
function setMusicProgressFUN (argument) {
	clearInterval(progressTime);
	var audio = document.getElementById('audio');
    if (argument=="mouseout") {//如果函数由mouseout触发，则取消这次手动设置
       var sum0 = parseInt(audio.currentTime)/parseInt(audio.duration);
       music_progressRate.style.width=(music_progress.offsetWidth-
        music_progress_Icon.offsetWidth)*sum0+"px";
       return sum0;
    }else{//如果函数是mouseup正常触发，则执行此次手动设置
    var sum = music_progressRate.offsetWidth/
    (music_progress.offsetWidth-music_progress_Icon.offsetWidth);
    audio.currentTime=parseInt(audio.duration)*sum;
    music_progressRate.style.width=(music_progress.offsetWidth-
        music_progress_Icon.offsetWidth)*sum+"px";
    return sum;
    }
}


//将歌词的时间格式转化为与显示器放器相同的格式：
function formTimeScreen(time){
	time=Math.round(time);//对时间精确到秒
	var minute=parseInt(time/60);//获得时间的分钟数
    var second=time%60;//获取时间剩余的秒数
	if (minute<10) {
       minute="0"+minute;
	};
	if (second<10) {
       second="0"+second;
	};
  return minute+":"+second;
}



// //将歌词的时间转换为浏览器可以识别的时间格式
// function jieXI(nav){
//     var s = geci.split("[");
//    var nav=new Array();
//    var nav2=new Array();
//     for (var i = 0; i < s.length; i++) {
//     	nav=s[i].split("]");
//     	for (var j = 0; j < nav.length-1; j++) {	
//     		nav[j]=nav[j].substring(0);
//     	};
//         var sum=0;
//         var y=0;
//         while(sum<=nav.length-2){
//              if (nav2.length==0) {
//                 nav2[0]=new Array();
//                 nav2[0][0]=nav[sum];
//                 nav2[0][1]=nav[nav.length-1];
//               }else{ 
//                 y=nav2.length;
//                 nav2[y]=new Array();
//                // alert(typeof nav2[0])
//                  nav2[y][0]=nav[sum];
//                  nav2[y][1]=nav[nav.length-1];
//              }
//              sum++;
//         }
//     };
//     console.log(nav2);
//     return nav2;
// }

