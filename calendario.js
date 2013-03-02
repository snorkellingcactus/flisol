CalFlisol=function()
{
	this.vista="mes";
	
	this.dias=["Dom","Lun,","Mar","Mié","Jue","Vie","Sáb"];
	this.meses=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
	
	this.caja=document.createElement("div");
	this.tabla=document.createElement("table");
	this.diasth=document.createElement("thead");
	this.diastb=document.createElement("tbody");
	
	this.caja.setAttribute("class","CalFlisol");
	
	this.caja.appendChild(this.tabla);
	this.tabla.appendChild(this.diasth);
	this.tabla.appendChild(this.diastb);
	
	for(var r=0;r<6;r++)
	{
		var tr=document.createElement("tr");
		
		for(var d=0;d<7;d++)
		{
			tr.appendChild(document.createElement("td"));
		}
		this.diastb.appendChild(tr);
	}
	for(var h=0;h<7;h++)
	{
		var th=document.createElement("th");
		this.diasth.appendChild(th);
	}
	
	/*
	this.nDia=
	{
		ano:function(ano,mes,dia,td)
		{
			this.caja=document.createElement("div");
			
			var str=ano+""+dia+""+mes;
			
			if(td.getAttribute("class"))
			{
				td.removeAttribute("class");
			};
			
			if(this.eventos&&this.eventos[str])
			{
				var evt=this.eventos[str];
				
				td.setAttribute("class","evento");
			}
			else
			{
				td.setAttribute("class","dia");
			}
		},
	}
	*/
	
};

CalFlisol.prototype.selTiempo=function(objDate)
{
	var diasMesAnt=new Date(objDate.getFullYear(),objDate.getMonth(),0).getDate();
	var diasMes=new Date(objDate.getFullYear(),objDate.getMonth()+1,0).getDate();
	
	var nInhabil=Math.ceil((42-diasMes)/2);
	
	for(var r=0;r<6;r++)
	{
		
		for(var d=0;d<7;d++)
		{
			var nCelda=d+1+r*7;
			var tr=this.diastb.rows[r];
			var td=tr.childNodes[d];
			
			var cajaTd=document.createElement("div");
			var cajaTxt=document.createElement("h3");
			
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
			cajaTd.appendChild(cajaTxt);
			td.appendChild(cajaTd);
		}
	}
}