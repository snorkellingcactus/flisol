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
TransMods.refNum=function()
{
	this.reg=[];
	this.proc=false;
	
	this.activa=this.anula=function()
	{
		this.proc=!this.proc;
	}
	
	this.detona=function(cfg)
	{
		if(this.proc)
		{
			this.reg.push(cfg[0].length);
		}
	}
	
	this.postConf=function(cfg)
	{
			this.reg[this.reg.length-1]=cfg.slice(-this.reg[this.reg.length-1]);
	}
	this.selB=function(num)
	{
		res=[];
		for(n=0;n<arguments.length;n++)
		{
			res=res.concat(this.reg[arguments[n]]);
		}
		return res;
	}
}