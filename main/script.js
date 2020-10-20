// dropdown menu
let div = document.getElementsByClassName("dropdown-content");

  for(let  i =0;i<div.length;i++){

  for(let  j =0;j<div[i].children.length;j++){

   div[i].children[j].addEventListener("click",function(){

     this.parentNode.previousElementSibling.innerHTML = this.innerHTML;
   })
  }
}

document.getElementById("reset").addEventListener("click",function(){ 
  document.getElementById("dropbtn").innerText = "All Years";
})

// d3 stuff

let w = 1200;
let h = 2350;

// make svg
let viz = d3.select("#viz-container")
        .append("svg")
            .attr("id","viz")
            .attr("width", w)
            .attr("height", h)
;

// get text color
function getColor(d,i){
    if (d.eth == "wm"){
        return "#f0efef";
    }
    if (d.eth == "wf"){
        return "#ddeedd";
    }
    if (d.eth == "dd"){
        return "lightpink";
    }
    if (d.eth == "df") {
        return "#b0aac0";
    }
    if (d.eth == "dm") {
        return "#c2d4dd";
    }
}

// organize datapoints into  nice grid
let gridding = d3.gridding()
  .size([w,h])
  .mode("grid")
;

// kill me pls
function gotData(incomingData){

    let data = incomingData;

    let griddingData = gridding(data);

    let datagroups = viz.selectAll(".datagroup").data(griddingData)
        .enter()
            .append("g")
                .classed("datagroup", true)
    ;

    // add chairs and get position based on grid
    let points = datagroups.append("image")
        .attr("xlink:href","chair.png")
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    ;

    // get text (and position based on grid)
    let labels = datagroups.append("text")
      .text(function(d,i){
        return d.movie + " directed by " + d.director;
      })
      .attr("transform", function(d) { return "translate(" + 400 + "," + (d.y + 60) + ")"; })
      .attr("fill",getColor)
      .style("display", "none")
      .style("font-family","Barlow, 'sans-serif', generic")
    ;

  // display text
  datagroups
      .on("mouseover", function(){
          let element = d3.select(this);
          element.select("text").transition().style("display", "inline");
      })
    ;

    datagroups
      .on("mouseout", function(){
          let element = d3.select(this);
          element.select("text").transition().style("display", "none");
      })
    ;

    // long and ugly filter section
    datagroups.filter(function(d){
        return d.eth == "wm";
      }).select("image").attr("id","wmadd")
    ;
    
    datagroups.filter(function(d){
        return d.eth == "wf";
      }).select("image").attr("id","wfadd")
    ;
    
    datagroups.filter(function(d){
        return d.eth == "dm";
      }).select("image").attr("id","dmadd")
    ;
    
    datagroups.filter(function(d){
        return d.eth == "df";
      }).select("image").attr("id","dfadd")
    ;
    
    datagroups.filter(function(d){
        return d.eth == "dd";
      }).select("image").attr("id","ddadd")
    ;
    
    datagroups.filter(function(d){
      return d.year == "2009";
    }).select("image").attr("class","add2009")
  ;
  
  datagroups.filter(function(d){
      return d.year == "2010";
    }).select("image").attr("class","add2010")
  ;

  datagroups.filter(function(d){
      return d.year == "2011";
    }).select("image").attr("class","add2011")
  ;

  datagroups.filter(function(d){
      return d.year == "2012";
    }).select("image").attr("class","add2012")
  ;

  datagroups.filter(function(d){
      return d.year == "2013";
    }).select("image").attr("class","add2013")
  ;

    // event listeners & how i'm going to die
    let year = 0;

    let ethn;

    document.getElementById("wmdm").addEventListener("click", function(){
      document.getElementById("wmdm").style.background = "#f0efef";
      document.getElementById("wmdm").style.color = "black";
      document.getElementById("dm").style.color = "white";
      document.getElementById("wfdf").style.color = "white";
      document.getElementById("dfm").style.color = "white";
      document.getElementById("df").style.color = "white";
      document.getElementById("dm").style.background = "black";
      document.getElementById("wfdf").style.background = "black";
      document.getElementById("dfm").style.background = "black";
      document.getElementById("df").style.background = "black";
      ethn = "wmdm"
      d3.selectAll("svg > *").remove();
      update(griddingData, "wmdm", year, ethn);
    });

    document.getElementById("dm").addEventListener("click", function(){
      document.getElementById("dm").style.background = "#c2d4dd";
      document.getElementById("dm").style.color = "black";
      document.getElementById("wmdm").style.color = "white";
      document.getElementById("wfdf").style.color = "white";
      document.getElementById("dfm").style.color = "white";
      document.getElementById("df").style.color = "white";
      document.getElementById("wmdm").style.background = "black";
      document.getElementById("wfdf").style.background = "black";
      document.getElementById("dfm").style.background = "black";
      document.getElementById("df").style.background = "black";
      ethn = "dm"
      d3.selectAll("svg > *").remove();
      update(griddingData, "dm", year,ethn);
    });
    
    document.getElementById("wfdf").addEventListener("click", function(){
      document.getElementById("wfdf").style.background = "#ddeedd";
      document.getElementById("wmdm").style.background = "black";
      document.getElementById("dm").style.background = "black";
      document.getElementById("dfm").style.background = "black";
      document.getElementById("df").style.background = "black";
      document.getElementById("wfdf").style.color = "black";
      document.getElementById("wmdm").style.color = "white";
      document.getElementById("dm").style.color = "white";
      document.getElementById("dfm").style.color = "white";
      document.getElementById("df").style.color = "white";
      ethn = "wfdf"
      d3.selectAll("svg > *").remove();
      update(griddingData, "wfdf", year,ethn);
    });

    document.getElementById("df").addEventListener("click", function(){
      document.getElementById("df").style.background = "#b0aac0";
      document.getElementById("wmdm").style.background = "black";
      document.getElementById("wfdf").style.background = "black";
      document.getElementById("dfm").style.background = "black";
      document.getElementById("dm").style.background = "black";
      document.getElementById("df").style.color = "black";
      document.getElementById("wmdm").style.color = "white";
      document.getElementById("wfdf").style.color = "white";
      document.getElementById("dfm").style.color = "white";
      document.getElementById("dm").style.color = "white";
      ethn = "df"
      d3.selectAll("svg > *").remove();
      update(griddingData, "df", year,ethn);
    });

    document.getElementById("dfm").addEventListener("click", function(){
      document.getElementById("dfm").style.background = "lightpink";
      document.getElementById("wmdm").style.background = "black";
      document.getElementById("wfdf").style.background = "black";
      document.getElementById("df").style.background = "black";
      document.getElementById("dm").style.background = "black";
      document.getElementById("dfm").style.color = "black";
      document.getElementById("wmdm").style.color = "white";
      document.getElementById("wfdf").style.color = "white";
      document.getElementById("df").style.color = "white";
      document.getElementById("dm").style.color = "white";
      ethn = "dfm"
      d3.selectAll("svg > *").remove();
      update(griddingData, "dfm", year,ethn);
    });

    document.getElementById("reset").addEventListener("click", function(){
      document.getElementById("dfm").style.background = "black";
      document.getElementById("wmdm").style.background = "black";
      document.getElementById("wfdf").style.background = "black";
      document.getElementById("df").style.background = "black";
      document.getElementById("dm").style.background = "black";

      document.getElementById("dropbtn").style.background = "black";
      document.getElementById("dropbtn").style.color = "white";

      document.getElementById("dfm").style.color = "white";
      document.getElementById("wmdm").style.color = "white";
      document.getElementById("wfdf").style.color = "white";
      document.getElementById("df").style.color = "white";
      document.getElementById("dm").style.color = "white";

      year = 0;
      ethn = "reset";
      d3.selectAll("svg > *").remove();
      update(griddingData, "reset", year,ethn);
    });

    document.getElementById("all").addEventListener("click", function(){
      document.getElementById("dropbtn").style.background = "black";
      document.getElementById("dropbtn").style.color = "white";
      year = 0;
      d3.selectAll("svg > *").remove();
      update(griddingData, "all", year, ethn);
    });

    document.getElementById("2009").addEventListener("click", function(){
      document.getElementById("dropbtn").style.background = "black";
      document.getElementById("dropbtn").style.color = "white";
      year = 1;
      d3.selectAll("svg > *").remove();
      update(griddingData, "2009", year, ethn);
    });

    document.getElementById("2010").addEventListener("click", function(){
      document.getElementById("dropbtn").style.background = "black";
      document.getElementById("dropbtn").style.color = "white";
      year = 2;
      d3.selectAll("svg > *").remove();
      update(griddingData, "2010", year, ethn);
    });

    document.getElementById("2011").addEventListener("click", function(){
      document.getElementById("dropbtn").style.background = "black";
      document.getElementById("dropbtn").style.color = "white";
      year = 3;
      d3.selectAll("svg > *").remove();
      update(griddingData, "2011", year, ethn);
    });

    document.getElementById("2012").addEventListener("click", function(){
      document.getElementById("dropbtn").style.background = "black";
      document.getElementById("dropbtn").style.color = "white";
      year = 4;
      d3.selectAll("svg > *").remove();
      update(griddingData, "2012", year, ethn);
    });

    document.getElementById("2013").addEventListener("click", function(){
      document.getElementById("dropbtn").style.background = "black";
      document.getElementById("dropbtn").style.color = "white";
      year = 5;
      d3.selectAll("svg > *").remove();
      update(griddingData, "2013", year, ethn);
    });

    document.getElementById("main").addEventListener("click", function(){
      window.location.href = "../index.html";
    });

    document.getElementById("time").addEventListener("click", function(){
      window.location.href = "../overtime/index.html";
    });

    // console.log(year + " - " + ethn)

}

// -------------- UPDATE STUFF -------------------------------------

function update(entering, x, y, ee) {

  let data = entering;
  // console.log(entering);

  let datagroups = viz.selectAll(".datagroup").data(data)
        .enter()
            .append("g")
                .classed("datagroup", true)
    ;

    // add chairs and get position based on grid
    let points = datagroups.append("image")
        .attr("xlink:href","chair.png")
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    ;

    // get text (and position based on grid)
    let labels = datagroups.append("text")
      .text(function(d,i){
        return d.movie + " directed by " + d.director;
      })
      .attr("transform", function(d) { return "translate(" + 400 + "," + (d.y + 60) + ")"; })
      .attr("fill",getColor)
      .style("display", "none")
      .style("font-family","Barlow, 'sans-serif', generic");
    ;

  // display text
  datagroups
      .on("mouseover", function(){
          let element = d3.select(this);
          element.select("text").transition().style("display", "inline");
      })
    ;

    datagroups
      .on("mouseout", function(){
          let element = d3.select(this);
          element.select("text").transition().style("display", "none");
      })
    ;

    // long and ugly filter section
    datagroups.filter(function(d){
        return d.eth == "wm";
      }).select("image").attr("id","wmadd")
    ;
    
    datagroups.filter(function(d){
        return d.eth == "wf";
      }).select("image").attr("id","wfadd")
    ;
    
    datagroups.filter(function(d){
        return d.eth == "dm";
      }).select("image").attr("id","dmadd")
    ;
    
    datagroups.filter(function(d){
        return d.eth == "df";
      }).select("image").attr("id","dfadd")
    ;
    
    datagroups.filter(function(d){
        return d.eth == "dd";
      }).select("image").attr("id","ddadd")
    ;
    
    datagroups.filter(function(d){
      return d.year == "2009";
    }).select("image").attr("class","add2009")
  ;
  
  datagroups.filter(function(d){
      return d.year == "2010";
    }).select("image").attr("class","add2010")
  ;

  datagroups.filter(function(d){
      return d.year == "2011";
    }).select("image").attr("class","add2011")
  ;

  datagroups.filter(function(d){
      return d.year == "2012";
    }).select("image").attr("class","add2012")
  ;

  datagroups.filter(function(d){
      return d.year == "2013";
    }).select("image").attr("class","add2013")
  ;


  // --------------------- enter & exit madness ---------------------

  // --------------------- CATEGORY --------------------------

  if (x == "wmdm" && ee != "reset") {
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wfadd").remove();
  };
  if (x == "dm" && ee != "reset"){
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (x == "wfdf" && ee != "reset"){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
  }
  if (x == "df" && ee != "reset"){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (x == "dfm" && ee != "reset"){
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }

  // -------------------- "All Years" ---------------------------

  if (ee == "wmdm" && y == 0) {
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wfadd").remove();
  };
  if (ee == "dm" && y == 0){
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "wfdf" && y == 0){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
  }
  if (ee == "df" && y == 0){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "dfm" && y == 0){
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }

  // ------------------- YEARS ----------------------------

  if (x == "2009" || y == 1){
    datagroups.selectAll(".add2010").remove();
    datagroups.selectAll(".add2011").remove();
    datagroups.selectAll(".add2012").remove();
    datagroups.selectAll(".add2013").remove();
    // console.log("whyyyy");
  }
  if (x == "2010" || y == 2){
    datagroups.selectAll(".add2009").remove();
    datagroups.selectAll(".add2011").remove();
    datagroups.selectAll(".add2012").remove();
    datagroups.selectAll(".add2013").remove();
  }

  if (x == "2011" || y == 3){
    datagroups.selectAll(".add2010").remove();
    datagroups.selectAll(".add2009").remove();
    datagroups.selectAll(".add2012").remove();
    datagroups.selectAll(".add2013").remove();
  }

  if (x == "2012" || y == 4){
    datagroups.selectAll(".add2010").remove();
    datagroups.selectAll(".add2011").remove();
    datagroups.selectAll(".add2009").remove();
    datagroups.selectAll(".add2013").remove();
  }

  if (x == "2013" || y == 5){
    datagroups.selectAll(".add2010").remove();
    datagroups.selectAll(".add2011").remove();
    datagroups.selectAll(".add2012").remove();
    datagroups.selectAll(".add2009").remove();
  }

  // -------------------- 2009 ---------------------------

  if (ee == "wmdm" && y == 1) {
      datagroups.selectAll("#dfadd").remove();
      datagroups.selectAll("#wfadd").remove();
  };
  if (ee == "dm" && y == 1){
      datagroups.selectAll("#dfadd").remove();
      datagroups.selectAll("#wmadd").remove();
      datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "wfdf" && y == 1){
      datagroups.selectAll("#dmadd").remove();
      datagroups.selectAll("#wmadd").remove();
  }
  if (ee == "df" && y == 1){
      datagroups.selectAll("#dmadd").remove();
      datagroups.selectAll("#wmadd").remove();
      datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "dfm" && y == 1){
      datagroups.selectAll("#wmadd").remove();
      datagroups.selectAll("#wfadd").remove();
  }

    // -------------------- 2010 ---------------------------

    if (ee == "wmdm" && y == 2) {
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wfadd").remove();
  };
  if (ee == "dm" && y == 2){
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "wfdf" && y == 2){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
  }
  if (ee == "df" && y == 2){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "dfm" && y == 2){
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }

    // -------------------- 2011 ---------------------------

    if (ee == "wmdm" && y == 3) {
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wfadd").remove();
  };
  if (ee == "dm" && y == 3){
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "wfdf" && y == 3){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
  }
  if (ee == "df" && y == 3){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "dfm" && y == 3){
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }

    // -------------------- 2012 ---------------------------

    if (ee == "wmdm" && y == 4) {
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wfadd").remove();
  };
  if (ee == "dm" && y == 4){
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "wfdf" && y == 4){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
  }
  if (ee == "df" && y == 4){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "dfm" && y == 4){
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  // -------------------- "2013 ---------------------------

  if (ee == "wmdm" && y == 5) {
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wfadd").remove();
  };
  if (ee == "dm" && y == 5){
    datagroups.selectAll("#dfadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "wfdf" && y == 5){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
  }
  if (ee == "df" && y == 5){
    datagroups.selectAll("#dmadd").remove();
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
  if (ee == "dfm" && y == 5){
    datagroups.selectAll("#wmadd").remove();
    datagroups.selectAll("#wfadd").remove();
  }
    
}

d3.json("data.json").then(gotData);