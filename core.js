(function(c) {
	var a = ["DOMMouseScroll", "mousewheel"];
	c.event.special.mousewheel = {
		setup: function() {
			if (this.addEventListener) {
				for (var d = a.length; d;) {
					this.addEventListener(a[--d], b, false)
				}
			} else {
				this.onmousewheel = b
			}
		},
		teardown: function() {
			if (this.removeEventListener) {
				for (var d = a.length; d;) {
					this.removeEventListener(a[--d], b, false)
				}
			} else {
				this.onmousewheel = null
			}
		}
	};
	c.fn.extend({
		mousewheel: function(d) {
			return d ? this.bind("mousewheel", d) : this.trigger("mousewheel")
		},
		unmousewheel: function(d) {
			return this.unbind("mousewheel", d)
		}
	});
	function b(f) {
		var d = [].slice.call(arguments, 1),
		g = 0,
		e = true;
		f = c.event.fix(f || window.event);
		f.type = "mousewheel";
		if (f.wheelDelta) {
			g = f.wheelDelta / 120
		}
		if (f.detail) {
			g = -f.detail / 3
		}
		d.unshift(f, g);
		return c.event.handle.apply(this, d)
	}
})(jQuery);
var playing, playerplaying = 1;
function $e(a) {
	return document.getElementById(a)
}
function $ifm(a, b) {
	return window.frames[b].document.getElementById(a)
}
function moveMouse(d, c, a) {
	var g = 0;
	var e = 0;
	var b = 0;
	var h = 0;
	var f = false;
	$(d).mousedown(function(i) {
		f = true;
		g = i.clientX;
		e = i.clientY;
		b = $(c).offset().top;
		h = a ? parseInt($(c).css("margin-left")) : $(c).offset().left;
		$(document).bind("mousemove",
		function(k) {
			k.preventDefault();
			if (f) {
				var j = (h + k.clientX - g);
				var l = (b + k.clientY - e);
				if (a) {
					j = j < 0 ? 0 : j > 55 ? 55 : j;
					$(c).css({
						"margin-left": j + "px"
					})
				} else {
					$(c).css({
						left: j + "px",
						top: l + "px",
						margin: "0"
					})
				}
			}
		});
		$(document).bind("mouseup",
		function(j) {
			if (f) {
				if (a) {
					ctrl(5, Math.round((j.clientX - g) * 20 / 11), 1)
				}
				f = false;
				g = 0;
				e = 0;
				b = 0;
				h = 0;
				$(document).unbind("mousemove");
				$(document).unbind("mouseup")
			}
		})
	})
}
function randUrl(c) {
	var d = radio_info[c][5];
	var a = readCookie("bg");
	return Math.random() > 0.4 ? d: (a && Math.random() > 0.4 ? a: 14)
}
function ctrl(q, n, b) {
	var c = $ifm($.browser.msie ? "MediaPlayer": "MediaPlayer1", "wmp");
	switch (q) {
	case 1:
		if (playerplaying) {
			playerplaying = 0;
			c.controls.stop();
			$("#player-ctrl-play").addClass("play")
		} else {
			playerplaying = 1;
			c.controls.play();
			$("#player-ctrl-play").removeClass("play")
		}
		break;
	case 2:
		c.controls.stop();
		break;
	case 3:
		var h, o, l, f, p, d = readCookie("myplayList");
		if (n) {
			h = -1;
			o = playing - 1 >= 0;
			p = radio_info.length - 1
		} else {
			h = 1;
			o = playing + 1 < radio_info.length;
			p = 0
		}
		if (d) {
			d = d.split(",");
			var e, a = 0;
			for (var g = 0; g < d.length; g++) {
				if (d[g] == playing) {
					a = 1;
					e = g;
					break
				}
			}
			if (n) {
				l = e - 1 >= 0;
				f = d.length - 1
			} else {
				l = e + 1 < d.length;
				f = 0
			}
			if (a && l) {
				ctrl(8, d[e + h])
			} else {
				if (a) {
					ctrl(8, d[f])
				} else {
					if (o) {
						ctrl(8, playing + h)
					} else {
						ctrl(8, p)
					}
				}
			}
		} else {
			if (o) {
				ctrl(8, playing + h)
			} else {
				ctrl(8, p)
			}
		}
		break;
	case 5:
		c.settings.volume += n;
		if (!b) {
			$("#volume span").css("margin-left", c.settings.volume * 0.55)
		}
		k();
		break;
	case 7:
		if (c.settings.mute) {
			c.settings.mute = false;
			$("#ct-sound").css({
				"background-position": "0px 7px"
			})
		} else {
			c.settings.mute = true;
			$("#ct-sound").css({
				"background-position": "-22px 7px"
			})
		}
		break;
	case 8:
		$("#audio-player:visible").hide().html("");
		if (!playerplaying) {
			playerplaying = 1;
			$("#player-ctrl-play").removeClass("play")
		}
		if (radio_info[n][5] != radio_info[playing][5]) {
			loadImage(randUrl(n))
		}
		c.URL = radioUrl(n);
		$("#player-media-wrap:hidden").show();
		$("#rl_" + playing + ",#myrl_" + playing).removeClass("playing");
		$("#rl_" + n + ",#myrl_" + n).addClass("playing");
		playing = n;
		addInfo(n);
		break
	}
	function k() {
		if (c.settings.mute) {
			$("#ct-sound").css({
				"background-position": "-23px 7px"
			})
		} else {
			$("#ct-sound").css({
				"background-position": "0px 7px"
			})
		}
	}
}
function addInfo(a) {
	$("#announcer").html('<div id="announcer-img"><img src="images/logo_' + radio_info[a][2] + '.gif"/></div><div id="state" class="info"><span>' + radio_info[a][0] + "</span><strong>" + radio_info[a][3] + "</strong></div>")
}
function showMenu(a) {
	if (!$("#play-list p").length && typeof(audio) == "undefined") {
		$("#play-list").append("<p>正在加载...</p>");
		$.getScript("mediaobj.js",
		function() {
			$("#play-list p").remove()
		})
	}
	if (!a) {
		$("#play-menu").fadeIn("slow")
	}
}
$("#play-list-open").click(function() {
	showMenu();
	return false
});
$("#play-list-close").click(function() {
	$("#play-menu").fadeOut("slow")
});
moveMouse("#list-ctrl", "#play-menu");
moveMouse("#volume span", "#volume span", "v"); (function() {
	function g(c) {
		playing = c;
		var a = readCookie("bg");
		$("#bg td").html('<img src="" alt="" galleryimg="no"/>');
		loadImage((a && a < 15 && a >= 0 ? a: (Math.random() > 0.65 ? radio_info[c][5] : 14)), "欢迎来到拾贝电台");
		addInfo(c)
	}
	var e = readCookie("defaultradio");
	var h = readCookie("myplayList");
	var b = readCookie("myaudioList");
	if (e) {
		g(Number(e))
	} else {
		if (h) {
			h = h.split(",");
			var d = Number(h[0]);
			g(d)
		} else {
			g(0)
		}
	}
	if (!h && !b) {
		showMenu()
	}
})();
function popUpBox(d, c, b, a) {
	b = "<div id=" + d + ' class="popbox" style="filter:alpha(opacity=90);' + a + '"><h3>' + c + '<span><a title="点击关闭">×</a></span></h3><div class="con">' + b + "</div></div>";
	$("body").append(b);
	if (Math.random() > 0.7) {
		$("#" + d + " h3 a").click(function() {
			$(this).parents("div").fadeOut("slow",
			function() {
				$(this).remove()
			})
		});
		$("#" + d).fadeIn("slow")
	} else {
		$("#" + d + " h3 a").click(function() {
			$(this).parents("div").slideUp("slow",
			function() {
				$(this).remove()
			})
		});
		$("#" + d).slideDown("slow")
	}
	moveMouse("#" + d + " h3", "#" + d)
}
$("#play-help-open").click(function() {
	if ($e("play-help")) {
		return false
	}
	popUpBox("play-help", "使用说明", "加载中...", "margin:-145px 0 0 -200px;top:40%;left:50%;width:400px;height:292px");
	$("#play-help .con").load("help_statement.html dl");
	return false
});
function bbsbox() {
	if ($e("bbsbox")) {
		return
	}
	popUpBox("bbsbox", "论坛新帖", "加载中...", "left:20px;top:40%;width:270px;margin-top:-145px");
	$.getScript("http://bbs.kainy.cn/new.php?action=notice&num=1&date=1&length=30",
	function() {
		$("#bbsbox h3").after('<p id="bbsnotice">' + bbsnotice + "</p>")
	});
	$.getScript("http://bbs.kainy.cn/new.php?action=article&fidin=46_47_49_50_51_52_53&digest=0&postdate=0&author=1&fname=0&hits=0&replies=1&pre=1&num=10&length=36&order=1",
	function() {
		$e("bbsbox").getElementsByTagName("div")[0].innerHTML = "<ul>" + bbslist + '</ul><div class="bottom"><a target="_blank" href="http://bbs.kainy.cn/" title="是广播让我们聚在一起">去论坛逛逛吧? </a></div>'
	})
}
function alertMes(b, a, c) {
	if (a == "load") {
		b = '<img align="absmiddle" alt="Loading" src="images/loading.gif"/>' + b
	} else {
		if (a == "confirm") {
			b += '<button class="button">确定</button>'
		}
	}
	$("#bg").after('<table id="alertMes"  cellpadding="0" cellspacing="0" style="filter:alpha(opacity=80);height:' + (c ? c: 65) + 'px;"><td>' + b + "</td></table>");
	$("#alertMes").fadeIn("fast",
	function() {
		if (!a) {
			setTimeout(function() {
				$("#alertMes").fadeOut("slow",
				function() {
					$("#alertMes").remove()
				})
			},
			1000)
		}
	})
}
function loadImage(c, b) {
	if (b == undefined) {
		var b = " 请稍后"
	}
	var a = new Image();
	a.src = "images/bg/" + c + ".jpg";
	if (a.complete) {
		$("#bg img").css({
			opacity: "0.2"
		}).attr({
			src: a.src
		}).animate({
			opacity: "1"
		},
		"slow");
		return
	}
	alertMes(b, "load");
	a.onload = function() {
		$("#alertMes").fadeOut("fast",
		function() {
			$("#alertMes").remove();
			$("#bg img").css({
				opacity: "0.2"
			}).attr({
				src: a.src
			}).animate({
				opacity: "1"
			},
			"slow")
		})
	}
}
$(document).keydown(function(b) {
	var a = b.keyCode;
	if (a > 31 && a < 41 || $.inArray(a, [13, 188, 190, 191, 66, 67, 112]) >= 0) {
		b.preventDefault()
	}
	switch (a) {
	case 13:
		ctrl(1);
		break;
	case 32:
		if ($("#play-menu:visible").length) {
			$("#play-menu").fadeOut("slow")
		} else {
			showMenu()
		}
		break;
	case 33:
		ctrl(3, 1);
		break;
	case 34:
		ctrl(3);
		break;
	case 36:
		var c = $("#bg img").attr("src").match(/(\d+).jpg/)[1];
		createCookie("bg", c, 365);
		alertMes("您的默认主题设置成功");
		break;
	case 37:
		var c = Number($("#bg img").attr("src").match(/(\d+).jpg/)[1]);
		loadImage((c > 0 ? (c - 1) : 14));
		break;
	case 38:
		break;
	case 39:
		var c = Number($("#bg img").attr("src").match(/(\d+).jpg/)[1]);
		loadImage((c < 14 ? (c + 1) : 0));
		break;
	case 40:
		break;
	case 188:
		ctrl(5, -10);
		break;
	case 190:
		ctrl(5, 10);
		break;
	case 191:
		if ($e("play-help-scuts")) {
			$("#play-help-scuts h3 a").click()
		} else {
			if ($e("play-help-scuts")) {
				return false
			}
			popUpBox("play-help-scuts", "快捷键", "加载中...", "margin:-157px 0 0 -200px;top:40%;left:50%;width:400px;height:314px;overflow:hidden;");
			$("#play-help-scuts .con").load("help_shortcuts.html")
		}
		break;
	case 66:
		if ($e("bbsbox")) {
			$("#bbsbox h3 a").click()
		} else {
			bbsbox()
		}
		break;
	case 77:
		ctrl(7);
		break;
	case 112:
		if ($e("play-help")) {
			$("#play-help h3 a").click()
		} else {
			$("#play-help-open").click()
		}
		break
	}
});
$(document).mousewheel(function(a, b) {
	ctrl(5, b * 5);
	a.preventDefault()
});
$(document).dblclick(function(a, b) {
	ctrl(1);
	a.preventDefault()
});
window.onhelp = function() {
	window.event.returnValue = false
};
if ($.browser.webkit) {
	if ($.browser.safari) {
		$("#player-ctrl .up,#player-ctrl span,#player-ctrl .down").hide()
	}
	if ($("#bg img").height() < window.innerHeight) {
		$("#bg img").height(window.innerHeight)
	}
}
if ($.browser.opera) {
	$(document).keypress(function(b) {
		var a = b.keyCode;
		if (a > 31 && a < 41 || $.inArray(a, [13, 44, 46, 47, 98, 109, 112]) >= 0) {
			b.preventDefault()
		}
	})
}
window.onload = function() {
	showMenu(1)
};