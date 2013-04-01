function media() {
	this.creatlist = function () {
		var b = "";
		for (var a = 0; a < this.list.length; a++) {
			b += '<li id="' + this.liid + a + '"><a href="#">' + this.list[a][0] + '</a><div><a class="fav" title="添加收藏" href="#">收藏</a></div></li>'
		}
		$("#" + this.id).html(b);
		var c = this;
		$("#" + c.id + " li>a").click(function () {
			var d = $("#" + c.id + " li").index($(this).parent());
			c.Click(d);
			return false
		});
		$("#" + c.id + " div>a").click(function () {
			var d = $("#" + c.id + " div").index($(this).parent());
			c.addlistmy(d);
			return false
		})
	};
	this.creatlistmy = function () {
		var e = "";
		var b = readCookie(this.cookiename);
		if (b) {
			b = b.split(",");
			for (var d = 0; d < b.length; d++) {
				var c = Number(b[d]);
				e += '<li id="my' + this.liid + b[d] + '"><a onclick="' + this.name + ".Click(" + c + ');return false;" href="#">' + this.list[c][0] + "</a><div>" + (this.name == "radio" ? ('<a href="#" title="设为我的默认电台" onclick="defaultradio(' + b[d] + ');return false;" class="default">设为默认</a>') : "") + '<a class="fav" title="取消收藏" href="#" onclick="' + this.name + ".remlistmy('" + b[d] + "');return false;\">取消收藏</a></div></li>";
				$("#" + this.liid + c).addClass("fav1");
				$("#" + this.liid + c + " .fav").attr("title", "取消收藏")
			}
		}
		$("#" + this.id + "-my").html(e)
	};
	this.showlist = function () {
		showList("#" + this.id, this.listbottom)
	};
	this.addlistmy = function (c) {
		var a = readCookie(this.cookiename);
		if (a == undefined) {
			a = []
		} else {
			a = a.split(",")
		}
		for (var b = 0; b < a.length; b++) {
			if (a[b] == c) {
				this.remlistmy(c);
				return
			}
		}
		a[a.length] = c;
		$("#" + this.id + "-my").append('<li id="my' + this.liid + c + '"><a onclick="' + this.name + ".Click(" + c + ');return false;" href="#">' + this.list[c][0] + "</a><div>" + (this.name == "radio" ? ('<a href="#" title="设为我的默认电台" onclick="defaultradio(' + c + ');return false;" class="default">设为默认</a>') : "") + '<a class="fav" title="取消收藏" href="#;" onclick="' + this.name + ".remlistmy('" + c + "');return false;\">取消收藏</a></div></li>");
		$("#" + this.liid + c).addClass("fav1");
		$("#" + this.liid + c + " .fav").attr("title", "取消收藏");
		playListmo("#my" + this.liid + c);
		createCookie(this.cookiename, a, 365);
		alertLMes("已添加至我的收藏!")
	};
	this.remlistmy = function (c) {
		var a = readCookie(this.cookiename);
		a = a.split(",");
		for (var b = 0; b < a.length; b++) {
			if (a[b] == c) {
				if (b == 0 && a.length == 1) {
					this.clelistmy()
				} else {
					a.splice(b, 1);
					createCookie(this.cookiename, a, 365);
					if (this.nowlist && this.nowlist == c) {
						$("#audio-cont-wrap:visible").hide()
					}
					$("#my" + this.liid + c).remove();
					$("#" + this.liid + c).removeClass("fav1");
					$("#" + this.liid + c + " .fav").attr("title", "添加收藏")
				}
				alertLMes("已从我的收藏中移除!");
				return
			}
		}
	};
	this.clelistmy = function () {
		if (this.nowlist) {
			$("#audio-cont-wrap:visible").hide()
		}
		eraseCookie(this.cookiename);
		$("#" + this.id + " li.fav1").removeClass("fav1");
		$("#" + this.id + "-my").empty()
	}
}
var audio = new media();
audio.name = "audio";
audio.id = "audio-list";
audio.liid = "al_";
audio.listbottom = '<a onclick="listScroll(0);return false;">评书</a><a onclick="listScroll(9);return false;">相声</a><a onclick="listScroll(12);return false;">读书</a><a onclick="listScroll(16);return false;">鬼故事</a><a onclick="listScroll(65);return false;">其它</a>';
audio.cookiename = "myaudioList";
audio.list = new Array(["明朝那些事", 2685605, 113, "mcnxs"],
		["隋唐演义之罗成别传", 3037791, 10, "styy"],
		["隋唐演义之李元霸别传", 1643117, 10, "styy"],
		["隋唐演义之秦琼别传", 984838, 10, "styy"],
		["《隋唐演义》曹云金", 3144734, 18, "styy"],
		["林则徐 单田芳", 3706990, 48, "lzx"],
		["大话刘罗锅", 2552088, 100, "dhllg"],
		["孙膑演义_春明", 2832794, 13, "sbyy"],
		["《林冲》春明", 2812464, 28, "lc"],
		["相声瓦舍 ", 3536387, 12, "xsws"],
		["刘宝瑞相声", 3212529, 51, "lbr"],
		["郭德纲相声 ", 1721497, 53, "gdg"],
		["和空姐同居的日子", 2163279, 32, "hkjtj"],
		["让青春继续 第一季", 2777593, 32, "rqcjx"],
		["让青春继续 第二季", 2778506, 6, "rqcjx"],
		["让青春继续 第三季", 2778507, 32, "rqcjx"],
		["鬼吹灯一：精绝古城", 3217132, 48, "gcd"],
		["鬼吹灯二：龙岭迷窟", 3217138, 45, "gcd"],
		["鬼吹灯三：云南虫谷 ", 3217144, 60, "gcd"],
		["鬼吹灯四：昆仑神宫 ", 3217148, 50, "gcd"],
		["鬼吹灯五：黄皮子坟 ", 3217153, 48, "gcd"],
		["鬼吹灯六：南海归墟 ", 3217157, 50, "gcd"],
		["鬼吹灯第七季：怒晴湘西", 3217163, 54, "gcd"],
		["鬼吹灯第八季：巫峡棺山", 3217175, 36, "gcd"],
		["地狱的第19层", 3243650, 33, "dy19c"],
		["第N种复仇方法", 3243646, 17, "dnzfc"],
		["暗水幽灵", 3243642, 25, "asyl"],
		["第四校区", 3243653, 14, "dsxq"],
		["第四校区续集 ", 3243655, 19, "dsxq"],
		["夜半笛声 ", 3243632, 51, "ybds"],
		["凶画", 3243621, 24, "xh"],
		["女鬼尘缘 ", 3243666, 16, "ngcy"],
		["再爱你一眼 ", 3243669, 40, "zanyy"],
		["一绺长发", 3243673, 26, "ylcf"],
		["夜", 3243683, 11, "y"],
		["天机", 3243695, 28, "tj"],
		["来访的陌生人 ", 3243702, 18, "lfmsr"],
		["校北鬼事 ", 3243713, 40, "xbgs"],
		["死亡时间表 ", 3243719, 26, "swsjb"],
		["神在看着你 ", 3243726, 44, "szkzn"],
		["裸灵", 3243735, 28, "ll"],
		["病毒", 3243744, 25, "bd"],
		["黑眼泪 ", 3243745, 12, "hyl"],
		["勾魂拐", 3243750, 50, "ghg"],
		["虫 ", 3243752, 28, "c"],
		["梦回大清 ", 3243764, 38, "mhdq"],
		[" 风野七咒 ", 3252740, 124, "fyqz"],
		["短篇恐怖鬼故事合辑之二 ", 3252762, 37, "kb"],
		["金锁链 ", 3266827, 4, "jsl"],
		["鬼咒 ", 3266830, 4, "mz"],
		["麻花辫 ", 3266833, 6, "mhb"],
		["周德东亲身经历恐怖故事 ", 3434861, 29, "zzd"],
		["茅山后裔 ", 3243615, 30, "mshy"],
		["伤心至死之万劫 ", 3243612, 48, "sxzs"],
		["伤心至死之轮回", 3243608, 42, "sxzs"],
		["午夜凶铃 ", 3243603, 24, "wyxl"],
		["婴骨花园 ", 3243602, 35, "yghy"],
		["鬼胎 ", 3243599, 11, "gt"],
		["荒村公寓 ", 3243590, 33, "hcgy"],
		["女生寝室 ", 3243587, 40, "nsqs"],
		["九命猫 ", 3243586, 23, "jmm"],
		["三岔口 ", 3243582, 34, "sck"],
		["午夜娶新娘", 3243576, 12, "wyqxn"],
		["红棺新娘 ", 3243560, 23, "hgxn"],
		["盗墓笔记第一部 ", 3217181, 130, "dmbj"],
		["背后有人 ", 3206896, 46, "bhyr"],
		["爱情呵你别开花 ", 3206888, 36, "aqhh"],
		["幽冥三部曲之二樱花厉魂 ", 3182294, 9, "ml"],
		["幽冥三部曲之一冤鬼路", 3182289, 6, "ml"],
		["602噬人公寓 ", 3182176, 37, "620"],
		["妮妮讲鬼故事 ", 3176436, 97, "nn"],
		["短篇恐怖鬼故事合辑", 2088235, 171, "kb"],
		["张震讲鬼故事全集 ", 2083609, 67, "zz"],
		["小迷糊讲故事 ", 2452513, 3, "xmh"],
		["1068夜航班 王琳讲故事 ", 2205801, 15, "1068"],
		["六祖慧能 东北大鼓", 1389909, 41, "lzhn"],
		["摇旗呐喊-齐齐哈尔人民广播电台", 3707066, 60, "yqnh"]);
audio.nowlist = 1000;
audio.Click = function (d) {
	var c = "",
	a = "";
	for (var b = 0; b < audio.list[d][2]; b++) {
		if (b < 44) {
			c += '<a href="#" onclick="audio.play(' + b + ');return false;" title="点击播放">[' + ((b + 1 < 10) ? "0" + (b + 1) : b + 1) + "]</a>"
		} else {
			for (var e = 1; e <= Math.ceil(audio.list[d][2] / 44); e++) {
				a += '<a onclick="audio.swcont(' + e + ');return false;" href="#">' + e + "</a>"
			}
			break
		}
	}
	$("#audio-cont-wrap .list").html(c);
	if (audio.list[d][2] > 44) {
		$("#audio-cont-wrap .nav").html(a);
		$("#audio-cont-wrap .nav").show()
	} else {
		$("#audio-cont-wrap .nav").hide()
	}
	$("#audio-cont-wrap").fadeIn("slow");
	audio.nowlist = d
};
audio.swcont = function (d) {
	var c = "";
	var a = (d * 44 < this.list[this.nowlist][2]) ? d * 44 : this.list[this.nowlist][2];
	for (var b = (d - 1) * 44; b < a; b++) {
		c += '<a href="#" onclick="audio.play(' + b + ');return false;" title="点击播放">[' + ((b + 1 < 10) ? "0" + (b + 1) : b + 1) + "]</a>"
	}
	$("#audio-cont-wrap .list").html(c)
};
audio.play = function (a) {
	var b = '<embed width="390" height="150" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="isAutoPlay=true"  allowfullscreen="false" quality="high" bgcolor="#000" name="movie_player" id="movie_player" src="http://player.youku.com/player.php/Type/Folder/Fid/' + this.list[this.nowlist][1] + "/Ob/1/Pt/" + a + '/sid/XODQyOTM5ODA=/v.swf" type="application/x-shockwave-flash" wmode="transparent" style="margin-top:-110px"></embed>';
	$("#audio-player").html(b).show();
	if ($("#player-media-wrap").css("display") != "none") {
		ctrl(2);
		$("#player-media-wrap").hide()
	}
	$("#announcer").html('<div id="announcer-img"><img src="images/logo_au_' + this.list[this.nowlist][3] + '.gif"/></div><div id="state" class="info"><span>' + this.list[this.nowlist][0] + "</span><strong>共" + this.list[this.nowlist][2] + "集</strong></div>");
	$("#rl_" + playing).removeClass("playing");
	$("#myrl_" + playing).removeClass("playing")
};
var radio = new media();
radio.name = "radio";
radio.liid = "rl_";
radio.id = "radio-list";
radio.listbottom = '<a id="play-regin-open" title="按地区分类浏览" onclick="radio.switchplayRegin();">地区分类</a><a id="play-cont-open" title="按内容分类浏览" onclick="radio.switchplayCont();">内容分类</a>';
radio.cookiename = "myplayList";
radio.list = radio_info;
radio.Click = function (a) {
	ctrl(8, a);
	$("#audio-cont-wrap:visible").fadeOut()
};
radio.playregin = function () {
	var b = "";
	for (var a = 0; a < radio_info.length; a++) {
		if (radio_info[a][4] != undefined && radio_info[a][4] != "") {
			b += '<a onclick="listScroll(' + a + ');return false;" href="#">' + radio_info[a][4] + "</a>"
		}
	}
	$("#play-regin-wrap").html(b)
};
radio.playcont = function () {
	var b = "";
	for (var a = 0; a < radio_cont.length; a++) {
		b += '<a href="#" onclick="radio.listCont(' + (a + 1) + ');return false;">' + radio_cont[a] + "</a>"
	}
	$("#play-cont-wrap").html(b)
};
radio.listCont = function (a) {
	$("#radio-list li").show();
	for (var b = 0; b < radio_info.length; b++) {
		if (radio_info[b][5] != a) {
			$("#rl_" + b).hide()
		}
	}
};
radio.switchplayRegin = function () {
	$("#play-cont-wrap").hide();
	if ($("#play-regin-wrap").css("display") == "block") {
		$("#play-regin-wrap").fadeOut("slow")
	} else {
		$("#radio-list li").show();
		$("#play-regin-wrap").fadeIn("slow")
	}
};
radio.switchplayCont = function () {
	$("#play-regin-wrap").hide();
	if ($("#play-cont-wrap").css("display") == "block") {
		$("#play-cont-wrap").fadeOut("slow")
	} else {
		$("#play-cont-wrap").fadeIn("slow")
	}
};
audio.creatlist();
audio.creatlistmy();
radio.creatlist();
radio.creatlistmy();
radio.playregin();
radio.playcont();
playListmo();
$(".play-fwrap a").focus(function () {
	this.blur()
});
function showplayListmy() {
	showList("#play-list-my", '<a onclick="radio.clelistmy();audio.clelistmy();" title="清空我的收藏">清空收藏</a>');
	if (!readCookie("myplayList") && !readCookie("myaudioList")) {
		alertLMes("您还没有收藏电台，快选择自己喜欢的电台吧", 2000, "fast")
	}
}
function showList(b, a) {
	$("#play-fwrap>div:visible").fadeOut("slow");
	$("#play-list>ul:visible").hide();
	$(b).show();
	$(b + " li").show();
	$("#play-list").scrollTop(0);
	$("#list-bottom-ctrl").html(a)
}
$("#play-list-my-open").click(showplayListmy);
$("#radio-list-open").click(function () {
	radio.showlist()
});
$("#audio-list-open").click(function () {
	audio.showlist()
});
function listScroll(c) {
	$("#radio-list li").show();
	var b = $("#play-list").scrollTop() - $("#play-list").scrollTop() % 20;
	if (Math.abs(c * 20 - b) > 200) {
		b = (c * 20 > b) ? (c * 20 - 200) : (c * 20 + 200)
	}
	(function a() {
		if (b != c * 20) {
			setTimeout(function () {
				b = (b < c * 20) ? b + 20 : b - 20;
				$("#play-list").scrollTop(b);
				a()
			},
				5)
		} else {
			$("#play-list").scrollTop(b + 2);
			return
		}
	})()
}
$("#searchlist input").focus(function () {
	$(this).val("")
});
$("#searchlist input").keypress(function (b) {
	if (b.keyCode == 13) {
		var a = $(this).val();
		$("#play-list ul:visible li").hide();
		$("#play-list ul:visible li:contains(" + a + ")").show()
	}
	b.stopPropagation()
});
$("#play-list").mousewheel(function (b, a) {
	if (a < 0 && $(this).scrollTop() >= parseInt($("#play-list ul:visible").height()) - 240) {
		b.preventDefault()
	}
	b.stopPropagation()
});
(function () {
	var b;
	function a(g) {
		var c = g ? 2 : -2;
		b = false;
		var d = $("#play-list").scrollTop();
		var f = parseInt($("#play-list ul:visible").height() - 240);
		function e() {
			if ((g ? d < f : d > 0) && !b) {
				setTimeout(function () {
					$("#play-list").scrollTop(d);
					d = d + c;
					e()
				},
					10)
			}
		}
		e()
	}
	$("#play-list-down").mousedown(function () {
		a(1)
	});
	$("#play-list-up").mousedown(function () {
		a()
	});
	$("#play-list-up,#play-list-down").mouseup(function () {
		b = true
	})
})();
function defaultradio(a) {
	createCookie("defaultradio", a, 365);
	alertLMes("默认电台设置成功！")
}
function alertLMes(a, c, b) {
	$("#play-list-mes").html(a);
	if (c == undefined) {
		var c = 1000
	}
	if (b == undefined) {
		var b = "fast"
	}
	$("#play-list-mes").show(b);
	setTimeout(function () {
		$("#play-list-mes").hide("slow")
	},
		c)
}
function playListmo(a) {
	if (a == undefined) {
		var a = "#play-list li"
	}
	$(a).mouseover(function () {
		$(this).addClass("over")
	});
	$(a).mouseout(function () {
		$(this).removeClass("over")
	})
}
if (readCookie("myplayList") || readCookie("myaudioList")) {
	showplayListmy()
} else {
	radio.showlist();
	alertLMes("您还没有收藏电台，快选择自己喜欢的电台吧", 3000, "slow")
}
$("#rl_" + playing + ",#myrl_" + playing).addClass("playing");