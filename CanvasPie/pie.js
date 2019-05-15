var data = [
    {title:"三星从者", value:0.40, color:"purple"},
    {title:"三星礼装", value:0.40, color:"cyan"},
    {title:"四星从者", value:0.03, color:"green"},
    {title:"四星礼装", value:0.12, color:"yellow"},
    {title:"五星从者", value:0.01, color:"orange"},
    {title:"五星礼装", value:0.04, color:"red"}
];
var w = 800;
var h = 600;
var cw = 0.5 * w;
var ch = 0.5 * h;
var r=200;
var cur =0 * Math.PI;
var fcur = cur;
var i = data.length;
var j = 0;

var canvas=document.getElementById("event");
    canvas.width = w;
    canvas.height = h;
    canvas.style.backgroundColor = "grey";
var ctx= canvas.getContext("2d");
    ctx.font="18px Micorsoft YaHei";


for(i=0;i<data.length;i++){
    //Draw
    ctx.fillStyle=data[i].color;
    ctx.beginPath();
    ctx.moveTo(cw,ch);
    ctx.arc(cw,ch,r,cur,cur+Math.PI*2*data[i].value);
    ctx.closePath();
    ctx.fill();
    cur = cur+Math.PI*2*data[i].value;
}

function dgr(x,y){
    // console.log(x+" "+y)
    if(x>0&&y>=0){
        return Math.atan(y/x);
    }
    if(x<0&&y>=0){
        return Math.atan(y/x)+Math.PI;
    }
    if(x<0&&y<=0){
        return Math.atan(y/x)+Math.PI;
    }
    if(x>0&&y<=0){
        return Math.atan(y/x)+Math.PI*2;
    } 
}
document.addEventListener('mousemove',function(e){
    canvas.width=canvas.width;canvas.height=canvas.height;
    cur =0 * Math.PI;
    if(Math.sqrt(Math.pow((e.clientX-cw),2)+Math.pow((e.clientY-ch),2))>r){
        for(i=0;i<data.length;i++){
            ctx.fillStyle=data[i].color;
            ctx.beginPath();
            ctx.moveTo(cw,ch);
            ctx.arc(cw,ch,r,cur,cur+Math.PI*2*data[i].value);
            ctx.closePath();
            ctx.fill();
            cur = cur+Math.PI*2*data[i].value;
        }
    }else{
        for(i=0;i<data.length;i++){
            ctx.fillStyle=data[i].color;
            ctx.beginPath();
            ctx.moveTo(cw,ch);
            // if((e.clientY-ch)/(e.clientX-cw)<Math.tan(cur+Math.PI*2*data[i].value) && (e.clientY-ch)/(e.clientX-cw)>Math.tan(cur))
            // if( Math.atan((e.clientY-ch)/(e.clientX-cw))< cur+Math.PI*2*data[i].value && Math.atan((e.clientY-ch)/(e.clientX-cw))> cur)
            var d = dgr(e.clientX-cw,e.clientY-ch);
            // console.log(d);
            if (d <= cur+Math.PI*2*data[i].value && d > cur)
            {
                ctx.arc(cw,ch,r+30,cur,cur+Math.PI*2*data[i].value);
                ctx.font="18px Micorsoft YaHei";
                fcur=(cur + cur+Math.PI*2*data[i].value)*0.5;
                if(Math.cos(fcur)<0){
                    ctx.textAlign="end";
                }else{
                    ctx.textAlign="start";
                }
                ctx.fillText(data[i].title+" "+data[i].value*100+"%",(cw+(r+50)*Math.cos(fcur)),(ch+(r+50)*Math.sin(fcur)));
            }else{
                ctx.arc(cw,ch,r,cur,cur+Math.PI*2*data[i].value);
            }
            ctx.closePath();            
            ctx.fill();
            cur = cur+Math.PI*2*data[i].value;
        }
    }
    // console.log(Math.atan((e.clientY-ch)/(e.clientX-cw)));
});