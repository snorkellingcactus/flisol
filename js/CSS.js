TransMods.CSS=function()
{
	this.cfg=[];
	this.insertar=[]
	
	this.activa=function(param)
	{
		if(param)
		{
			this.cfg.push(param);
			this.cfgPop=1;
		}
	}
	
	this.anula=function()
	{
		if(this.cfgPop)
		{
			this.cfg.pop();
			this.cfgPop=0;
		}
	}
	
	this.detona=function(cfg)
	{
		cont=0;
		
		for(s=0;s<cfg[0].length;s++)
		{
			if(typeof(cfg[0][s])=="string")
			{
				if(cfg[4].length>=cont&&!!cfg[4][cont])
				{
					obj=cfg[4][cont];
				}
				param=cfg[0][s].split(":");
				if(param.length>1)
				{
					prop=param[0];
					cfg0s=parseFloat(param[1]);
					uni=param[1].substr(cfg0s.toString().length);
				}
				else
				{
					prop=cfg[0][s];
					cfg0s=parseFloat(obj.style[cfg[0][s]]);
					uni=obj.style[cfg[0][s]].substr(cfg0s.toString().length);
				}
				this.insertar.push([cfg[0].length-s,obj,prop,uni]);
				cfg[0][s]=cfg0s;
				cont++;
			}
		}
	
		for(e=0;e<this.cfg.length;e++)
		{
			for(c=0;c<this.cfg[e].length;c++)
			{
				cfg[0].push(parseFloat(cfg[4][cont].style[this.cfg[e][c]]));
				cont++;
			}
		}
		delete cont;
		delete cfg[4];
	}
	this.postConf=function(cfg)
	{
		for(c=0;c<this.insertar.length;c++)
		{
			cfgN=cfg[cfg.length-this.insertar[c][0]];

			cfgN.obj=this.insertar[c][1];
			cfgN.prop=this.insertar[c][2];
			cfgN.uni=this.insertar[c][3];
		}
		this.insertar=[];
		delete cfgN;
	}
}