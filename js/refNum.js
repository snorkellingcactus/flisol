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