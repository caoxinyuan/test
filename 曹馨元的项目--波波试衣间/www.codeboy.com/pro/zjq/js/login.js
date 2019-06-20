//登录框
	;(function(){
			//表单验证
			var form=document.getElementById("login_form");
			var userName=form.uname;
			var pwd=form.upwd;
			userName.onfocus=pwd.onfocus=function(){
				this.className="border";
				var span=this.parentNode.parentNode.nextElementSibling.firstElementChild;
					span.className="vali_info";
					span.style.visibility="visible";
					if(this==userName)
					span.innerHTML="3-10位的字母开头,字母/数字/下划线的组合";
					else span.innerHTML="8-16位的字母开头,字母/数字/下划线的组合";
			}
			function vali(txt,reg){
				var span=txt.parentNode.parentNode.nextElementSibling.firstElementChild;
				if(reg.test(txt.value)){
					txt.className="";
					span.className="vali_true";
					span.innerHTML="验证通过";
					return true;
				}else{
					span.className="vali_fail";
					return false;
					}
			}
			userName.onblur=function(){
				vali(this,/^[a-zA-Z]\w{2,9}$/);
				this.className="";
			}
			pwd.onblur=function(){
				vali(this,/^[a-zA-Z]\w{7,15}$/);
				this.className="";
			}
			//密码可见
			var pwdislook=pwd.nextElementSibling;
			pwdislook.onclick=function(){
				if(pwd.type=="password"){
					pwd.type="text";
				}else if(pwd.type==="text"){
					pwd.type="password";
				}
			}
			$("#signin").click(function(e){
				e.preventDefault();
				if(vali(userName,/^[a-zA-Z]\w{2,9}$/) && vali(pwd,/^[a-zA-Z]\w{7,15}$/)){
					$.ajax({
						type:"post",
						url:"data/users/signin.php",
						data:$(this).parent().parent().serialize(),
						success:function(msg){
							alert(msg);
							if(msg==="登录成功!"){
								var i=location.search.indexOf("=");
								if(i!=-1)location.href=location.search.slice(i+1);
								else location.href="index.html";
							}
						}
					})
				}
			})
			$("input").keyup(function(e){
				if(e.keyCode==13){
					$("#signin").click();
				}
			})
})()