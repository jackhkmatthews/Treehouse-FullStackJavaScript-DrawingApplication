//PROBLEM: No user interaction causes any change to the application
//SOLUTION: User interaction causese appropriate change

//VARIABLES 
var $selectableColors = $(".controls");
var color = $(".selected").css("background-color");
var $revealColorSelect = $("#revealColorSelect");
var $colorSelect = $("#colorSelect");
var $sliders = $(".sliders");
var newColor;
var $addNewColor = $("#addNewColor");
var $colors = $(".controls ul");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//THE REST

//when clicking on control list items
$selectableColors.on("click", "li", function(){
  
  //deselect sibling element
  $(this).siblings().removeClass("selected");
  
  //select clicked element 
  $(this).addClass("selected")
  
  //set color to elements background color
  color = $(this).css("background-color");
})

//when new color is pressed
$revealColorSelect.click(function(){

  //show color select or hide color select
  $colorSelect.toggle();
  
})

//when color sliders change
$sliders.mousemove(function(){
  
  //update color
  var red = parseInt($("#red").val());
  var green = parseInt($("#green").val());
  var blue = parseInt($("#blue").val());
  newColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
  
  //update the new color span
  $("#newColor").css("background-color", newColor);
  
})

//when add color is pressed
$addNewColor.click(function(){

  //append the new color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", newColor);
  $colors.append($newColor);                 
  
  //deselect others and select the new color
  $newColor.click();

})


//on mouse events on the cavas
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  //draw lines
  if (mouseDown) {
    context.beginPath()
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;  
  }
  
}).mouseup(function(){
  mouseDown = false;
});