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
Uso:
	slide=new Desp();
	slide.imgSrcs=["http://imagen0","http://imagen1","http://imagen2"];
	slide.imgAlts=["AltImagen0","AltImagen1","AltImagen2"];
	slide.tits=["TituloImagen0","TituloImagen1","TituloImagen2"];
	slide.descs=["DescImagen0","DescImagen1","DescImagen2"];
	slide.clk=new TranClk;
	
	slide.crea();
	
	Opcional:
	slide.ret=1000;
	
	Ninguna de estas propiedades debe faltar. Los arrays deben contener TODOS elementos del tiopo string y la misma catidad de elementos.
*/

Desp=function(imgSrcs,urls,tits,descs,alts,FX)
{
	//Propiedades.
	this.imgSrcs=imgSrcs;	//Las url hacia las imágenes.
	this.urls=urls;			//La url a donde se dirige cuando se hace click en la imagen.
	this.tits=tits;			//Títulos de cada contenido.
	this.descs=descs;			//Descripcione.
	this.alts=alts;			//Alt de las imágenes.
	this.FX=FX;					//Efecto generado con Trans realizado al desplazar cada imagen.
	this.clk=[];				//Relojes para los efectos.
	this.circ=[];				//Círculos clickeables.
	this.desc=[];
	this.img=[];				//Imágenes
	this.ret=3000;				//Retardo entre desplazamientos.
	this.detRet=3000			//Retardo antes de cada detonación.
	this.FXRet=20;				//Retardo del TranClk para cada efecto.
	
	//Elementos HTML.
	this.cont=document.createElement("div");
	this.contDer=document.createElement("ul");
	this.contIzq=document.createElement("div");
	this.tit=document.createElement("p");
	this.subCont=document.createElement("div");
	this.cirCont=document.createElement("ul");
	
	//Atributos.
	this.cont.setAttribute("class","desp");
	this.contDer.setAttribute("class","despDer");
	this.contIzq.setAttribute("class","despIzq");
	this.cirCont.setAttribute("class","despCirc");
	this.tit.setAttribute("class","titulo");
	
	//Ensamble.
	this.contIzq.appendChild(this.tit);
	this.contIzq.appendChild(this.subCont);
	this.contIzq.appendChild(this.cirCont);
	this.cont.appendChild(this.contIzq);
	this.cont.appendChild(this.contDer);
	
	//Contadores.
	this.imgAct=0;
	
	this.clkFin=function()
	{
		this.inc*=-1;
	};
	
	this.imgClick=function()
	{
		window.location=this.url;
	};
	
	this.desp2=function(Num)
	{
			 Ant=this.imgAct;
			this.imgAct=Num;
			
			this.tit.innerHTML=this.tits[Num];
			this.circ[Ant].removeAttribute("class");
			this.circ[Num].setAttribute("class","despCircAct");
			this.circ[Ant].innerHTML="<p>○</p>";
			this.circ[Num].innerHTML="<p>◉</p>";
			this.desc[Ant].removeAttribute("class");
			this.desc[Ant].setAttribute("class","despOpc");
			this.desc[Num].removeAttribute("class");
			this.desc[Num].setAttribute("class","despOpcAct");
	};
	this.desp=function(Num)
	{
		if(this.imgAct!=Num)
		{
			
			if(this.clk[Num].enCurso)
			{
				this.clk[Num].fnFin();
			}
			else
			{
				this.clk[Num].detona();
			};
			
			this.desp2(Num);
			if(this.clk[Ant].enCurso)
			{
				this.clk[Ant].fnFin();
			}
			else
			{
				this.clk[Ant].detona();
			};
		}
	}.bind(this);
	
	
	this.autoDesp=function()
	{
		if(this.imgAct==this.imgSrcs.length-1)
		{
			this.desp(0);
		}
		else
		{
			this.desp(this.imgAct+1);
		}
		this.tFuera=setTimeout(this.autoDesp,this.ret);
	}.bind(this);
	
	this.detona=function()
	{
		if(this.tFuera)
		{
			clearTimeout(this.tFuera);
		};
		if(this.tDetFuera)
		{
			clearTimeout(this.tDetFuera);
		};
		this.tDetFuera=setTimeout(this.autoDesp,this.detRet);
	}.bind(this);
	
	this.anula=function()
	{
		clearTimeout(this.tFuera);
		clearTimeout(this.tDetFuera);
	}.bind(this);
	
	this.inicializa=function()
	{
		for(var c=0;c<imgSrcs.length;c++)
		{
			this.circ[c]=document.createElement("li");
			this.img[c]=document.createElement("img");
			this.desc[c]=document.createElement("li");
			
			this.img[c].setAttribute("src",this.imgSrcs[c]);
			this.img[c].setAttribute("title",this.alts[c]);
			
			this.img[c].style.zIndex="1";
			
			this.circ[c].innerHTML="<p>○</p>";
			this.desc[c].innerHTML=this.descs[c];
			this.desc[c].setAttribute("class","despOpc");
			this.cirCont.appendChild(this.circ[c]);
			this.subCont.appendChild(this.img[c]);
			this.contDer.appendChild(this.desc[c]);
			
			this.circ[c].Num=this.desc[c].Num=c;
			this.circ[c].Desp=this.desc[c].Desp=this;
			
			this.img[c].url=this.urls[c];
			
			
			this.desc[c].addEventListener
			(
				"mouseover",
				function()
				{
					this.Desp.desp(this.Num);
					clearTimeout(this.Desp.tFuera);
					clearTimeout(this.Desp.tDetFuera);
				}
			);
			this.desc[c].addEventListener
			(
				"mouseout",
				function()
				{
					this.Desp.detona();
				}
			);
			this.circ[c].addEventListener
			(
				"click",
				function()
				{
					this.Desp.desp(this.Num);
				}
			);
			
			this.img[c].addEventListener
			(
				"mouseover",
				this.anula
			);
			this.img[c].addEventListener
			(
				"mouseout",
				this.detona
			);
			this.img[c].addEventListener
			(
				"click",
				this.imgClick
			);

			this.clk[c]=new TranClk(this.FX[c],this.FXRet);
			this.clk[c].fnFin=this.clkFin;
		
			for(var i=0;i<this.clk[c].cfg.length;i++)
			{
				if(!c)
				{
					this.clk[c].cfg[i].x=this.clk[c].cfg[i].xmax;
					this.clk[c].cfg[i].obj.style[this.clk[c].cfg[i].prop]=this.clk[c].cfg[i].calc()[1];
					this.clk[c].cfg[i].x=0;
					this.desp2(this.imgAct);
				}
				this.clk[c].cfg[i].obj=this.img[c];
			};
		};
	}
}