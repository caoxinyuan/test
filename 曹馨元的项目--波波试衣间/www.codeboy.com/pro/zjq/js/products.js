;$(function(){
	//---------------封装加载产品函数-----------------
	function loadPro(pageNum){
		var kw="@";
		$.ajax({
			type:"get",
			url:"data/products/getProductByKw.php",
			dataType:"json",
			data:{kw,pageNum},
			success:function(output){
				var {count,pageSize,pageNum,pageCount,products,pics}=output;
				//加载产品
				var html="";
				for(var pro of products){
					var {cid,price,preprice,href,title,goods,sales,pic,is_saved}=pro;
					html+=
						`<li>
							<a href="${href}"><img src="${pic}"></a>
							<div data-smcid="${cid}" class="sm-img">
								
							</div>
							<p class="pro-title">
								<a href="${href}">${title}</a>
							</p>
							<div class="pro-price">
								<span class="price">¥${price}</span>
								<b>包邮</b>
								<span class="rt paid-num">销量:${sales}</span>
							</div>
							<div class="pro-user" data-cid="${cid}">
								<a href="#" class="store ${is_saved>0?'hasStore':''}">
									<img src="imgs/store_${is_saved>0?'t':'f'}.png" alt="">
									${is_saved>0?'您已收藏':'加入收藏'}
								</a>
								<a href="#" class="addCart">
									<img src="imgs/cart.png" alt="">
									加入购物车
								</a>
							</div>
						</li>`;
				}
				$(".top-pro>.products>ul").html(html).on("click",".store,.addCart",function(e){
					e.preventDefault();
					var $a=$(this);
					if($a.is(".store")){
						if($a.is(".hasStore")){alert("您已收藏,无需重复收藏!")}
						else{$.ajax({
							type:"get",
							url:"data/users/islogin.php",
							dataType:"json",
							success:function(data){
								if(data.ok==0){
									location.href="login.html@back="+location.href;		
								}
								else{
                                    var $img=$a.parent().parent().children(":first").children("img").clone();
                                    $img.appendTo($a.parent()).css(
                                        {"position":"absolute","top":0,"right":0})
                                        .animate({
                                            width:10,height:0,top:380,left:40},800,function(){
                                            //将加入收藏发送到服务器
                                            $img.remove();
                                            var cid=$a.parent().attr("data-cid");
                                            $.ajax({
                                                type:"get",
                                                url:"data/cart/addStore.php",
                                                data:{cid},
                                                success:function(data){
                                                    if(data){
                                                        $a.html(`<img src="imgs/store_t.png">您已收藏`)
															.addClass("hasStore");
                                                    }else{alert("收藏失败,请重试")}
                                                },
                                                error:function(){alert("网络错误,请重试!")}
                                            })
                                        })
                                }
							},
                            error:function(){
                                location.href="500.html@back="+location.href;
                            }
						})}
					}else if($a.is(".addCart")){
						$.ajax({
							type:"get",
							url:"data/users/islogin.php",
							dataType:"json",
							success:function(data){
								if(data.ok==0){
									location.href="login.html@back="+location.href;		
								}else{
									//给加入购物车增加特效
									var $img=$a.parent().parent().children(":first").children("img").clone();
									$img.appendTo($a.parent()).css(
									{"position":"absolute","top":0,"right":0})
										.animate({
										width:10,height:0,top:380,right:90},800,function(){
											//将加入购物车发送到服务器
										$img.remove();
										var cid=$a.parent().attr("data-cid");
											$.ajax({
												type:"get",
												url:"data/cart/addCart.php",
												data:{cid},
												success:function(data){
													if(data && confirm("加入成功,是否前往购物车查看?")){
														location.href="cart.html";
													}
												},
                                                error:function(){
                                                    location.href="500.html@back="+location.href;
                                                }
											})
										})
								}
							},
                            error:function(){
                                location.href="500.html@back="+location.href;
                            }
						})
					}
				});
				//加载小图片
				for(var i in pics){
					var html="";
					var picss=pics[i];
					for(var j=0;j<picss.length;j++){
						var {sm,md}=picss[j];
						html+=`<a href="javascript:;" data-md="${md}"><img src="${sm}"></a>`;
                    }
                    $(`[data-smcid=${i}]`).html(html);
				}
				//设置小图片和中图片效果
                $(".top-pro>.products>ul>li>.sm-img>a").hover(function(){
                	var $a=$(this);
                	var md=$a.attr("data-md");
                	$a.parent().prev().children("img").attr("src",md);
				})
				//加载分页
				var html="",$paging=$(".paging>#page"),pageNum=parseInt(pageNum);
				if(pageNum==1){
					html+=`<li class="prev disabled"><a href="#" >&laquo;</a></li>`;
				}else{html+=`<li class="prev"><a href="#" >&laquo;</a></li>`;}
				if(pageNum-2>0){html+=`<li><a href="#" >${pageNum-2}</a></li>`;}
				if(pageNum-1>0){html+=`<li><a href="#">${pageNum-1}</a></li>`;}
				html+=`<li class="hover"><a href="#">${pageNum}</a></li>`;
				if(pageNum+1<=pageCount){html+=`<li><a href="#">${pageNum+1}</a></li>`;}
				if(pageNum+2<=pageCount){html+=`<li><a href="#">${pageNum+2}</a></li>`;}
				if(pageNum==pageCount){
					html+=`<li class="next disabled"><a href="#" >&raquo;</a></li>`;
				}else{html+=`<li class="next"><a href="#">&raquo;</a></li>`;}
				$paging.html(html);
			},
            error:function(){
                location.href="500.html@back="+location.href;
            }
		})
	}
	loadPro(1);
	//------------------加载推荐商品------------------
	$.ajax({
		type:"get",
		url:"data/products/getProductBy.php",
		dataType:"json",
		success:function(data){
			var html="";
			var {recommend,hotSale}=data;
			for(var pro of recommend){
				var {cid,title,href,pic,price,goods}=pro;
				html+=
					`<li>
						<a href="${href}"><img src="${pic}" alt=""></a>
						<p class="title" title="${title}"><a href="${href}">${title}</a></p>
						<p class="price">¥${price}</p>
					</li>`;
			}
			$(".top-recommend>div>ul").html(html).clone().appendTo(".top-recommend>div").attr("id","topul2");
			//------------------设置推荐滚动--------------------
			var $topul1=$(".top-recommend>div>#topul1"),
                $topul2=$(".top-recommend>div>#topul2");
			var ul1=parseInt($topul1.css("top")),
				ul2=parseInt($topul2.css("top"));
			function scrollUl(){
				ul1<-1500?ul1=1500:ul1--;
				ul2<-1500?ul2=1500:ul2--;
				$topul1.css("top",ul1+"px");
				$topul2.css("top",ul2+"px");
			}
			ultimer=setInterval(scrollUl,20);
			$(".top-recommend>div").mouseenter(function(){clearInterval(ultimer);ultimer=null})
				.mouseleave(function(){ultimer=setInterval(scrollUl,20);})
			//------------加载掌柜热卖------------
			var html="";
			for(var pro of hotSale){
				var {cid,title,preprice,href,pic,price}=pro;
				html+=
					`<li>
						<a href="${href}"><img src="${pic}"></a>
						<p class="title"><a href="${href}">${title}</a></p>
						<div class="pro-price">
							<span class="price">¥${price}</span>
							<del>${preprice==null?'':'¥'+preprice}</del>
							<b class="rt">包邮</b>
						</div>
						<div class="pro-user">
							<b>掌柜热卖</b>
							<a href="" class="store rt">
								<img src="imgs/store_f.png" alt="">加入收藏
							</a>
						</div>
					</li>`;
			}
			$(".hot-pro>ul").html(html);
		},
		error:function(){
			location.href="500.html@back="+location.href;
		}
	});
	//-------------设置商品分页点击事件------------------
	$(".paging>#page").on("click","a",function(e){
		e.preventDefault();
		var $a=$(this).parent();
		var $hover=$(".paging>#page>li.hover>a");
		var pageNum=Number($hover.html());
		if($a.is(".prev") && !$a.is(".disabled")){
			pageNum-=1;
			$a.prev().addClass("hover").siblings().removeClass("hover");
		}else if($a.is(".next") && !$a.is(".disabled")){
			pageNum+=1;
			$a.next().addClass("hover").siblings().removeClass("hover");
		}else if(!$a.is(".disabled")){
			$a.addClass("hover").siblings().removeClass("hover");
			pageNum=Number($(".paging>#page>li.hover>a").html());
		}
		loadPro(pageNum);
		var scrollTop=$(window).scrollTop();
		var $html=$("html");
		if($("#choose-nav").is(".in")) {
            $html.animate({
                scrollTop: 330
            }, 1000);
        }else{
            $html.animate({
                scrollTop: 0
            }, 1000);
		}
	});
	//--------------筛选框事件---------------
	var $nav=$("#choose-nav");
	$("#updown").click(function(){
		var html=$nav.is(".in")?"展开筛选框":"收起筛选框";
		$(this).html(html).next().toggleClass("in");
	})
	//------------筛选框点击加入关键词事件------------
	var html="",key=[],chooseKw="",$kw=$("#choose-nav>li>#choose-kw");
	$nav.on("click","a",function(e){
		html="";key=[];chooseKw="";
		e.preventDefault();
		var $a=$(this);
		if(!$a.is(".selected")){$a.addClass("selected").siblings().removeClass("selected")}
		var logo=$(".choose-logo>a.selected").html(),
				hot=$(".choose-hot>a.selected").html(),
				size=$(".choose-size>a.selected").html(),
				time=$(".choose-time>a.selected").html(),
				type=$(".choose-type>a.selected").html();
		if(logo=="全部"){logo="";}else{key.push(logo)}
		if(hot=="全部"){hot="";}else{key.push(hot)}
		if(size=="全部"){size="";}else{key.push(size)}
		if(time=="全部"){time="";}else{key.push(time)}
		if(type=="全部"){type="";}else{key.push(type)}
		chooseKw=logo+" "+hot+" "+size+" "+time+" "+type;
		for(var i=0;i<key.length;i++){
			html+=`<i>${key[i]}</i><b>&times;</b>`;
		}
		$kw.html(html).attr("data-kw",chooseKw);
	});
	//-------------关键词删除事件----------------
	$kw.on("click","b",function(){
		var $b=$(this);
		var kw=$b.prev().html();
		var index=key.indexOf(kw);
		key.splice(index,1);
		var reg=new RegExp(kw,"ig");
		var dataKw=$kw.attr("data-kw");
		chooseKw=dataKw.replace(reg,"");
		$b.prev().remove();
		$b.remove();
		html="";
		for(var i=0;i<key.length;i++){
			html+=`<i>${key[i]}</i><b>&times;</b>`;
		}
		$kw.html(html).attr("data-kw",chooseKw);
	})
	//-------------全部清空事件-----------------
	$("#choose-nav>li>.clearAll").click(function(){
		html="";chooseKw="";key=[];
		$kw.html(html).attr("data-kw",chooseKw);
	})
	//---------------排序框点击事件--------------
	$(".sort>.sort-by>ul").on("click","li",function(){
		var $li=$(this);
		if(!$li.is(".focus")){
			$li.addClass("focus").siblings().removeClass("focus");
		}else if($li.is(".focus")){
			$li.children(":first").children(":first").toggle().siblings().toggle();
		}
	})
});
