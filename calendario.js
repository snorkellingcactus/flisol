CalFlisol=function()
{
	this.tiempo=new Date();
	
	this.vista="mes";
	this.meses=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
	this.dias=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
	
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

	tabla.appendChild(thead);
	tabla.appendChild(tbody);
	thead.appendChild(theadTr);
	
	tabla.setAttribute("class","mes");
	
	for(var r=0;r<6;r++)
	{
		var tr=document.createElement("tr");
		
		for(var d=0;d<7;d++)
		{
			var td=document.createElement("td");
			var cajaTd=document.createElement("div");
			var cajaTxt=document.createElement("h3");
			
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
		var thTxt=document.createElement("h3");
		
		thTxt.innerHTML=this.dias[h];
		
		th.appendChild(thTxt);
		theadTr.appendChild(th);
	}
	return tabla;
};
CalFlisol.prototype.vistas.ano=function(objDate)
{
	var tabla=document.createElement("table");
	var thead=document.createElement("thead");
	var tbody=document.createElement("tbody");
	var theadTr=document.createElement("tr");
	var theadTh=document.createElement("th")
	var theadTxt=document.createElement("h3");
	
	tabla.appendChild(thead);
	tabla.appendChild(tbody);
	thead.appendChild(theadTr);
	
	
	for(var r=0;r<4;r++)
	{
		var tr=document.createElement("tr");
		for(var d=0;d<3;d++)
		{
			var nCelda=d+r*3;
			window.console.log(nCelda);
			var td=document.createElement("td");
			var tfoot=document.createElement("tfoot");
			var tfootTr=document.createElement("tr");
			var tfootTd=document.createElement("td");
			var tfootTxt=document.createElement("h3");
			var tablaMes=this.vistas.mes.bind(this)
			(
				new Date
				(
					objDate.getFullYear(),
					nCelda,
					1
				)
			);
			tfootTd.setAttribute("colspan","7");
			
			tfootTxt.innerHTML=this.meses[nCelda];
			tfootTd.appendChild(tfootTxt);
			tfootTr.appendChild(tfootTd);
			tfoot.appendChild(tfootTr);
			tablaMes.appendChild(tfoot);
			td.appendChild(tablaMes);
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	};

	tabla.setAttribute("class","ano");
	theadTh.setAttribute("colspan","3");
	
	theadTxt.innerHTML=objDate.getFullYear();
	theadTh.appendChild(theadTxt);
	theadTr.appendChild(theadTh);
	thead.appendChild(theadTr);
	tabla.appendChild(thead);
	tabla.appendChild(tbody);
	
	return tabla;
};
CalFlisol.prototype.actualiza=function()
{
	this.limpia();
	this.tabla=this.vistas[this.vista].bind(this)(this.tiempo);
	
	this.caja.appendChild(this.tabla);
};