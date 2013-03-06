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
/*
::::::Requerimentos::::::
-mat.js
-rec.js

::::::::::FUNCION:::::::::::
Realizar una trancición entre 2 valores en una sierta cantidad de veces, el resultado de cada vez se pasa a la función que se especifique.
Por ej: del 3 al 9, en 3 pasos:
paso1: 5
paso2: 7
paso3: 9

Se puede modificar el comportamiento y la sintaxis de la configuración con módulos.

:::::::::::Uso:::::::::::
-Configura:
Trans.detona
(
	[
		[
			[val1,...],
			[val2,...],
			[veces,...],
			[funcion,...]
		],
		...
	]
)

Aumenta y calcula veces:

Trans.cfg[0].x++;
Trans.cfg[0].calc(); 
*/
TransMods={};
Trans=function()
{
	this.cfg=[];
	this.fn=[];
	this.mod={};
	
	if(arguments.length)
	{
		for(m=0;m<arguments.length;m++)
		{
			this.mod[arguments[m]]=new TransMods[arguments[m]];
		}
	}
	this.consultaMod=function(fn,param)
	{
		for(llave in this.mod)
		{
			if(this.mod[llave][fn])
			{
				this.mod[llave][fn](param);
			}
		}
	}
	this.parStrMod=function(str,fn)
	{
		for(s=0;s<str.length;s++)
			{
				strMod=str[s].split(":");
				mod=strMod[0];
				strMod.shift();
				if(!this.mod[mod])
				{
					this.mod[mod]=new TransMods[mod]();
				}
				this.mod[mod][fn](strMod);
			}
	}
	
	this.nCfg=function(cfg)
	{
		fnParam=[];
		for(c=0;c<cfg[0].length;c++)
		{
			for(b=0;b<4;b++)
			{
				if(cfg[b].length>c&&cfg[b][c]!=undefined)
				{
					fnParam[b]=cfg[b][c];
				}
			}

			this.cfg.push
			(
				new fnLin
				(
					(fnParam[1]-fnParam[0])/fnParam[2],
					0,
					fnParam[0]
				)
			)
			
			this.cfg[this.cfg.length-1].xmax=fnParam[2];
			this.cfg[this.cfg.length-1].fn=fnParam[3];
		}
	}
	
	this.fnVar=function(arr,clave)
	{
		if(this.niv==1)
		{
			if(arr[clave][0]==" ")
			{
				str=arr[clave].substr(1).split(" ");
				this.parStrMod(str,"anula");
			}
			else
			{
				str=arr[clave].split(" ");
				this.parStrMod(str,"activa");
			}
		}
	}
	
	this.fnArr=function(arr,clave)
	{
		if(this.niv==1)
		{
			cfg=[arr[clave]];
			this.consultaMod("detona",cfg[0]);
			
			for(j=0;j<cfg.length;j++)
			{
				this.nCfg(cfg[j]);
			}
			
			this.consultaMod("postConf",this.cfg);
		}
	}
}
Trans.prototype=new rec(0,"Array");