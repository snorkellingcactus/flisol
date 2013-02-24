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