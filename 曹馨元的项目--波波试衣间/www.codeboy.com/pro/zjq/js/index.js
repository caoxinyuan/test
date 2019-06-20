$(function(){
	var availWidth=screen.availWidth,availHeight=screen.availHeight;
	var $bnrimg=$(".banner>.bnr-img"),
			$bnrtext=$(".banner>.bnr-text"),
			$bnrdot=$(".banner>.bnr-dot"),
			$banner=$(".banner");
	var $prev=$(".banner>.prev");
	var $next=$(".banner>.next");
	//-------------------------设置首页导航事件-----------------------------------
	$("#index-nav").on("mouseenter","[data-toggle=indexnav]",function(e){
		e.preventDefault();
		var $this=$(this);
		if($this.is(".navAll")){$(".nav-container>ul").addClass("in")}
		else{
			var id=$(this).attr("href");
			$(id).addClass("in").siblings().removeClass("in");
		}
	}).mouseleave(function(){
			$(this).find(".nav-container>ul").removeClass("in");
	}).on("click","a",function(e){
		e.preventDefault();
		var kw=$(this).html();
		location.href="products.html@kw="+kw;
	});
	//-------------------加载各层楼商品---------------------------
	$.ajax({
		type:"get",
		url:"data/index/getIndexData.php",
		dataType:"json",
		success:function(data){
			var {banner,f1,f2,f3,f4,f5,f6}=data;
			//-----------------------请求轮播图以及内容-----------------------
			var html1="",html2="",liWidth=600;
			for(var i in banner){
				var {bid,imgs,title,href}=banner[i];
				if(i<1){html1+=`<li class="show"><a href="${href}"><img src="${imgs}"></a></li>`}
				else html1+=
					`<li><a href="${href}"><img src="${imgs}"></a></li>`;
				html2+=`<li>${title}</li>`;
			}
			$bnrimg.html(html1);
			$bnrtext.html(html2);
			$bnrdot.html("<li></li>".repeat(5)).children(":first").addClass("active");
			var arr=["blind","clip","drop","fade","fold","scale","size","slide"];
			//设置轮播滚动界面
			function bnr(){
				var index=parseInt(Math.random()*arr.length);
				var $visible=$(".banner>.bnr-img").children(":visible");
				var i=$visible.index()+1;
				if(i<5){
					$visible.hide(arr[index]).next().show(arr[index]);
					$bnrdot.children(":eq("+i+")").addClass("active").siblings().removeClass("active");
					$bnrtext.children(":eq("+i+")").show("slid").siblings().hide();
				}else{
					$visible.hide(arr[index]).parent().children(":first").show(arr[index])
					$bnrdot.children(":first").addClass("active").siblings().removeClass("active");
					$bnrtext.children(":first").show("slide").siblings().hide();
				}
			}
			timer=setInterval(bnr,3000);
			//鼠标移入移除触发事件
			$banner.mouseenter(function(){
				clearInterval(timer);
				timer=null;
			}).mouseleave(function(){timer=setInterval(bnr,3000);});
			//小圆点鼠标移入事件
			$bnrdot.on("mouseover","li",function(){
				$(this).addClass("active").siblings().removeClass("active");
				var i=$bnrdot.children(".active").index();
				$bnrimg.children(":eq("+i+")").show().siblings().hide();
				$bnrtext.children(":eq("+i+")").show("slide").siblings().hide();
			});
			//上一页点击事件
			$prev.click(function(){
				var index=parseInt(Math.random()*arr.length);
				var $visible=$bnrimg.children(":visible");
				var i=$visible.index();
				if(i>0){
					$visible.hide(arr[index]).prev().show(arr[index]);
					$bnrdot.children(":eq("+i+")").addClass("active").siblings().removeClass("active");
					$bnrtext.children(":eq("+i+")").show("slide").siblings().hide();
				}else{
					$visible.hide(arr[index]).parent().children(":last").show(arr[index]);
					$bnrdot.children(":last").addClass("active").siblings().removeClass("active");
					$bnrtext.children(":last").show("slide").siblings().hide();
				}
			});
			//下一页点击事件
			$next.click(function(){
				bnr();
			});
			//--------------加载首页推荐--------------
			var html="";
			for(var i in f1){
				var {cid,title,name,href,pic,lg,price,sales,goods,is_saved}=f1[i];
				if(i<3){
					html+=
						`<li data-saved='${is_saved}' data-cid='${cid}'>
							<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
							<div>
								<p class="desc">${title}</p>
								<p><span class="price">¥${price}</span></p>
								<div class="f1-hover">
									<p><span>${name}</span><span class="price">¥${price}</span></p>
									<a href="${href}">查看详情</a>
									<a href="javascript:;" class="store ${is_saved>0?'hasStore':''}">${is_saved>0?'您已收藏':'加入收藏'}</a>
								</div>
							</div>
						</li>`;
				}else{
					html+=
						`<li data-saved='${is_saved}' data-cid='${cid}'>
							<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
							<p class="desc"><a href="${href}">${title.length>20?title.slice(0,20)+"...":title}</a></p>
						</li>`;
				}
			}
			$("#F1").html(html).on("mouseenter","li",function(){
				$(this).find(".f1-hover").addClass("in");
			}).on("mouseleave","li",function(){
				$(this).find(".f1-hover").removeClass("in");
			});
			//---------------加载共享精选--------------
			var html1="",html2="";
			var {man,woman}=f2;
			for(var i in man){
				var {cid,title,href,pic,lg,price,sales,goods,is_saved,name}=man[i];
				if(i<2){
					html1+=
						`<li data-saved='${is_saved}' data-cid='${cid}'>
						<p class="desc"><a href="${href}">${title.length>25?title.slice(0,25)+"...":title}</a></p>
						<p class="price">¥${price}</p>
						<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
					</li>`;
				}else{
					html1+=
						`<li data-saved='${is_saved}' data-cid='${cid}'>
						<p class="desc"><a href="${href}">${title.length>15?title.slice(0,15)+"...":title}</a></p>
						<p class="price">¥${price}</p>
						<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
					</li>`;
				}
			}
			for(var i in woman){
				var {cid,title,href,pic,lg,price,sales,goods,is_saved,name}=woman[i];
				if(i<2){
					html2+=
						`<li data-saved='${is_saved}' data-cid='${cid}'>
						<p class="desc"><a href="${href}">${title.length>25?title.slice(0,25)+"...":title}</a></p>
						<p class="price">¥${price}</p>
						<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
					</li>`;
				}else{
					html2+=
						`<li data-saved='${is_saved}' data-cid='${cid}'>
						<p class="desc"><a href="${href}">${title.length>15?title.slice(0,15)+"...":title}</a></p>
						<p class="price">¥${price}</p>
						<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
					</li>`;
				}
			}
			$("#F2-lf").html(html1);$("#F2-rt").html(html2);
			//--------------加载最新上架---------------
			var html="";
			for(var pro of f3){
				var {cid,title,href,pic,lg,price,sales,goods,is_saved}=pro;
				html+=
					`<li data-saved='${is_saved}' data-cid='${cid}'>
						<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
						<p class="desc"><a href="${href}">${title}</a></p>
						<p class="price">¥${price}</p>
						<p>
							<span class="buycount">${sales}</span>人购买，
							<span class="goodcount">${goods}</span>个好评
						</p>
					</li>`;
			}
			$("#F3").html(html);
			//-------------加载4楼楼层男女鞋--------------
			var html1="",html2="";
			var {maleShoe,femaleShoe}=f4;
			for(var pro of maleShoe){
				var {cid,title,href,pic,price,sales}=pro;
				html1+=
					`<li>
						<a href="${href}"><img src="${pic}" alt=""></a>
						<p>${title.length>10?title.slice(0,10):title}</p>
						<p>${sales}人喜欢</p>
					</li>`;
			}
			for(var pro of femaleShoe){
				var {cid,title,href,pic,price,sales}=pro;
				html2+=
					`<li>
						<a href="${href}"><img src="${pic}" alt=""></a>
						<p>${title.length>10?title.slice(0,10):title}</p>
						<p>${sales}人喜欢</p>
					</li>`;
			}
			$(".discover>.discover-goods>ul").html(html1);
			$(".discover>.discover-loves>ul").html(html2);
			//--------------加载5楼tabs楼层-------------
			var html1="",html2="",html3="",html4="";
			var {anything,cloth,pant,dress}=f5;
			for(var pro of anything){
				var {cid,title,href,pic,lg,price,sales,goods,is_saved}=pro;
				html1+=
					`<li data-saved='${is_saved}' data-cid='${cid}'>
						<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
						<div>
							<p class="desc">${title}</p>
							<p><span class="price">¥${price}</span></p>
							<div class="f1-hover">
								<a href="${href}">查看详情</a>
								<a href="javascript:;" class="store ${is_saved>0?'hasStore':''}">${is_saved>0?'您已收藏':'加入收藏'}</a>
							</div>
						</div>
					</li>`;
			}
			for(var pro of cloth){
				var {cid,title,href,pic,lg,price,sales,goods,is_saved}=pro;
				html2+=
					`<li data-saved='${is_saved}' data-cid='${cid}'>
						<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
						<div>
							<p class="desc">${title}</p>
							<p><span class="price">¥${price}</span></p>
							<div class="f1-hover">
								<a href="${href}">查看详情</a>
								<a href="javascript:;" class="store ${is_saved>0?'hasStore':''}">${is_saved>0?'您已收藏':'加入收藏'}</a>
							</div>
						</div>
					</li>`;
			}
			for(var pro of pant){
				var {cid,title,href,pic,lg,price,sales,goods,is_saved}=pro;
				html3+=
					`<li data-saved='${is_saved}' data-cid='${cid}'>
						<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
						<div>
							<p class="desc">${title}</p>
							<p><span class="price">¥${price}</span></p>
							<div class="f1-hover">
								<a href="${href}">查看详情</a>
								<a href="javascript:;" class="store ${is_saved>0?'hasStore':''}">${is_saved>0?'您已收藏':'加入收藏'}</a>
							</div>
						</div>
					</li>`;
			}
			for(var pro of dress){
				var {cid,title,href,pic,lg,price,sales,goods,is_saved}=pro;
				html4+=
					`<li data-saved='${is_saved}' data-cid='${cid}'>
						<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
						<div>
							<p class="desc">${title}</p>
							<p><span class="price">¥${price}</span></p>
							<div class="f1-hover">
								<a href="${href}">查看详情</a>
								<a href="javascript:;" class="store ${is_saved>0?'hasStore':''}">${is_saved>0?'您已收藏':'加入收藏'}</a>
							</div>
						</div>
					</li>`;
			}
			$("#F4-all").html(html1);
			$("#F4-clothes").html(html2);
			$("#F4-pants").html(html3);
			$("#F4-dress").html(html4);
			//--------------加载6楼随便逛逛--------------------
			var html="";
			for(var pro of f6){
				var {cid,title,href,pic,lg,price,sales,goods,is_saved}=pro;
				html+=
					`<li data-saved='${is_saved}' data-cid='${cid}'>
						<a href="${href}"><img src="${pic}" data-lg="${lg}"></a>
						<p class="desc"><a href="${href}">${title}</a></p>
						<p class="price">¥${price}</p>
						<p>
							<span class="buycount">${sales}</span>人购买，
							<span class="goodcount">${goods}</span>个好评
						</p>
					</li>`;
			}
			$("#F6").html(html);
		},
		error:function(){
			location.href="500.html@back="+location.href;
		}
	});
	//----------------设置3楼足球刷新界面---------------------
	$(".discover>div>.title").on("click","a",function(e){
		e.preventDefault();
		var $this=$(this);
		$this.addClass("action").siblings("img").addClass("action");
		$this.parent().next().find("li").addClass("faded");
		tt=setTimeout(function(){
			$this.removeClass("action").siblings("img").removeClass("action");
			$this.parent().next().find("li").removeClass("faded");
		},5000);
		tt=null;
	});
	//----------------设置5楼标签tabs跳转事件---------------------
	$("[data-toggle=tab]").parent().on("mouseover","[data-toggle=tab]",function(e){
			e.preventDefault();
			var $tar=$(e.target);
			 if(!$tar.parent().is(".active")){
			$tar.parent().addClass("active")
			  .siblings().removeClass("active");
			var id=$tar.attr("href");
			$(id).addClass("active")
			  .siblings().removeClass("active");
			$tar.parent().parent().next().attr("href",$tar.attr("data-href"));
		  }
	});
	//-----------------设置5楼li标签hover事件------------------------
	$(".one>.container>ul").on("mouseenter","li>div",function(){
		$(this).find("div").addClass("in");
	}).on("mouseleave","li>div",function(){
		$(this).find("div").removeClass("in");
	});
	//-------------------设置电梯浮动导航栏-------------------------
	var $lift=$("#lift"),$floors=$(".floor");
	$(window).scroll(function(){
		var scrollTop=$(window).scrollTop();
		if(scrollTop>200 && innerWidth==availWidth){
			//console.log(availHeight,availWidth);
			$lift.show("").css({"top":availHeight-690,"right":availWidth/2-656});
			$floors.each(function(i,f){
				var offsetTop=$(f).offset().top;
				if(offsetTop<=scrollTop+innerHeight/2)
					$lift.find(".lift-lists>li:eq("+(i+1)+")").addClass("hover").siblings().removeClass("hover");
				})
			}else $lift.hide("");
	});
	$lift.on("click",".lift-lists>li",function(){
		var $li=$(this);
		var i=$li.index();
		if(i<7){
			var offsetTop=$($floors[i-1]).offset().top;
			$("html").stop(true).animate({
				scrollTop:offsetTop-80
				},500)
		}else{
			$("html").stop(true).animate({
				scrollTop:0
			},500)	
		}
	});
	//----------------设置class为floor-content的li标签的浮动事件----------
	$(".index").on("mouseenter",".li_hover>.floor-content>ul>li",function(){
		var $this=$(this);
		var href=$this.children(":first").attr("href");
		var is_saved=$this.attr("data-saved");
		var html=
			`<div id="li-hover">
				<a href="javascript:;">
					<canvas width="50px" height="50px" id="cvs-lg" title="查看大图">您的浏览器版本太低,请升级后重试</canvas>
				</a>
				<a href="${href}">查看详情</a>
				<a href="javascript:;">${is_saved>0?'已收藏':'加入收藏'}</a>
			</div>`;
		$(html).appendTo($this);
		$("#li-hover").animate({width:224},10);
		//绘制放大按钮图标
		var canvas=$("#cvs-lg")[0];
		var ctx=canvas.getContext("2d");
		ctx.strokeStyle="#e4393c";
		ctx.lineWidth=2;
		ctx.beginPath();
		ctx.arc(25,25,25,0,2*Math.PI);
		ctx.moveTo(23,27);
		ctx.lineTo(8,42);
		ctx.lineTo(10,30);
		ctx.lineTo(8,42);
		ctx.lineTo(20,40);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(27,23);
		ctx.lineTo(42,8);
		ctx.lineTo(30,10);
		ctx.lineTo(42,8);
		ctx.lineTo(40,20);
		ctx.stroke();	
		//设置hover改变透明度事件
		$("#li-hover>a").hover(function(){
			$(this).addClass("hover").siblings().removeClass("hover");
		});
		//为小图片设置点击放大事件
		$("#li-hover>a:first-child").click(function(){
			var lg=$(this).parent().parent().children(":first").children().attr("data-lg");
			var html=
				`<div id="load-lg">
					<p><img src="${lg}" alt=""><span title="关闭窗口">&times;</span></p>
				</div>`;
			$(html).appendTo($(".index")).css({
				"height":availHeight,
				"width":availWidth,
				"marginTop":-availHeight/2,
				"marginLeft":-availWidth/2
			});
			$("#load-lg>p>span").click(function(){
				$(".index").children(":last").remove();
			})
		});
		//加入收藏点击事件
		$("#li-hover>a:last-child").click(function(){
			var $that=$(this);
			$.ajax({
				type:"get",
				url:"data/users/islogin.php",
				dataType:"json",
				success:function(data){
					if(data.ok==0){
						location.href="login.html@back="+location.href;
					}else{
						var cid=parseInt($that.parent().parent().attr("data-cid"));
                           $.ajax({
                                type:"get",
                                url:"data/cart/addStore.php",
                                data:{cid},
								dataType:"json",
                                success:function(data){
                                    if(data.code>0){
										$that.html("已收藏");
									}else{alert("收藏失败,请重试")}
								},
                               error:function(){
                                   location.href="500.html@back="+location.href;
                               }
						})
					}
				}
			})
		})
	}).on("mouseleave",".li_hover>.floor-content>ul>li",function(){
			var $this=$(this);
			$this.children(":last").remove();	
	});
	//--------------------设置加入收藏更新数据库事件----------------------
	$(".div-show").on("click","li>div>.f1-hover>a.store",function(e){
        e.preventDefault();
        var $a=$(this);
		if($a.is(".hasStore")){alert("您已收藏,无需重复收藏!")}
		else{$.ajax({
                type:"get",
                url:"data/users/islogin.php",
                dataType:"json",
                success:function(data){
                    if(data.ok==0){
                        location.href="login.html@back="+location.href;
                    } else{
                        var $img=$a.parent().parent().prev().children("img").clone();
                        $img.appendTo($a.parent().parent().parent()).css(
                            {"position":"absolute","top":0,"right":0})
                            .animate({
                                width:10,height:0,top:'95%',right:'30%'},800,function(){
                                //将加入收藏发送到服务器
                                $img.remove();
                                var cid=$a.parent().parent().parent().attr("data-cid");
                                $.ajax({
                                    type:"get",
                                    url:"data/cart/addStore.php",
                                    data:{cid},
                                    success:function(data){
                                        if(data){
                                            $a.html("您已收藏").addClass("hasStore");
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
	})
});