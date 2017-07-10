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
  addNewCat: function(catName,picLoc,clicks){
      model.add({
          name: catName,
          loc: picLoc,
          clicks: clicks
      });
  },
  updateClick: function(){
      console.log("empty")
  },
  allCats: function(){
    return model.getAllCats()
  },
  init: function() {
    model.init()
    view.list.init(octopus.allCats())
    view.cat.init()
  }
};

var view = {
  list: {
      init: function(catArr){
        if(catArr.length > 0){
          el = document.createElement("list")
          ul = document.createElement("ul")
          for(i=0;i<catArr.length;i++) {
            li = document.createElement("li")
            li.innerText = catArr[i].name
            li.id = catArr[i].name
            li.addEventListener("click", (function(li) {
              return function() {
                  //catName(li.id)
                  console.log("Hello")
                }
            })(li))}
          ul.append(li)
          el.append(ul)
          view.list.render(el)}
      },
      render: function(list){
        el_top = document.getElementById("top")
        el_top.append(list)
      }
  },
  cat: {
    init: function(){

    },
    render: function(){
    }
  }
};

octopus.init()
octopus.addNewCat("cat1","img/img1.jpg",0)
octopus.addNewCat("cat2","img/img2.jpg",0)
console.log(octopus.allCats())
