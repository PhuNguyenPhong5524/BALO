
var slider = document.querySelector(".imgslider");
var arr = [
"./img/slide_1_img.webp"

];

var idx = 0;
function next(){
    idx++;
    if(idx >= arr.length)
    idx=0;
    slider.src = arr[idx];
}
function prev(){
    idx--;
    if(idx < 0)
    idx=arr.length-1;
    slider.src = arr[idx];
}
setInterval('next()',2500);