$(function(){
	$.ajax({
		type:"get",
		url:"data/users/islogin.php",
		dataType:"json",
		success:function(data){
			if(data.ok==0){location.href="login.html@back="+location.href}
			else{
				//加载结算购物车
				$.ajax({
					type:"get",
					url:"data/cart/getCart.php",
					dataType:"json",
					success:function(data){
						if(data.length>0){
							var html="",total=0;
							for(var item of data){
								var {sm,title,spec,size,price,href,count,is_checked}=item;
								if(is_checked>0){
								html+=
									`<ul>
										<li class="info-pro">
											<a href="${href}"><img src="${sm}" alt=""></a>
											<div class="rt">
												<p><a href="${href}">${title}</a></p>
												<i><span class="spec">颜色：<u>${spec}</u></span>&nbsp;||&nbsp;<span class="size">尺寸：<u>${size}</u></span></i>
											</div>
										</li>
										<li class=" info-price">¥${price}</li>
										<li class="info-num">
											<span class="cart-count">${count}</span>
										</li>
										<li class="info-total"><span class="price">¥${(price*count).toFixed(2)}</span></li>
										<li class="info-path">包邮</li>	
									</ul>`;
									total+=price*count;
								}
							}
							$(".sure-info>.info").html(html);
							$(".sure-info>.total>span,.info-price .pay-price").html(`¥${total.toFixed(2)}`)
						}
					},
                    error:function(){
                        location.href="500.html@back="+location.href;
                    }
				});
				//加载地址
				$.ajax({
					type:"get",
					url:"data/pay/pay.php",
					dataType:"json",
					success:function(data){
                        if(data.length>0){
                        	var html="",defhtml="";
							for(var item of data){
								var {aid,receiver,cellphone,province,city,county,address,is_default}=item;
								html+=
									`<li class="${is_default>0?'default':''}">
										<p><textarea  rows="1" disabled name="userName">${receiver}</textarea></p>
										<p><textarea  rows="1" disabled name="tel">${cellphone}</textarea></p>
										<p><textarea name="address" rows="2" disabled>${province +city +county +address}</textarea></p>
										<p>
											<span class="lf ${is_default>0?'is-default':''}">默认地址</span>
											<a href="javascript:;" class="${is_default>0?'':'select-default'}">设为默认 | </a>
											<a href="javascript:;" class="edit">编辑 | </a>
											<a href="javascript:;" class="del">删除</a>	
										</p>
									</li>`;
								if(is_default>0){
									defhtml=
										`<p><b>寄送至：</b> <span class="color">${province} ${city} ${county} ${address}</span></p>
					<p><b>收货人：</b><span class="color">${receiver}&nbsp;${cellphone}</span> </p>`;
								}
							}
							$(".sure-address>ul").html(html);
							$(".info-price>div").append(defhtml);
						}
					},
                    error:function(){
                        location.href="500.html@back="+location.href;
                    }
				})
                //设置默认地址事件
                var $default=$(".sure-address .is-default"),
                    $sdefault=$(".sure-address .selected-default");
                var $address=$(".sure-address");
                //添加新地址
                $(".sure-address .newAddress").click(function(){
                    location.href="address.html@back="+location.href;
                });
                //编辑
                $address.on("click",".edit",function(){
                    var $this=$(this);
                    $this.parent().parent().find("textarea").prop("disabled",false).first().focus();
                    $this.html("保存 |").removeClass("edit").addClass("save").next().html("取消").removeClass("del").addClass("back");
                });
                //保存
                $address.on("click",".save",function(){
                    var $this=$(this);
                    $this.parent().parent().find("textarea").prop("disabled",true);
                    $this.html("编辑 |").addClass("edit").removeClass("save").next().html("删除").addClass("del").removeClass("back");
                });
                //删除
                $address.on("click",".del",function(){
                    var $li=$(this).parent().parent();
                    $li.remove();
                });
                //设为默认
                $address.on("click",".select-default",function(){
                    $(this).removeClass("select-default").prev().addClass("is-default")
                        .parent().parent().addClass("default")
                        .siblings().removeClass("default")
                        .find(".is-default").removeClass("is-default").next().addClass("select-default");
                });
                //设置物流和支付方式选择点击事件
                $(".sure-express,.sure-payout").on("click","li",function(){
                    $(this).addClass("default").siblings().removeClass("default")
                })
			}
		},
        error:function(){
            location.href="500.html@back="+location.href;
        }
	})
});