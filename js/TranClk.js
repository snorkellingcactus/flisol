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
TranClk=function(cfg,ret)
{
	this.fnFin=this.fnEsc=function(){return 0};
	this.enCurso=0;
	this.x=0;
	this.xmax=0;
	this.inc=1;
	this.ret=ret;
	this.cfg=cfg;
	this.forMax=cfg.length;
	for(var c=0;c<cfg.length;c++)
	{
		if(cfg[c].xmax>this.xmax)
		{
			this.xmax=cfg[c].xmax;
		}
	}
	c=null;
	this.anima=function()
	{
		for(j=0;j<this.forMax;j++)
		{
			obj=cfg[j];
			if(obj.x+this.inc<=obj.xmax&&obj.x+this.inc>=0)
			{
				obj.x+=this.inc;
				obj.obj.style[obj.prop]=obj.calc()[1]+obj.uni;
			}
		}
		this.x+=this.inc;
		if(this.x==this.xmax||this.x==0)
		{
			return 0;
		}
	}
	this.preAnima=function()
	{
		if(this.anima()!=0)
		{
			this.tOut=setTimeout(this.preAnima.bind(this),this.ret);
		}
		else
		{
			clearTimeout(this.tOut);
			this.enCurso=0;
			this.fnFin();
			return 0;
		}
	}
	this.detona=function()
	{
		if(this.enCurso)
		{
			this.fnEsc();
		}
		else
		{
			this.enCurso=1;
			this.preAnima();
		}
	}
}