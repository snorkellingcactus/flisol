<!--
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
-->

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="www.w3.org/1999/xhtml" xml:lang="es" lang="es-AR">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<title>Flisol La Plata - Inicio</title>
		<link rel="stylesheet" type="text/css" href="./reinicia.css" />
		<link rel="stylesheet" type="text/css" href="./header.css" />
		<link rel="stylesheet" type="text/css" href="./contenido.css" />
		<link rel="stylesheet" type="text/css" href="./inicio.css" />
		<link rel="stylesheet" type="text/css" href="./barra_inferior.css" />
		<script type="text/javascript" src="./js/rec.js"></script>
		<script type="text/javascript" src="./js/mat.js"></script>
		<script type="text/javascript" src="./js/Trans.js"></script>
		<script type="text/javascript" src="./js/TranClk.js"></script>
		<script type="text/javascript" src="./js/CSS.js"></script>
		<script type="text/javascript" src="./js/refNum.js"></script>
		<script type="text/javascript" src="./inicio.js"></script>
	</head>
	<body>
	
	<?php
		include_once("./header.html");	//Incluyo la barra superior en el documento.
	?>
	
	<div id="contenido">
	
	</div>
	
	<script type="text/javascript" >
		slideThis.detona();
		document.getElementById("contenido").appendChild(slideThis.cont);
	</script>
	<?php
		include_once("./barra_inferior.html");	//Incluyo la barra inferior en el documento.
	?>
	</body>
</html>