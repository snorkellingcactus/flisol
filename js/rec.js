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
rec=function(modo,tipo)
{
	this.fnVar=this.fnArr=this.fnNivDec=function(arr,clave){};
	this.niv=0;

	if(modo)
	{
		this.condArr=function(obj)
		{
			return typeof(obj)=="object";
		}
	}
	else
	{
		this.tipoArr=tipo;
		this.condArr=function(obj)
		{
			return obj.constructor.toString().indexOf(this.tipoArr)!=-1;
		}
	}

	this.detona=function(arr)
	{
		this.niv++;

		for (clave in arr)
		{
			if(this.condArr(arr[clave]))
			{
				this.arrAct=arr;
				this.fnArr(arr,clave);
				this.detona(arr[clave]);
			}
			else
			{
				this.fnVar(arr,clave);
			}
		}

		this.niv--;
		this.fnNivDec(arr,clave);

		return 0;
	}
}