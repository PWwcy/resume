(function(){
	var winW=window.innerWidth;
	var winH=window.innerHeight;
	var ch = "林";
	var text = [
		ch+",我这样喊你可以吧!@知道接下来怎么办吗?@按方向键下(↓)就可以了",
		ch+",还记得2018年10月21日吗?@那是我们第一次见面哦?@我就只记得那天太阳挺大的!@不过我们没说到几句话你就走了!",
		ch+",还记得2018年11月4日吗?@那是我们第一次约会哦!@我记得是在龙湖北城天街购物中心!@我们那天走了很久!@感觉我的话比较多!@还坐下来一起喝了个奶茶!@那天还去看电影的!@我记得看的是<流浪猫鲍勃>!@但是看完我们就都回了!",
		ch+",你知道吗?@自从我们约过一次会后!@我就对你念念不忘!@虽然你长得不是特别漂亮!@但是你在我心里依然是很重要的!@可惜第二周你没空!@这周我特别的想你!@",
		ch+",还记得锦里吗?@那是我们的第二次约会了!@距上次约会过了两周了!@那天,我们一起逛了锦里古街!@却什么都没有买!@然后我们就去吃了个饭!@接下来又去看电影了!@我还记得看的是<毒液>!@可是看完过后就去坐地铁回家了!@你不知道,那天我多想牵着你的手!",
		,
		,
		,
		,
		,
		,
		,
		,
		,
		,
		ch+",是不是没看够啊!@不过这真的是最后一张了!@如果还想看就按方向键上(↑)哦!@虽然这里是结束了!@但是我们不会就这样结束的!@我们的爱更不会结束!@爱你哟!!!"
	]

	var Love = function(){};
	Love.prototype.init = function(w,h) {
		this.winW=w;
		this.winH=h;
		this.conx=w*5;
		this.cony=h*5
		this.xs=1;
		this.yy=1;
		this.xx=0;
		this.out=[];
		this.tt=0;
		this.el = $('.container');
		this.el.css({
			height: this.cony,
			width: this.conx,
			top: -this.winH,
			left: 0
		})
		this.el.find('.first>div').css({
			margin:'0 '+this.winW/2+"px"
		})
		$('.container>div:not(.kong)').css({
			height: this.winH,
			width: this.conx
		})

		$('.container>div:not(.kong)>div').css({
			height: this.winH,
			width: this.winW
		})
		this.back();
		this.keyup();
		this.showtext();
	};
	Love.prototype.keyup=function(){
		var that = this;
		$('body').keyup(function(e){
			var code = e.keyCode;
			if(code !=116 ){
				$('.content').remove();
			}
			switch(code){
				case 38:
					if(that.xs>1){
						that.sshow();
						that.xs--;
					}
					break;
				case 40:
					if(that.xs<16){
						that.xs++;
						that.xshow();
					}
					break;
				case 27:
					that.clearout();
					that.esc();
					break;
				case 32:
					// that.init();
					break;
			}
			if(code != 116 && code != 27){
					that.showtext();
			}
		})
	}
	Love.prototype.xshow=function(){
		switch(this.xs){
			case 3:
				this.yy=0;
				this.xx++;
				break;
			case 7:
				this.yy=1;
				this.xx++;
				break;
			case 11:
				this.yy=0;
				this.xx++;
				break;
			case 15:
				this.yy=1;
				this.xx++;
				break;
			default:
				this.yy++;
				console.log(this.yy,this.xx,this.xs)
				break;
		}
		this.el.css({
			top: -this.winH*this.yy,
			left: -this.winW*this.xx,
		})
	}
	Love.prototype.sshow=function(){
		switch(this.xs){
			case 3:
				this.yy=2;
				this.xx--;
				break;
			case 7:
				this.yy=3;
				this.xx--;
				break;
			case 11:
				this.yy=4;
				this.xx--;
				break;
			case 15:
				this.yy=3;
				this.xx--;
				break;
			default:
				this.yy--;
				
				break;
		}
		this.el.css({
			top: -this.winH*this.yy,
			left: -this.winW*this.xx,
		})
	}
	Love.prototype.esc = function() {
		$('.kong').css({
			height: '5%'
		})
		this.el.css({
			width: this.winW,
			height: this.winH,
			top: 0,
			left: 0
		})
		this.el.find('.first>div').css({
			margin:'0 '+(this.winW*0.9)/10+"px"
		})
		$('.container>div:not(.kong)').css({
			height: (this.winH*0.9)/5,
			width: this.winW
		})

		$('.container>div:not(.kong)>div').css({
			height: (this.winH*0.9)/5,
			width: (this.winW*0.9)/5
		})
	};
	Love.prototype.back = function() {
		var divs = $('.container>div:not(.kong)>div');
		for(var i=0;i<divs.length;i++){
			$(divs[i]).css({
				backgroundImage:'url(./images/'+($(divs[i]).attr("wz")*1+100)+'.jpg)',
				backgroundSize: '100% 100%',
				backgroundRepeat: 'no-repeat',
			})
		}
	};
	Love.prototype.showtext = function() {
		this.tt=0;
		var con = text[this.xs-1].split("@");
		this.clearout();
		this.out=[];
		var div = $('.container>div:not(.kong)>div[wz="'+this.xs+'"]');
		for(var i=0;i<con.length;i++){
			this.yanshi(div,con[i],i);
		}
	};
	Love.prototype.clearout=function(){
		if(this.out.length !=0){
			for(var j=0;j<this.out.length;j++){
				clearInterval(this.out[j]);
			}
		}
	}
	Love.prototype.yanshi = function(el,con,i) {
		var that = this;
		this.out.push(setTimeout(function(){
			var str = "<span class='content'>"+con+"</span>";
			el.append(str);
			if(that.xs == 1){
				el.find('.content:eq('+i+')').css({
					top: that.winH/2+(that.tt*80)+50,
					left: that.winW/2-that.winW/8,
					height: 0
				}).animate({
					height: '50px'
				});
			}else{
				el.find('.content:eq('+i+')').css({
					top: that.winH/7+(that.tt*60)+50+50,
					left: that.winW/2-that.winW/5,
					opacity: 0
				}).animate({
					top: that.winH/7+(that.tt*60)+50,
					opacity: 1
				});
			}
			that.tt++;
		},1500*(i+1)))
	};

	var love = new Love();
	love.init(winW,winH);





	
})()