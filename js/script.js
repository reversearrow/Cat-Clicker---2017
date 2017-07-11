var model = {
  //Data for the cats
  init: function(){
    if(!localStorage.data){
      localStorage.data = JSON.stringify([])
    }
  },
  add: function(obj){
    data = JSON.parse(localStorage.data)
    if(!model.checkDuplicates(data,obj)){
      data.push(obj)
    }
    localStorage.data = JSON.stringify(data)
  },
  addClicks: function(obj){
    data = JSON.parse(localStorage.data)
    for(i=0;i<data.length;i++){
      if (data[i].name == obj.name) {
        data[i].clicks = data[i].clicks + 1;
      }
    }
  },
  getAllCats: function(){
    return JSON.parse(localStorage.data)
  },
  checkDuplicates: function(arr,obj){
    for(i=0;i<arr.length;i++){
      if(arr[i].name==obj.name){
        return true
      };
    }return false
  }
};

//Testing the Code Functionality

var octopus = {
  currentRender: null,
  addNewCat: function(catName,picLoc,clicks){
      model.add({
          name: catName,
          loc: picLoc,
          clicks: clicks
      });
      view.list.render()
  },
  updateClick: function(obj){
      model.addClicks(obj)
  },
  allCats: function(){
    return model.getAllCats()
  },
  getSelectedCat: function(catid){
    allCats = octopus.allCats()
    for(i=0;i<allCats.length;i++){
      if(allCats[i].name == catid){
        if (!octopus.currentRender){
          octopus.currentRender = allCats[i]
          view.cat.render(octopus.currentRender)
        }else if(octopus.currentRender.name != catid){
          octopus.currentRender = allCats[i]
          view.cat.render(octopus.currentRender)
        }
      }
    }
  },
  init: function() {
    model.init()
    view.list.init()
    view.cat.init()
  }
};

var view = {
  list: {
      init: function(){
          list = document.getElementById("list");
          ul = document.createElement("ul");
          ul.id = "cat-list";
          list.append(ul);
      },
      render: function(){
          allCats = octopus.allCats()
          ul = document.getElementById("cat-list")
          for(i=0;i<allCats.length;i++) {
              idExists = document.getElementById(allCats[i].name)
              if(!idExists){
                li = document.createElement("li")
                li.innerText = allCats[i].name
                li.id = allCats[i].name
                li.addEventListener("click", (function(li) {
                  return function() {
                      octopus.getSelectedCat(li.id)
                    }
                  })(li))
                  ul.append(li);
              }
          };
      }
  },
  cat: {
    init: function(){
      displayArea = document.getElementById("display");
      imgHeader = document.createElement("h3");
      imgHeader.id = "cat-header"
      img = document.createElement("img");
      img.id = "img"
      clicks= document.createElement("p")
      clicks.id = "clicks"
      displayArea.append(imgHeader)
      displayArea.append(img)
      displayArea.append(clicks)
    },
    render: function(obj){
        console.log(obj)
        if(obj){
          header = document.getElementById("cat-header");
          header.innerText = obj.name;
          img = document.getElementById("img");
          img.addEventListener('click', (function() {
                return function() {
                      octopus.updateClick(obj)
                };
          })(obj))
          img.src = obj.loc;
          clicks = document.getElementById("clicks");
          clicks.innerText = obj.clicks;
          //$("#cat-header").text(obj.name);
          //$("#img").attr("src",obj.loc);
          //$("#clicks").innerText = obj.clicks;
        }
    }
  }
};

octopus.init()
octopus.addNewCat("cat1","img/img1.jpg",0)
octopus.addNewCat("cat2","img/img2.jpg",0)
octopus.addNewCat("cat2","img/img2.jpg",0)




//Check if the selected Cat is already Rendered
//If it is not rendered --> Render the cat
