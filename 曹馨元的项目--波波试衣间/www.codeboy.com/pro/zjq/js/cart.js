$(function(){
	function loadPage(){
		$.ajax({
			type:"get",
			url:"data/users/islogin.php",
			dataType:"json",
			success:function(data){
				if(data.ok==0){
					location.href="login.html@back="+location.href;
				}else{
					$.ajax({
						type:"get",
						url:"data/cart/getCart.php",
						dataType:"json",
						success:function(data) {
                            if (data.length > 0) {
                                var html = "", total = 0, n = 0;
                                for (var item of data) {
                                    var {sm, title, href, spec, price, preprice, count, is_checked, cid, iid, size} = item;
                                    html +=
                                        `<div class="imfor" data-iid="${iid}">
										  <div class="check">
											<img src="imgs/cart/product_${is_checked == 1 ? 'true' : 'normal'}.png">
										  </div>
										  <div class="product">
											<a href="${href}">
											  <img src="${sm}" alt="${title}">
											</a>
											<span class="desc">
											  <a href="${href}">${title}</a>
											</span>
											<p class="col">
											  <span>规格：</span>
											  <span class="color-desc">颜色:${spec}</span>&nbsp;
											  <span class="color-desc">尺寸:${size}</span>
											</p>
										  </div>
										  <div class="pro-price">
											<p class="price-desc"><del>${preprice == null ? "" : "¥" + preprice}</del></p>
											<p>
												 <b>¥${price}</b>
											</p>
										 </div>
										  <div class="num">
											<span class="reduce">-</span>
											<input type="text" value="${count}">
											<span class="add">+</span>
										  </div>
										  <div class="total-price">
											<b>¥${(price * count).toFixed(2)}</b>
										  </div>
										  <div class="del">
											<a href="javascript:;">删除</a>
										  </div>
										</div>`;
                                    if (is_checked == 1) {
                                        total += price * count;
                                        n += Number(count);
                                    }
                                }
                                $("#content-box-body").html(html);
                                $(".foot-tol>.foot-price,.totalPrices.color.sum").html("¥" + total.toFixed(2));
                                $(".totalOne.color,.total.color").html(n);
                                $(".check-top>img,.checkall>span>img").attr(
                                    "src",
                                    `imgs/cart/product_${$('#content-box-body').is(':has([src$=normal.png])') ? 'normal' : 'true'}.png`)
                            }
                        }
					})

				}
			},
			error:function(){
				location.href="500.html@back="+location.href;
			}
		})
	}
	loadPage();
	$("#shopping-cart").click(function(e){
		var $tar=$(e.target);
		var count=$tar.siblings(":text").val();
		var iid=$tar.parent().parent().data("iid");
		if($tar.is(".reduce,.add")){
			if($tar.is(".add")){count++}else count--;
			$.ajax({
				type:"get",
				url:"data/cart/updateCart.php",
				data:{iid,count},
					success:function(){
						loadPage()
					}
				})
		}
		if($tar.is(".del>a") && confirm("确认删除吗？")){
			$.ajax({
				type:"get",
				url:"data/cart/deleteCart.php",
				data:{iid},
					success:function(){
						loadPage();
					}
				})
		}
		if($tar.is(".check>img")){
			var is_checked=$tar.attr("src").indexOf("true")==-1?1:0;
			$.ajax({
				type:"get",
				url:"data/cart/checkOne.php",
				data:{iid,is_checked},
				success:function(){
					loadPage();
				}
			})
		}
		if($tar.is(".check-top>img,.checkall>span>img")){
			var is_checked=$tar.attr("src").endsWith("true.png")?0:1;
			$.ajax({
				type:"get",
				url:"data/cart/checkAll.php",
				data:{is_checked},
				success:function(){
					loadPage();
				}
			})
		}
	})
})