var model = {
  //Data for the cats
  init: function(){
    if(!localStorage.data){
      localStorage.data = JSON.stringify({})
    }
  },
  add: function(obj){
    data = JSON.parse(localStorage.data);
    key = obj.id
    if(!data[key]){
      data[obj.id] = obj;
      localStorage.data = JSON.stringify(data)
    }
  },
  addClicks: function(catid){
    data = JSON.parse(localStorage.data)
    data[catid].clicks += 1
    localStorage.data = JSON.stringify(data)
  },
  updateName: function(catid,newName){
      data = JSON.parse(localStorage.data)
      data[catid].name = newName
      localStorage.data = JSON.stringify(data)
  },
  updateClicks: function(catid,newClickCounts){
    data = JSON.parse(localStorage.data);
    data[catid].clicks = newClickCounts;
    localStorage.data = JSON.stringify(data)
  },
  getAllCats: function(){
    return JSON.parse(localStorage.data)
  }
};


var octopus = {
  currentRender: null,
  nameChange: false,
  //adminButtonDisplayed: false,
  addNewCat: function(catID,catName,picLoc,clicks){
      model.add({
          id: catID,
          name: catName,
          loc: picLoc,
          clicks: clicks
      });
      view.list.render()
  },
  updateClick: function(catName){
      model.addClicks(catName)
      octopus.getSelectedCat(catName)
  },
  allCatsKeys: function(){
      allKeys = Object.keys(model.getAllCats());
      return allKeys;
  },
  allCatNames: function(){
      names = []
      allCats = octopus.allCats();
      allKeys = octopus.allCatsKeys();
      for(i=0;i<allKeys.length;i++){
        names.push(allCats[allKeys[i]].name)
      }
      return names
  },
  allCats: function(){
    return model.getAllCats()
  },
  getSelectedCat: function(id){
    view.admin.init()
    cat = octopus.allCats()[id]
    //console.log(cat)
    octopus.currentRender = cat
    view.list.render()
    view.cat.render()
  },
  updateValues: function(id,newName,newClickCounts){
    if(newName.length>0 && newName.length<32){
      model.updateName(id,newName);
      octopus.getSelectedCat(id);
    }
    if(typeof parseInt(newClickCounts) == "number"){
      model.updateClicks(id,parseInt(newClickCounts))
      octopus.getSelectedCat(id);
    }else if(typeof parseInt(newClickCounts) != "number") {
      model.updateClicks(id,0);
      octopus.getSelectedCat(id);
    }
    octopus.getSelectedCat(id)
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
          allCatsKeys = octopus.allCatsKeys()
          allCats = octopus.allCats()
          if(octopus.nameChange){
            id = octopus.currentRender["id"];
            li = document.getElementById(id);
            li.innerText = octopus.currentRender.name
          }
          ul = document.getElementById("cat-list")
          for(i=0;i<allCatsKeys.length;i++) {
              idExists = document.getElementById(allCatsKeys[i])
              if(!idExists){
                li = document.createElement("li")
                li.innerText = allCats[allCatsKeys[i]].name
                li.id = allCatsKeys[i]
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
      img.addEventListener('click', (function() {
            return function() {
                  octopus.updateClick(octopus.currentRender.id)
            };
      })(img))
      clicks= document.createElement("p")
      clicks.id = "clicks"
      displayArea.append(imgHeader)
      displayArea.append(img)
      displayArea.append(clicks)
    },
    render: function(){
        obj = octopus.currentRender
        if(obj){
          header = document.getElementById("cat-header");
          header.innerText = obj.name;
          img = document.getElementById("img");
          img.src = obj.loc;
          clicks = document.getElementById("clicks");
          clicks.innerText = obj.clicks;
        }
    }
  },
  admin: {
    init: function(){
      adminButton = document.getElementById("admin")
      adminButton.style = "display:block"
      adminButton.addEventListener("click",function(){
          view.admin.render()
      })
      newName = document.getElementById("newname");
      newClicks = document.getElementById("newClickCounts");
      saveButton = document.getElementById("save");
      saveButton.addEventListener("click",(function(newName,newClicks){
          return function(){
            octopus.nameChange = true;
            octopus.updateValues(octopus.currentRender["id"],newName.value,
            newClickCounts.value);
          };
        })(newName,newClicks));
      cancelButton = document.getElementById("cancel");
      cancelButton.addEventListener("click",function(){
          view.admin.cancel()
      })
  },
  render: function(){
    adminConsole = document.getElementById("admin-console");
    adminConsole.style = "display:block"
  },
  cancel: function(){
    adminConsole = document.getElementById("admin-console");
    adminConsole.style = "display:none"
  }
}
};

localStorage.clear()
octopus.init()
octopus.addNewCat("cat1","kitkat1","img/img1.jpg",0)
octopus.addNewCat("cat2","kitkat2","img/img2.jpg",0)
