$(function(){
	$("#changeCode").click(function(){
		loadCode();
	});
	 function getColor(){
	  var r=parseInt(Math.random()*256);
	  var g=parseInt(Math.random()*256);
	  var b=parseInt(Math.random()*256);
	  return "rgb("+r+","+g+","+b+")";
  }//设置颜色，当rgb都为255时为白色，可使用for循环将其排除
	 var res=getColor();
	function loadCode(){
	 var cvs=document.getElementById("canvas");//获取到canvas对象
	 var context=cvs.getContext("2d");//获取到canvas画图环境
	 cvs.width=120;//设置文字的宽度
	 cvs.height=40;//设置文字的高度
	 context.strokeRect(0,0,120,40);//画一个矩形框
	 //var aCode=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];//需要随机出现的字母和数字;
	 var aCode="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	 //下面使用一个for循环设置一个随机的4位代码
	 var code="";
	 for(var i=0;i<=3;i++){
		 //下面是设置文字的随机位置，保证文字可以出现在矩形框内
		 var x=20+i*20;
		 var y=20+Math.random()*10;
		 var index=parseInt(Math.random()*aCode.length);//获取一个随机索引
		 var txt=aCode.charAt(index);//读取索引
		 code+=txt;
		 context.font="bold 25px '微软雅黑'";//设置字体
		 context.fillStyle=getColor();//设置字体随机颜色
		 //下面是设置文字角度
		 var deg=Math.random()*45*Math.PI/180;
		 //设置一定弧度的，需要用到π和180的转换
		 context.save();
		 context.translate(x,y);
		 context.rotate(deg);
		 context.fillText(txt,0,0);
		 //context.rotate(-deg);
		 //context.translate(-x,-y);
		 context.restore();
		 //下面是设置随机颜色的干扰线
		 }
		 cvs.setAttribute("data-code",code);
		 for(var i=0;i<8;i++){
			 context.beginPath();
			 context.moveTo(Math.random()*120,Math.random()*40);
			 context.lineTo(Math.random()*120,Math.random()*40);
			 context.strokeStyle=getColor();
			 context.stroke();
		 }
		 //下面是设置随机颜色的干扰点，干扰点由很短的干扰线组成
		 for(var i=0;i<20;i++){
			 var x=Math.random()*120;
			 var y=Math.random()*40;
			 context.beginPath();
			 context.moveTo(x,y);
			 context.lineTo(x+1,y+1);
			 context.strokeStyle=getColor();
			 context.stroke();
		 }
	 }
	 loadCode();
})