	$(function(){
		var $form=$("#reg_form");
		$.validator.addMethod("tel",function(val){
			if(val==="")
				return true
			else
				return /^(0086|\+86)?\s*1[3-9]\d{9}$/.test(val)
		},"11位格式正确的手机号码");
		$.validator.addMethod("uname",function(val){
			if(val==="")
				return true
			else
				return /^[a-zA-Z]\w{2,9}$/.test(val)
		},"以字母开头的3-10位的数字、字母和下划线的任意组合");
		$.validator.addMethod("upwd",function(val){
			if(val==="")
				return true
			else
				return /^[a-zA-Z]\w{7,15}$/.test(val)
		},"字母开头的8-16位的数字、字母和下划线的任意组合");
      $form.validate({
		rules:{
			uname:{
				required:true,
				uname:true,
				remote:"data/users/reg-vali-uname.php"
			},
			upwd:{
				required:true,
				upwd:true
			},
			cpwd:{
				required:true,
				equalTo:"#upwd"
			},
			email:{
				required:true,
				email:true
			},
			mobile:{
				tel:true
			}
		},
		messages:{
			uname:{
				required:"用户名不能为空！",
				remote:"用户名已被占用"
			},
			upwd:{
				required:"密码不能为空"
			},
			cpwd:{
				equalTo:"两次密码不一致"
			},
			email:{
				required:"邮箱不能为空",
				email:"带有@和后缀名的邮箱"
			}
		}
	  })
	$(".reg_box>.btn").click(function(){
		var code=$("#canvas").attr("data-code");
		if($("#input-code").val().toLowerCase()==code.toLowerCase()){
			$.ajax({
				type:"post",
				url:"data/users/register.php",
				data:$form.serialize(),
				dataType:"json",
				success:function(data){
					if(data.code>0){
						location.href="login.html?"+location.search;
					}
					$("#err_note").html(data.msg);
				},
				error:function(){
					alert("网络错误,请重试")
				}
			})
		}else{$("#input-code").focus().addClass("error")}
	})
	//表单虚拟键盘事件
	$("input").keyup(function(e){
				if(e.keyCode==13){
					$(".reg_box>.btn").click();
				}
	})
	//表单出现提示框
	$form.on("focus","input",function(){
		var $this=$(this);
		if(!$this.is(".error"))
			$this.parent().next().removeClass("vali");
	}).on("blur","input",function(){
		$(this).parent().next().addClass("vali");
	});
	$("input[name=email]").on("input","",function(e){
		//e.preventDefault();
		var html=$(this).val();
		if(html){
			$("#demail span").html(html);
		}
	});
})