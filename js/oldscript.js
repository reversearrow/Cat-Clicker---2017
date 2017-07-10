var data = {
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

//Create an array of List of cats

var createList = function(obj) {
  catList = []
  for (i=0;i<obj.cats.length;i++){
    catList.push(obj.cats[i].name)
  }
  return catList
}

var displayCatList = function(catlist) {
  catListElement = document.getElementById("cat-list")
  ul = document.createElement("ul")
  ul.className = "list-unstyled"
  for(i=0;i<catlist.length;i++) {
    li = document.createElement("li")
    li.className = "text-center"
    li.innerText = catlist[i]
    li.id = catlist[i]
    li.addEventListener("click", (function(li) {
      return function() {
          catName(li.id)
      }
    })(li))
    ul.append(li)
  }
  catListElement.append(ul)
}

var initImages = function(catList) {
  initCats = []
  for(i=0;i<catList.length;i++){
    catList[i] = new Image(data["cats"][i].name,data["cats"][i].img)
    initCats.push(catList[i])
  }
  return initCats
}

var displayCat = function(catobject) {
  catobject.addHeader()
  catobject.addImage()
  catobject.addFooter()
}

var Image = function(name,img) {
    this.name = name
    this.imgloc = img
    this.clicks = 0
    this.element = document.getElementById("header")
    this.p = document.createElement("p")
    this.p.id = this.name
    this.p.innerText = this.clicks
}

Image.prototype.addHeader = function() {
    this.h1 = document.createElement("h1")
    this.h1.innerText = this.name
    this.element.append(this.h1)
}

Image.prototype.addImage = function(){
  this.img = document.createElement("img")
  this.img.src = this.imgloc
  this.img.id = this.name
  console.log(this.h1)
  clicks = parseInt(this.p.innerText)
  p = this.p
  this.img.addEventListener('click', (function(clicks,p) {
        return function() {
            clicks = clicks + 1;
            p.innerText = clicks
        };
  })(clicks,p))
  this.element.append(this.img)
}

Image.prototype.addFooter = function() {
  this.element.append(this.p)
}


var addClicks = function(num) {
    num += 1
    return num;
}

//console.log((data["cats"].length))
//console.log(data["cats"][0])

catList = createList(data)
displayCatList(catList)

allCats = initImages(catList)


var catName = function(cat){
  for(i=0;i<allCats.length;i++){
    if(allCats[i].name == cat){
        index = allCats.indexOf(allCats[i]);
        displayCat(allCats[i])
        allCats.splice(index,1)
    }
  }
}
