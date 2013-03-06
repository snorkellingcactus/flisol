/*
	Copyright (C) 2013 Nadal Gonzalo García Zavala

	This file is part of flisol.

	flisol is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	flisol is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with flisol.  If not, see <http://www.gnu.org/licenses/>.
*/
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