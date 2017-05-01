elem = document.getElementById("cat")
//console.log(elem);

var catClicks = function (){
  this.currentClicks= 1
};

catClicks.prototype.addClick = function() {
  this.currentClicks++;
};

countClicks = new catClicks()

elem.addEventListener('click', function() {
  clicks = document.getElementById("clicks")
  var innerText = "number of clicks: " + countClicks.currentClicks
  clicks.innerHTML = innerText;
  countClicks.addClick();
});

var cats = {
  name: "Cat1",
  pic: ""
}
