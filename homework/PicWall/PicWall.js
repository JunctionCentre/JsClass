window.onload = function() {
    var width = 800;
    var list = document.getElementById("list");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var num = list.children.length;
    var container = document.getElementById("container");
    var dots = document.getElementsByTagName("span");
    var timer = null;
    var index = 0;

    function showDot(){
        for(var i = 0; i < num; i++){
            dots[i].className = "";
        }
        dots[index].className = "on";
    }
    function animate(dire) {
        var left = list.style.left ? parseInt(list.style.left) : 0;
        var newLeft = left - dire * width;
        list.style.left = newLeft + "px";
        if (newLeft <= -num * width) {
            list.style.left = "0px";
        }
        if (newLeft > 0) {
            list.style.left = -(num - 1) * width + "px";
        }
        index = index + dire;
        if (index >= num){
            index = index - num;
        }
        if (index < 0){
            index = index + num;
        }
        showDot();

    }
    prev.onclick = function() {
      animate(-1);
    };
    next.onclick = function() {
      animate(1);
    };

    function autoPlay () {
        timer = setInterval(function () {
            animate(1);
        },2500);
    }
    autoPlay();
    container.onmouseenter = function () {
        clearInterval(timer);
    }
    container.onmouseleave = function () {
        autoPlay();    
    }

    for (var k = 0; k < num; k++){
        (function(k){
            dots[k].onclick = function () {
                index = k;
                list.style.left = -index * width + "px";               
                showDot();
            }
        })(k);            
    }


};