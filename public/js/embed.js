function showClock(obj){

//Aded by Takeshi Sugimoto on 2008/05/01 for SSL
var str = '';

if(obj.ssl == '1'){
    str = '<embed src="https://secure.clocklink.com/clocks/';
}
else{
    str = '<embed src="http://www.clocklink.com/clocks/';
}
//--

    str += obj.clockfile;
    str += "?";
        
    for( prop in obj ) {
        if( 'clockfile' == prop 
            || 'width' == prop
            || 'height' == prop
            || 'wmode' == prop
            || 'type' == prop
        ) continue;
    
        //Added by takeshi on 2007/01/29 (to display mutibyte chars by using URL encoding)
        if(prop == "Title" || prop == "Message"){
            str += ( prop + "=" + obj[prop] + "&" );
        }
        else{
            str += ( prop + "=" + _escape(obj[prop]) + "&" );
        }
        //--
    }
    str += '" ';
    str += ' width="' + obj.width + '"';
    str += ' height="' + obj.height + '"';
    str += ' wmode="' + obj.wmode + '"';
    str += ' type="application/x-shockwave-flash">';
    
    document.write( str );
}

function showClockHtml5(obj){
    // start iframe embed for html5 clock
    var str = '<iframe scrolling="no" frameborder="0" ';
    
    // add default style
    str += 'style="overflow:hidden;border:0;margin:0;padding:0;';

    // add width and heigh parameters
    str += 'width:' + obj.width + 'px;height:' + obj.height + 'px;"';

    // check for ssl
    if(obj.ssl == '1'){
        str += 'src="https://www.clocklink.com/html5embed.php?';
    } else {
        str += 'src="http://www.clocklink.com/html5embed.php?';
    }
    
    // add clock name, time zone, color, size
    str += 'clock=' + obj.clockfile;
    str += '&timezone=' + obj.timezone;
    str += '&color=' + obj.color;
    str += '&size=' + obj.size;

    // add closing tag
    str += '" /></iframe>';

    document.write( str );
}

function _escape(str){
    str = str.replace(/ /g, '+');
    str = str.replace(/%/g, '%25');
    str = str.replace(/\?/, '%3F');
    str = str.replace(/&/, '%26');
    return str;
}

function showBanner(BannerLink){
    document.write(BannerLink);
}

function isCanvasSupported(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}


// Homepage Clock Embed
function homeEmbed(timezone){
	var date = new Date();
	var obj = new Object;

	// SHOW HTML5 CLOCK IF CANVAS AVAILABLE (js/embed.js)
	if (isCanvasSupported()) {

		obj.clockfile="005";
		obj.width=150;
		obj.height=150;
		obj.color="gray";
		obj.size=150;


		obj.timezone=timezone;

		// render the html5 clock
		showClockHtml5(obj);

	// SHOW FLASH CLOCK IF CANVAS NOT AVAILABLE
	} else {

		obj.clockfile="0001-gray.swf";

		obj.width=150;
		obj.height=150;
		obj.TimeZone=timezone;
		obj.wmode="transparent";

		// render the flash clock
		showClock(obj);
	}
}