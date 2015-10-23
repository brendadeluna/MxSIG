var eventoResultados = function(e){
        if(e.response.success){
	    var d = e.data.value;
	    $('.d_ext').html(d.numeroExterior);
	    $('.d_int').html(d.numeroExteriorAlf);
	    $('.d_cer').html(d.numeroAnterior);
	    $('.d_ase').html(d.asentamiento);
	    $('.d_cp').html(d.codigoPostal);
	    $('.d_cve_loc').html(d.cveloc);
	    $('.d_cve_mun').html(d.cvemun);
	    $('.d_no_ent').html(d.ent);
	    $('.d_ent').html(d.entidad);
	    $('.d_ev1').html(d.entrevialidad1);
	    $('.d_ev2').html(d.entrevialidad2);
	    $('.d_loc').html(d.localidad);
	    $('.d_mun').html(d.municipio);
	    $('.d_pun').html(d.punto);
	    $('.d_tev1').html(d.tipoEntrevialidad1);
	    $('.d_tev2').html(d.tipoEntrevialidad2);
	    $('.d_tv').html(d.tipoVialidad);
	    $('.d_via').html(d.vialidad);
	    $('.d_cve_ent').html(d.cveent);
	    
	}else{
	    alert('No existe informaci&oacute;n asociada a esa ubicaci&oacute;n');
	}
    }
    var eventoIdentifica = function(coords){
	MDM6('hideMarkers','identify');
	MDM6('hideMarkers','georeferenceAddress');
	MDM6('addMarker',{lon:coords.lon,lat:coords.lat,type:'georeferenceAddress',params:{nom:'Domicilio',desc:''}});
        MDM6('reverseGeocoding',coords,eventoResultados);
    }

var projectParams = {
        'onIdentify':eventoIdentifica
};

function eventSearch(e){
    var data = e.list;
    $("#app_data").html('');
    for(x in data){
	var i = data[x];
	var id = i.id;
	var label = i.label;
	var coords = i.position.merc;
	var type = (i.type=='domicilio')?true:false;
	$("#app_data").append('<div class="itemSearch" coords="'+coords+'" address="'+type+'" label="'+label+'">'+
			      '<div class="label">'+label+'</div><div class="'+((type)?'iconAddress':'icon')+'"></div></div>');
	
    }
    $(".itemSearch").each(function(){
	$(this).click(function(){
	    var coords = $(this).attr('coords');
	    var address = $(this).attr('address');
	    coords = coords.split(',');
	    var lon =parseFloat(coords[1]);
	    var lat = parseFloat(coords[0]);
	    MDM6('goCoords',lon,lat);
	    MDM6('hideMarkers','identify');//remove all marks
	    MDM6('addMarker',{lon:lon,lat:lat,type:'identify',params:{nom:$(this).attr('label'),desc:''}});
	    if(address == "true"){
		eventoIdentifica({lon:lon,lat:lat});
	    }
	    
	});
    });
}
function busca(){
     var texto = $('#valueSearch').val();
    MDM6('privateSearch',texto,eventSearch)
}