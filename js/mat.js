circulo=function(x,y,radio,rot)
				{
					this.x=x;
					this.y=y;
					this.radio=radio;
					this.rot=rot;
					this.cord=[];
					this.calc=function()
						{
							this.cord[0]=Math.cos(this.rot)*this.radio+this.x;
							this.cord[1]=Math.sin(this.rot)*this.radio+this.y;
							return this.cord;
						}
				}
fnLin=function(m,x,b)
	{
		this.m=m;	//Pendiente
		this.x=x;
		this.b=b;	//Ordenada al origen
		this.cord=[];
		this.calc=function()
			{
				this.cord[0]=this.x;
				this.cord[1]=this.m*this.x+this.b;
				return this.cord;
			}
	}
	fnCuad=function(a,fn)
		{
			this.a=a;
			this.m=fn.m;
			this.x=fn.x;
			this.b=fn.b;
			this.cord=[];
			this.calc=function()
				{
					this.cord[0]=x;
					this.cord[1]=this.a*Math.pow(this.x,2)+this.m*this.x+this.b;
					return this.cord;
				}
		}