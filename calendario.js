/*
@source https://github.com/snorkellingcactus/flisol

@licstart
	Copyright (C) 2013 Nadal Gonzalo García Zavala

	This file is part of flisollaplata.org.ar.

	flisollaplata.org.ar is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	flisollaplata.org.ar is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with flisollaplata.org.ar.  If not, see <http://www.gnu.org/licenses/>.
@licend
*/
CalFlisol=function()
{
	this.tiempo=new Date();
	
	this.vista="mes";
	this.meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	this.dias=["Do","Lu","Ma","Mi","Ju","Vi","Sá"];
	
	this.caja=document.createElement("div");
	
	this.caja.setAttribute("class","CalFlisol");
};

CalFlisol.prototype.limpia=function()
{
	if(this.tabla)
	{
		this.tabla.parentNode.removeChild(this.tabla);
		this.tabla=null;
		delete this.tabla;
	}
}

CalFlisol.prototype.vistas={};
CalFlisol.prototype.vistas.mes=function(objDate)
{	
	var diasMesAnt=new Date(objDate.getFullYear(),objDate.getMonth(),0).getDate();
	var diasMes=new Date(objDate.getFullYear(),objDate.getMonth()+1,0).getDate();
	var nInhabil=Math.ceil((42-diasMes)/2);

	var tabla=document.createElement("table");
	var thead=document.createElement("thead");
	var tbody=document.createElement("tbody");
	var theadTr=document.createElement("tr");
	var theadTr2=document.createElement("tr");
	var theadTh2=document.createElement("th");
	var theadMes=document.createElement("p");

	tabla.appendChild(thead);
	tabla.appendChild(tbody);
	theadTh2.appendChild(theadMes);
	theadTr2.appendChild(theadTh2);
	thead.appendChild(theadTr2);
	thead.appendChild(theadTr);
	
	theadMes.innerHTML=this.meses[objDate.getMonth()];
	theadTh2.setAttribute("colspan","7");
	
	tabla.setAttribute("class","mes");
	
	for(var r=0;r<6;r++)
	{
		var tr=document.createElement("tr");
		
		for(var d=0;d<7;d++)
		{
			var td=document.createElement("td");
			var cajaTd=document.createElement("div");
			var cajaTxt=document.createElement("p");
			
			var nCelda=d+1+r*7;
			var tdTxt=nCelda-nInhabil+1;
		
			cajaTd.setAttribute("class","dia");
			
			if(nCelda<nInhabil)
			{
				tdTxt=diasMesAnt-nInhabil+nCelda+1;
				cajaTd.setAttribute("class","inhabil");
			};
			if(nCelda>=diasMes+nInhabil)
			{
				tdTxt=nCelda-diasMes-nInhabil+1;
				cajaTd.setAttribute("class","inhabil");
			};
		
			cajaTxt.innerHTML=tdTxt;
			cajaTd.appendChild(cajaTxt)
			tr.appendChild(td);;
			td.appendChild(cajaTd);
		}
		tbody.appendChild(tr);
	};
	for(var h=0;h<7;h++)
	{
		var th=document.createElement("th");
		var thTxt=document.createElement("p");
		
		thTxt.innerHTML=this.dias[h];
		
		th.appendChild(thTxt);
		theadTr.appendChild(th);
	}
	return tabla;
};
CalFlisol.prototype.vistas.ano=function(objDate)
{
	var tabla=document.createElement("table");
	var tbody=document.createElement("tbody");
	
	tabla.appendChild(tbody);
	
	
	for(var r=0;r<2;r++)
	{
		var tr=document.createElement("tr");
		for(var d=0;d<6;d++)
		{
			var nCelda=d+r*6;
			var td=document.createElement("td");
			var tablaMes=this.vistas.mes.bind(this)
			(
				new Date
				(
					objDate.getFullYear(),
					nCelda,
					1
				)
			);
			
			td.appendChild(tablaMes);
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	};

	tabla.setAttribute("class","ano");
	tabla.appendChild(tbody);
	
	return tabla;
};
CalFlisol.prototype.actualiza=function()
{
	this.limpia();
	this.tabla=this.vistas[this.vista].bind(this)(this.tiempo);
	
	this.caja.appendChild(this.tabla);
};