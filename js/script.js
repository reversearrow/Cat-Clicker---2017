
//console.log(elem);

//Creating an Object called cat

var cats = {
  cats: [
    {
      "name" : "cat1",
      "img": "img/img1.jpg"
    },
    {
      "name": "cat2",
      "img": "img/img2.jpg"
    }
  ]
}

var createElements = function() {
  var header = document.getElementById("header");
  for(i=0;i<cats.cats.length;i++) {
    var catHeader = document.createElement("h1")
    catHeader.id = "cat"
    catHeader.innerHTML = cats["cats"][i].name
    var image = document.createElement("img")
    image.src = cats["cats"][i].img
    var para = document.createElement("p")
    para.id = "clickcounts"
    header.appendChild(catHeader)
    header.appendChild(image)
    header.appendChild(para)
  }
}

createElements()

elem = document.getElementById("cat")

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
