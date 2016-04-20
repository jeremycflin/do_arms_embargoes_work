
jQuery(document).ready(function($){
    
    // $("#header-container").width($(window).width()); 
    
    // $("#header-container").height($(window).height()); 

    
    $(window).on("load resize", function(){ 
        // $("#header-container").height($(window).height());
        // $("#header-container").width($(window).width()); 
        var s = skrollr.init();
    });  
    
   
            
});

var scrollVis = function() {
  // constants to define the size
  // and margins of the vis area.
  var width = 820;
  var height = 520;
  var margin = {top:80, left:70, bottom:80, right:55};
  // var margin = {top:0, left:0, bottom:0, right:60};


  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  var parseDate = d3.time.format("%Y").parse;

  var highlightNames = 
    { china:["RUSSIA","EU","OTHER"],
      myanmar:["CHINA","RUSSIA","EU","OTHER","SYRIA","NORTH KOREA","IRAN","MYANMAR"],
      syria:["CZECHOSLOVAKIA","RUSSIA"], 
      korea:["SOVIET UNION", "CHINA", "RUSSIA"]
    };

  var arrowPos = {
    china:[[220,520],[260,570]],
    myanmar:[[110,530],[120,570]],
    syria:[[710,500],[755,540]],
    syriaAnno:[[110,550],[110,580]],
    korea:[[610,490],[670,570]],
    koreaAnno:[[295,215],[270,250]]
  }

  var colorScale = {
    // EU:"#00a8ff",
    EU:"#10a7dd",
    Russia:"#FFC9B2",
    China:"#ff99ad",
    Other:"#7fbfbf"
  }

  var swoopy = swoopyArrow()
    .angle(Math.PI/4)
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; });

  var grey = "url(#lightstripe)";
  



  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];
  // If a section has an update function
  // then it is called while scrolling
  // through the section with the current
  // progress through the section.
  var updateFunctions = [];
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  var xLineScale = d3.time.scale()
    .range([0, width]),

  yLineScale = d3.scale.linear()
    .range([height, 0]);

  var xBarScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], .005),
  yBarScale = d3.scale.linear()
    .rangeRound([height, 0]);

  var xAreaScale = d3.time.scale().range([0, width]),
      yAreaScale = d3.scale.linear().range([height, 0])
  
  var xAxisLine = d3.svg.axis()
    .scale(xLineScale)
    .orient("bottom")
    .ticks(10),

  yAxisLine = d3.svg.axis()
    .scale(yLineScale)
    .orient("left")
    .ticks(6);

  var yAxisBar = d3.svg.axis()
    .scale(yBarScale)
    .orient("left")
    .ticks(10);

  //line
  var valueline = d3.svg.line().interpolate("basis")
    .x(function(d) { return xLineScale(d.year); })
    .y(function(d) { return yLineScale(d.value); });


  var x = d3.time.scale();

  var color = d3.scale.category10(),
  area  = d3.svg.area().interpolate("basis"),
  stack = d3.layout.stack(),
  nest = d3.nest()
        .key(function(d) { return d.country; });

  var countryList = ["China", "Myanmar","Syria","North Korea","Iran"]



  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function(selection) {
    selection.each(function(rawData) {
      // create svg and give it a width and height
      svg = d3.select(this).selectAll("svg").data([rawData]);
      svg.enter()
      // .append("div").attr("class","svg-holder")
      .append("svg").append("g")

      // svg.attr("width", width + margin.left + margin.right);
      // svg.attr("height", height + margin.top + margin.bottom);

      svg.attr("width","100%")
      .attr("height","100%")
      .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
      .attr("preserveAspectRatio", "xMinYMin")


      // this group element will be used to contain all
      // other elements.
      g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      
        
      g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",130) 
        .attr("class","locator")
        .attr("id","one")

      g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",150)
        .attr("class","locator")
        .attr("id","two")   

      g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",170)  
        .attr("class","locator")
        .attr("id","three")   

      g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",190)  
        .attr("class","locator")
        .attr("id","four") 

      g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",210)  
        .attr("class","locator")
        .attr("id","five") 

      g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",230)  
        .attr("class","locator")
        .attr("id","six") 

      g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",250)  
        .attr("class","locator")
        .attr("id","seven") 

      g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",270)  
        .attr("class","locator")
        .attr("id","eight") 

      g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",290)  
        .attr("class","locator")
        .attr("id","nine") 

       g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",310)  
        .attr("class","locator")
        .attr("id","ten") 

       g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",330)  
        .attr("class","locator")
        .attr("id","eleven") 

       g.append("circle")
        .attr("r",5)
        .attr("cx",width + 30)
        .attr("cy",350)  
        .attr("class","locator")
        .attr("id","twelve") 





      var lineData = getData(rawData),
        ChinaBarData = dataFilter(lineData,countryList[0]);


      var chinaData = dataFilter(lineData,countryList[0]);

      var myanmarnaData = lineData.filter(function(d){
        return d.country == "Total" && d.recipient == "Myanmar"; 
      });

      var syriaData = lineData.filter(function(d){
        return d.country == "Total" && d.recipient == "Syria"; 
      });

      var koreaData = lineData.filter(function(d){
        return d.country == "Total" && d.recipient == "North Korea"; 
      });


      //set linchart's domain
      var lineXDomain = d3.extent(rawData, function(d){return d.year;});
      xLineScale.domain(lineXDomain)

      var lineYDomain = d3.max(rawData, function(d){return Math.max(d.value);});
      yLineScale.domain([0, lineYDomain])



      //set china bar chart's domain
      var barChinaXdomain = dataFilter(lineData,countryList[0]).map(function(d) { return d.year; })
      xBarScale.domain(barChinaXdomain)

      var barChinaYdomain = d3.max(dataFilter(chinaData,countryList[0]), function(d){return Math.max(d.value);});
      yBarScale.domain([0, barChinaYdomain])

      // var myanmarDomain = d3.max(dataFilter(chinaData,countryList[1]), function(d){return Math.max(d.value);});
      // yBarScale.domain([0, myanmarDomain])

      setupVis(lineData,ChinaBarData, chinaData, myanmarnaData, syriaData, koreaData);


      g.select(".y.axis").style("opacity", 0);

      setupSections();

    });
  };


  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   *
   * @param wordData - data object for each word.
   * @param fillerCounts - nested data that includes
   *  element for each filler word type.
   * @param histData - binned histogram data
   */
  setupVis = function(lineData,ChinaBarData, chinaData, myanmarnaData, syriaData, koreaData) {




      // Define simple arrowhead marker
    svg.append('defs')
      .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "-10 -10 20 20")
        .attr("refX", 0)
        .attr("refY", 0)
        .attr("markerWidth", 20)
        .attr("markerHeight", 20)
        .attr("stroke-width", 1)
        .attr("orient", "auto")
      .append("polyline")
        .attr("stroke-linejoin", "bevel")
        .attr("points", "-6.75,-6.75 0,0 -6.75,6.75");
    
    
    g.append("g")
      .attr("class", "x axis grid")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisLine)

    // g.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxisLine)

    // g.append("g")
    //   .attr("class", "grid")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxisLine)

    // g.select(".x.axis").style("opacity", 0);

  
    // count openvis title
    // g.append("text")
    //   .attr("class", "title openvis-title")
    //   .attr("x", width / 2)
    //   .attr("y", height / 2.5)
    //   .text("DO ARMS EMBARGOES");

    // g.append("text")
    //   .attr("class", "sub-title openvis-title")
    //   .attr("x", width / 2)
    //   .attr("y", (height / 3) + (height / 6) )
    //   .text("ACTUALLY WORK?");

    g.selectAll(".openvis-title")
      .attr("opacity", 0);

    g.append("path")      
      // .attr("class", "line") 
      .attr("id", "chinaLine") 
      .attr("d", valueline(lineData.filter(
        function(d){
          return d.country == "Total" && d.recipient == "China";
        }
      )))


      

    stack
      .offset("zero")
      .values(function(d) { return d.values; })
      .x(function(d) { return d.year; })
      .y(function(d) { return d.value; });

    area
      .x(function(d) { return xAreaScale(d.year); })
      .y0(function(d) { return yAreaScale(d.y0); })
      .y1(function(d) { return yAreaScale(d.y0 + d.y); })

    var layersChina = stack(nest.entries(dataFilter(lineData, countryList[0]))),
    layersMyanmar = stack(nest.entries(dataFilter(lineData,countryList[1]))),
    layersSyria = stack(nest.entries(dataFilter(lineData,countryList[2]))),
    layersKorea = stack(nest.entries(dataFilter(lineData,countryList[3]))),
    layersIran = stack(nest.entries(dataFilter(lineData,countryList[4])));

    var data = dataFilter(lineData, countryList[0]);

    xAreaScale.domain(d3.extent(data, function(d) { return d.year; }));
    yAreaScale.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

    g.append("rect")
      .attr("x", xAreaScale(new Date("1989")))
      .attr("y", 0)
      .attr("width", 0)
      .attr("height", height)
      .attr("class", "embargoChina")
      .style("opacity", 0.25)
      .style("fill", grey)



    g.selectAll(".chinalayers")
      .data(layersChina)
      .enter()
      .append("path")
      .attr("class", "chinalayers layers")
      .style("fill", function(d){
            if(d.key == "EU"){ return colorScale["EU"]}
            else if (d.key == "Russia"){return colorScale["Russia"]}
            else {return colorScale["Other"]}          
          })
      .style("opacity",0)
      .attr("d", function(d) {return area(d.values); })


     g.append("text")
      .attr("x", xAreaScale(myanmarnaData[0].year) + 10)
      .attr("y", 12)
      .attr("width", width)
      .attr("height", height)
      .text("Million dollar Worth of arms to")
      .attr("class", "axis_lable")
      .style("font-size",13)


     g.append("text")
      .attr("x", xAreaScale(myanmarnaData[0].year) + 8)
      .attr("y", 50)
      .attr("width", width)
      .attr("height", height)
      .text(highlightNames.myanmar[0])
      .attr("class", "axis_lable titleCountry")
      .style("font-size",35)
      .style("font-family","Roboto")

    
    function myanmarArea (){
      var data = dataFilter(lineData, countryList[1])

        xAreaScale.domain(d3.extent(data, function(d) { return d.year; }));
        yAreaScale.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

        g.append("rect")
          .attr("x", xAreaScale(new Date("1991")))
          .attr("y", 0)
          .attr("width", 0)
          .attr("height", height)
          .attr("class", "embargoMyanmar")
          .style("opacity", 0.25)
          .style("fill",grey)
     
        g.selectAll(".layersyanmar")
          .data(layersMyanmar)
          .enter()
          .append("path")
          .attr("class", "layers layersyanmar")
          .style("opacity",0)
          .style("fill", function(d){
          if(d.key == "EU"){ return colorScale["EU"]}
          else if (d.key == "Russia"){return colorScale["Russia"]}
          else if (d.key == "China"){return colorScale["China"]}
          else {return colorScale["Other"]}          
        })
          .attr("d", function(d) {return area(d.values); })

      function drawMyanmarLine(){
        xLineScale.domain(d3.extent(data, function(d) { return d.year; }));
        yLineScale.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

        g.append("path")
          .attr("class", "myanmarLine")    
          .attr("d", valueline(lineData.filter(
            function(d){
              return d.country == "Total" && d.recipient == "Myanmar";
            }
          )))


        g.append("text")
          .attr("x", xLineScale(myanmarnaData[1].year) )
          .attr("y", yLineScale(100))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[2])
          .attr("class","annotation myanmarcountry")
          .style("opacity",0)
          .style("text-align","center")

        g.append("text")
          .attr("x", xLineScale(myanmarnaData[10].year)- 5 )
          .attr("y", yLineScale(10))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[3])
          .attr("class","annotation myanmarcountry")
          .style("opacity",0)
          .style("text-align","center")

        g.append("text")
          .attr("x", xLineScale(myanmarnaData[14].year) )
          .attr("y", yLineScale(60))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[0])
          .attr("class","annotation myanmarcountry")
          .style("opacity",0)
          .style("text-align","center")

        g.append("text")
          .attr("x", xLineScale(myanmarnaData[24].year) )
          .attr("y", yLineScale(80))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[1])
          .attr("class","annotation myanmarcountry")
          .style("opacity",0)
          .style("text-align","center")

        g.append("text")
          .attr("x", xLineScale(myanmarnaData[11].year) )
          .attr("y", -10)
          .attr("width", width)
          .attr("height", height)
          .text("EU embargo starts from 1991")
          .attr("class","annotation myanmarcountry dropdown")
          .style("opacity",0)
          .style("font-weight",400)
          .style("text-align","center")


        g.append("g")
          .call(yAxisLine)
          .attr('class','myanmarY axis grid')
          .style('opacity',0)

          }

      setTimeout(drawMyanmarLine,100)
    }

    function syriaArea (){
      var data = dataFilter(lineData, countryList[2])

      xAreaScale.domain(d3.extent(data, function(d) { return d.year; }));
      yAreaScale.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

      g.append("rect")
        .attr("x", xAreaScale(new Date("2011")))
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", height)
        .attr("class", "embargoSyria")
        .style("opacity", 0.25)
        .style("fill",grey)
       
     
      g.selectAll(".layersSyria")
        .data(layersSyria)
        .enter()
        .append("path")
        .attr("class", "layers layersyria")
        .style("opacity",0)
        .style("fill", function(d){
            if(d.key == "EU"){ return colorScale["EU"]}
            else if (d.key == "Russia"){return colorScale["Russia"]}
            else if (d.key == "China"){return colorScale["China"]}
            else {return colorScale["Other"]}          
          })
        .attr("d", function(d) {return area(d.values); })

      function drawSyriaLine(){
        xLineScale.domain(d3.extent(data, function(d) { return d.year; }));
        yLineScale.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

        g.append("path")      
          .attr("class", "syriaLine") 
          .attr("d", valueline(lineData.filter(
            function(d){
              return d.country == "Total" && d.recipient == "Syria";
            }
          )))

        g.append("circle")
          .attr("r",20)
          .attr("cx",xLineScale(myanmarnaData[1].year))
          .attr("cy",yLineScale(0))
          .attr("width", width)
          .attr("height", height)
          .attr("class","annotationCircle")
          .style("opacity",0)

        g.append("text")
          .attr("x", xLineScale(myanmarnaData[26].year) )
          .attr("y", yLineScale(500))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[0])
          .attr("class","syriacountry annotation")
          .style("opacity",0);

        g.append("text")
          .attr("x", xLineScale(myanmarnaData[4].year))
          .attr("y", yLineScale(200))
          .attr("width", width)
          .attr("height", height)
          .text("OTHER")
          .attr("class","syriacountry annotation")
          .style("opacity",0);

        g.append("text")
          .attr("x", xLineScale(myanmarnaData[1].year) )
          .attr("y", yLineScale(250))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[2])
          .attr("class","syriacountry annotation")
          .style("opacity",0);

        g.append("text")
          .attr("x", xLineScale(myanmarnaData[30].year) )
          .attr("y", yLineScale(200))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[1])
          .attr("class","syriacountry annotation")
          .style("opacity",0);

        g.append("text")
          .attr("x", xLineScale(myanmarnaData[27].year))
          .attr("y", -10)
          .attr("width", width)
          .attr("height", height)
          .text("EU embargo starts from 2011")
          .attr("class","syriacountry annotation dropdown")
          .style("opacity",0)
          .style("font-weight",400)
          .style("text-align","center")

        g.append("g")
          .call(yAxisLine)
          .attr('class','syriaY axis grid')
          .style('opacity',0)

      }
      setTimeout(drawSyriaLine,100)
    }

    function koreaArea (){
      var data = dataFilter(lineData, countryList[3])

      xAreaScale.domain(d3.extent(data, function(d) { return d.year; }));
      yAreaScale.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

      g.append("rect")
        .attr("x", xAreaScale(new Date("2006")))
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", height)
        .attr("class", "embargoKorea")
        .style("opacity", 0.25)
        .style("fill",grey)
     
      g.selectAll(".layersKorea")
        .data(layersKorea)
        .enter()
        .append("path")
        .attr("class", "layers layerkorea")
        .style("opacity",0)
        // .style("fill",function(d){
        //   if(d.key=="Russia"){
        //     return colors["korea"]
        //   }else{return colors["grey"]}
        // })
        .style("fill", function(d){
            if(d.key == "EU"){ return colorScale["EU"]}
            else if (d.key == "Russia"){return colorScale["Russia"]}
            else if (d.key == "China"){return colorScale["China"]}
            else {return colorScale["Other"]}          
          })
        .attr("d", function(d) {return area(d.values); })

      function drawKoreaLine(){
        xLineScale.domain(d3.extent(data, function(d) { return d.year; }));
        yLineScale.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

        g.append("path")      
          .attr("class", "koreaLine") 
          .attr("id", "korea") 
          .attr("d", valueline(lineData.filter(
            function(d){
              return d.country == "Total" && d.recipient == "North Korea";
            }
          )))


        g.append("text")
          .attr("x", xLineScale(koreaData[4].year) + 10 )
          .attr("y", yLineScale(250))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[3])
          .attr("class","koreaannotation annotation koreacountry")
          .style("opacity",0);

        g.append("text")
          .attr("x", xLineScale(koreaData[14].year) )
          .attr("y", yLineScale(20))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[1])
          .attr("class","koreaannotation annotation koreacountry")
          .style("opacity",0)

        g.append("text")
          .attr("x", xLineScale(koreaData[9].year) )
          .attr("y", yLineScale(830))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[0])
          .attr("class","koreaannotation annotation koreacountry")
          .style("opacity",0)

        g.append("text")
          .attr("x", xLineScale(koreaData[26].year))
          .attr("y", -10)
          .attr("width", width)
          .attr("height", height)
          .text("EU embargo starts from 2006")
          .attr("class","koreaannotation annotation koreacountry dropdown")
          .style("opacity",0)
          .style("font-weight",400)
          .style("text-align","center")

        g.append("g")
          .call(yAxisLine)
          .attr('class','koreaY axis grid')
          .style('opacity',0)


      }
      setTimeout(drawKoreaLine,100)
    }

    function iranArea (){
      var data = dataFilter(lineData, countryList[4])
      xAreaScale.domain(d3.extent(data, function(d) { return d.year; }));
      yAreaScale.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);


      g.append("rect")
        .attr("x", xAreaScale(new Date("2007")))
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", height)
        .attr("class", "embargoIran")
        .style("opacity", 0.25)
        .style("fill",grey)
         
     
      g.selectAll(".layersIran")
        .data(layersIran)
        .enter()
        .append("path")
        .attr("class", "layers layersIran")
        .style("opacity",0)
        .style("fill", function(d){
            if(d.key == "EU"){ return colorScale["EU"]}
            else if (d.key == "Russia"){return colorScale["Russia"]}
            else if (d.key == "China"){return colorScale["China"]}
            else {return colorScale["Other"]}          
          })
        .attr("d", function(d) {return area(d.values); })

      function drawIranLine(){
        xLineScale.domain(d3.extent(data, function(d) { return d.year; }));
        yLineScale.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

        g.append("path")      
          .attr("class", "iranLine") 
          .attr("id", "iran") 
          .attr("d", valueline(lineData.filter(
            function(d){
              return d.country == "Total" && d.recipient == "Iran";
            }
          )))


        g.append("text")
          .attr("x", xLineScale(koreaData[4].year) )
          .attr("y", yLineScale(50))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[2])
          .attr("class","annotation iranAnnotation")
          .style("opacity",0)
          .style("text-align","center")

        g.append("text")
          .attr("x", xLineScale(koreaData[3].year) + 15 )
          .attr("y", yLineScale(460))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[0])
          .attr("class","annotation iranAnnotation")
          .style("opacity",0)
          .style("text-align","center")

        g.append("text")
          .attr("x", xLineScale(koreaData[20].year) )
          .attr("y", yLineScale(250))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[1])
           .attr("class","annotation iranAnnotation")
          .style("opacity",0)
          .style("text-align","center")

        g.append("text")
          .attr("x", xLineScale(koreaData[3].year) + 15 )
          .attr("y", yLineScale(250))
          .attr("width", width)
          .attr("height", height)
          .text(highlightNames.myanmar[3])
          .attr("class","annotation iranAnnotation")
          .style("opacity",0)
          .style("text-align","center")

        g.append("text")
          .attr("x", xLineScale(koreaData[27].year))
          .attr("y", -10)
          .attr("width", width)
          .attr("height", height)
          .text("EU embargo starts from 2007")
          .attr("class","annotation iranAnnotation dropdown")
          .style("opacity",0)
          .style("font-weight",400)
          .style("text-align","center")

         g.append("g")
          .call(yAxisLine)
          .attr('class','iranY axis grid')
          .style('opacity',0)

      }
      setTimeout(drawIranLine,100)
    }
 
    function areaBoot(){
      myanmarArea()
      syriaArea()
      koreaArea()
      iranArea()
    }


    setTimeout(areaBoot, 100);

    // Draw some arrows!
    svg.append("path")
    .attr('marker-end', 'url(#arrowhead)')
    .datum(arrowPos.china)
    .attr("d", swoopy)
    .attr("class","annotation")
    .style("opacity",0)

    svg.append("path")
    .attr('marker-end', 'url(#arrowhead)')
    .datum(arrowPos.myanmar)
    .attr("d", swoopy)
    .attr("class","myanmarannotation annotation")
    .style("opacity",0)

    svg.append("path")
    .attr('marker-end', 'url(#arrowhead)')
    .datum(arrowPos.syria)
    .attr("d", swoopy)
    .attr("class","syriacountry annotation")
    // .style("opacity",0)

    svg.append("path")
    .attr('marker-end', 'url(#arrowhead)')
    .datum(arrowPos.syriaAnno)
    .attr("class","syriacountry annotation")
    .attr("d", swoopy)
    // .style("opacity",0)

    svg.append("path")
    .attr('marker-end', 'url(#arrowhead)')  
    .attr("d", swoopy)
    .attr("class","koreaannotation annotation koreacountry koreamarker")

    svg.append("path")
    .attr('marker-end', 'url(#arrowhead)')
    .datum(arrowPos.koreaAnno)
    .attr("d", swoopy)
    .attr("class","koreaannotation annotation koreacountry koreamarker")

    // g.append("text")
    //   .attr("x", xLineScale(chinaData[2].year) )
    //   .attr("y", yLineScale(550))
    //   .attr("width", width)
    //   .attr("height", height)
    //   .text("EU embargo starts")
    //   .attr("class","annotation")
    //   .style("opacity",0);

    g.append("text")
      .attr("x", xLineScale(chinaData[24].year) - 10 )
      .attr("y", yLineScale(70))
      .attr("width", width)
      .attr("height", height)
      .text(highlightNames.china[1])
      .attr("class","annotation chinaFrance")
      .style("opacity",0)
      .style("text-align","center")

    g.append("text")
      .attr("x", xLineScale(chinaData[23].year) )
      .attr("y", yLineScale(1300 ))
      .attr("width", width)
      .attr("height", height)
      .text(highlightNames.china[0])
      .attr("class","annotation chinaFrance")
      .style("opacity",0)
      .style("text-align","center")

    g.append("text")
      .attr("x", xLineScale(chinaData[31].year) + 5 )
      .attr("y", yLineScale(400))
      .attr("width", width)
      .attr("height", height)
      .text(highlightNames.china[2])
      .attr("class","annotation chinaFrance")
      .style("opacity",0)
      .style("text-align","center")

    g.append("text")
      .attr("x", xLineScale(chinaData[9].year) )
      .attr("y", -10)
      .attr("width", width)
      .attr("height", height)
      .text("EU embargo starts from 1989")
      .attr("class","annotation chinaFrance dropdown")
      .style("opacity",0)
      .style("font-weight",400)
      .style("text-align","center")

    g.append("g")
      .call(yAxisLine)
      .attr('class','chinaY axis grid')
      .style('opacity',0)


  };

  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  setupSections = function() {
    // activateFunctions are called each
    // time the active section changes

    // console.log(i)
    activateFunctions[0] = showTitle;
    activateFunctions[1] = showAllLine;
    activateFunctions[2] = showChina;
    // activateFunctions[3] = showChina;
    activateFunctions[3] = highlightChina;
    activateFunctions[4] = showMyanmarLine;
    activateFunctions[5] = showMyanmar;
    activateFunctions[6] = highlightMyanmar;
    activateFunctions[7] = showSyriaLine;
    activateFunctions[8] = showSyriaLyaer;
    activateFunctions[9] = showKoreaLine;
    activateFunctions[10] = showKoreaLayer;
    activateFunctions[11] = showIranLine;
    activateFunctions[12] = showIranLayer;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for(var i = 0; i < 13; i++) {
      updateFunctions[i] = function() {};

    }
    // updateFunctions[7] = updateCough;
  };

  /**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

    /**
   * showTitle - initial title
   *
   * hides: count title
   * (no previous step to hide)
   * shows: intro title
   *
   */
  function showTitle() {

     g.selectAll(".locator")
      .transition()
      .duration(500)
      .style("fill","none")
      .style("opacity",0)


    g.selectAll(".count-title")
      .transition()
      .duration(0)
      .attr("opacity", 0);

    g.selectAll(".openvis-title")
      .transition()
      .duration(600)
      .attr("opacity", 1.0);

     g.select("#chinaLine")
      .transition()
      .duration(700)
      .ease("linear")
      .style("stroke-dashoffset", 15000);

    svg.selectAll(".annotation")
      .transition()
      // .duration(250)
      // .delay(500)
      .ease("linear")
      .style("opacity", 0);


    svg.selectAll(".axis_lable")
      .transition()
      .duration(500)
      .style("opacity",0)

    g.select(".chinaY")
      .transition()
      .duration(500)
      .style('opacity',0)

    hideAxis(xAxisLine, yAxisLine);
  }

    /**
   * showFillerTitle - filler counts
   *
   * hides: intro title
   * hides: square grid
   * shows: filler count title
   *
   */
  function showAllLine() {
    g.selectAll(".openvis-title")
      .transition()
      .duration(0)
      .attr("opacity", 0);

    // g.selectAll(".count-title")
    //   .transition()
    //   .duration(600)
    //   .attr("opacity", 1.0);

    // showLine();

     g.select(".embargoChina")
      .transition()
      .duration(700)
      .attr("width",0)

    showAxis(xAxisLine, yAxisLine);

    g.select(".chinaY")
      .transition()
      .duration(500)
      .style('opacity',1)

    svg.selectAll(".axis_lable")
      .transition()
      .duration(500)
      .style("opacity",1)

    svg.selectAll(".annotation")
      .transition()
      .duration(1000)
      .style("opacity",0)

    g.select("#chinaLine")
      .transition()
      .duration(20000)
      .ease("linear")
      .style("stroke-dashoffset", 0);

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",1)
      .style("fill", "none");

    g.select("#one")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",1)
      .style("fill", "black");



    // cleanChinaLine()
     // svg.selectAll(".chinaannotation")
     //   .transition()
     //   .duration(500)
     //   .style("opacity",1)


    svg.selectAll(".chinaFrance")
      .transition()
      // .duration(500)
      .style("opacity",0)

   
    
   

    // updateYaxis();
    hideChina();
    hideMyanmar();


  }


  /**
   * showAxis - helper function to
   * display particular xAxis
   *
   * @param axis - the axis to show
   *  (xAxisHist or xAxisBar)
   */
  function showAxis() {
    g.select(".x.axis")
      .call(xAxisLine)
      .transition().duration(500)
      .style("opacity", 1);

     g.select(".y.axis")
      .call(yAxisLine)
      .transition().duration(500)
      .style("opacity", 1);
  }

  /**
   * hideAxis - helper function
   * to hide the axis
   *
   */
  function hideAxis() {
    g.select(".x.axis")
      .transition().duration(500)
      .style("opacity",0);

     g.select(".y.axis")
      .transition().duration(500)
      .style("opacity",0);

  }

  /**
   * showLine - helper function to
   * display particular the line chart
   *
   * @param axis - the axis to show
   *  (xAxisHist or xAxisBar)
   */
  function showLine() {
    g.selectAll(".line")
      .transition()
      .duration(1500)
      .style("opacity", 1.0)


  }

  function cleanLine(lineData){
    // hideAxis(xAxisLine, yAxisLine)


    // svg.selectAll(".chinaannotation")
    //    .transition()
    //    .duration(500)
    //    .style("opacity",1)

    g.select(".embargoChina")
      .transition()
      .duration(700)
      .attr("width",0)


    svg.selectAll(".chinaFrance")
      .transition()
      .duration(500)
      .style("opacity",0)
    
    

    // updateYaxis();
    hideChina();
    hideMyanmar();

    

  }



  function showChina(){

     var barWidth = xAreaScale(new Date("2015")) - xAreaScale(new Date("1989"));

     g.select(".embargoChina")
      .transition()
      .duration(700)
      .attr("width",barWidth)

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill", "none")
      .style("opacity",1);

    g.select("#two")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill", "black");



    unhighlightChina()

    g.selectAll(".chinalayers")
      .transition()
      .duration(800)
      .ease("linear")
      .style("opacity", 
          function(d){
            if(d.key == "EU"){ return 1}
            else {return 0.8}          
          })

    g.selectAll(".chinaFrance")
      .transition()
      .duration(500)
      .style("opacity",1)

    g.selectAll(".chinaRussia")
      .transition()
      .duration(500)
      .style("opacity",0)

   
  }

  function hideChina(){
    g.selectAll(".chinalayers")
      .transition()
      .duration(800)
      .ease("linear")
      .style("opacity", 0)
  }

  function highlightChina(){

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill", "none")
      .style("opacity",1);

    g.select("#three")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill", "black");

    g.select(".myanmarLine")
      .transition()
      .duration(900)
      .ease("linear")
      .style("stroke-dashoffset", 15000);

    g.select(".chinaY")
      .transition()
      .duration(500)
      .style('opacity',1)

    g.selectAll(".chinalayers")
      .transition()
      .duration(800)
      // .delay(500)
      .ease("linear")
      .style("opacity", 
          function(d){
            if(d.key == "Russia"){ return 1}
            else {return .8}
          })

    svg.selectAll(".myanmarannotation")
      .transition()
      .duration(500)
      .style("opacity",0)

    svg.selectAll(".chinaannotation")
      .transition()
      .duration(500)
      .style("opacity",1)

    g.selectAll(".chinaRussia")
      .transition()
      .duration(500)
      .style("opacity",1)

    g.select(".myanmarY")
      .transition()
      .duration(500)
      .style('opacity',0)

    g.selectAll(".titleCountry")
      .transition()
      .duration(500)
      .text(highlightNames.myanmar[0])

  }

  function unhighlightChina(){




    g.selectAll(".chinalayers")
      .transition()
      .style("fill", 
            function(d){
              if(d.key == "EU"){ return colorScale["EU"]}
              // else if
              //   (d.key == "Italy"){ return "#d8a7ba"}
              // else if
              //   (d.key == "United Kingdom"){ return "#d8a7ba"}
              // else if
              //   (d.key == "Germany (FRG)"){ return "#d8a7ba"}
              else {return colorScale["Other"]}          
            })

    g.selectAll(".chinaRussia")
      .transition()
      .duration(500)
      .style("opacity",0)

    



    
  }

  function cleanChinaLine(){

    g.select("#chinaLine")
      .transition()
      .duration(700)
      .ease("linear")
      .style("stroke-dashoffset", 15000);

  }

  function showMyanmarLine(){

     g.select(".embargoMyanmar")
      .transition()
      .duration(700)
      .attr("width",0)

    g.select(".embargoChina")
      .transition()
      .duration(700)
      .attr("width",0)

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","none")
      .style("opacity",1);

    g.select("#four")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","black")

    g.select(".myanmarY")
      .transition()
      .duration(500)
      .style('opacity',1)

    g.select(".chinaY")
      .transition()
      .duration(500)
      .style('opacity',0)

    // updateYaxis();

    g.selectAll(".titleCountry")
      .transition()
      .duration(500)
      .text(highlightNames.myanmar[7])


    g.select(".myanmarLine")
        .transition()
        .duration(20000)
        .ease("linear")
        .style("stroke-dashoffset", 0);

    svg.selectAll(".chinaannotation")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity", 0)

    svg.selectAll(".myanmarcountry")
      .transition()
      .duration(500)
      .style("opacity",0)

    // g.select("#chinadot")
    //   .transition()
    //   .duration(1000)
    //   .ease("linear")
    //   .attr("r", 0)

    svg.selectAll(".myanmarannotation")
      .transition()
      .duration(500)
      .style("opacity",0)

    g.selectAll(".chinaFrance")
      .transition()
      .duration(500)
      .style("opacity",0)

    g.selectAll(".chinaRussia")
      .transition()
      .duration(500)
      .style("opacity",0)

   

    hideChina();
    hideMyanmar();
    cleanChinaLine();
  }

  function showMyanmar(){

     var barWidth = xAreaScale(new Date("2015")) - xAreaScale(new Date("1991"));

    g.select(".embargoMyanmar")
      .transition()
      .duration(700)
      .attr("width",barWidth)

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","none")
      .style("opacity",1)

    g.select("#five")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","black")

    g.selectAll(".layersyanmar")
      .transition()
      .duration(800)
      .ease("linear")
      .style("opacity", 1)
       .style("fill", function(d){
            if(d.key == "EU"){ return colorScale["EU"]}
            else if (d.key == "Russia"){return colorScale["Russia"]}
            else if (d.key == "China"){return colorScale["China"]}
            else {return colorScale["Other"]}          
          })
      .style("opacity", 
      function(d){
        if(d.key == "Russia"){ return 0.5}
        else if (d.key == "China"){return 0.5}
        else {return 1}          
      })

   

     svg.selectAll(".myanmarcountry")
      .transition()
      .duration(500)
      .style("opacity",1)

    svg.selectAll(".myanmarannotation")
      .transition()
      .duration(500)
      .style("opacity",1)

       }

  function hideMyanmar(){
    g.selectAll(".layersyanmar")
      .transition()
      .duration(800)
      .ease("linear")
      .style("opacity", 0)
  }

  function highlightMyanmar(){

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","none")
      .style("opacity",1)

    g.select("#six")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","black")

    g.select(".syriaLine")
      .transition()
      .duration(700)
      .ease("linear")
      .style("stroke-dashoffset", 15000);

    g.selectAll(".layersyanmar")
      .transition()
      .duration(800)
      .ease("linear")
      .style("opacity", 
        function(d){
          if(d.key == "Russia"){ return 1}
          else if (d.key == "China"){return 1}
          else {return 0.5}          
        })

      .style("opacity",1)

    g.select(".syriaY")
      .transition()
      .duration(500)
      .style('opacity',0)

    g.select(".myanmarY")
      .transition()
      .duration(500)
      .style('opacity',1)
  
   // svg.selectAll(".syriaannotation")
   //    .transition()
   //    .duration(500)
   //    .ease("linear")
   //    .style("opacity", 0)

  }

  function showSyriaLine(){

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","none")
      .style("opacity",1)

    g.select("#seven")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","black")

    g.select(".myanmarY")
      .transition()
      .duration(500)
      .style('opacity',0)

    g.select(".syriaY")
      .transition()
      .duration(500)
      .style('opacity',1)

    // updateYaxis();

    g.selectAll(".titleCountry")
      .transition()
      .duration(500)
      .text(highlightNames.myanmar[4])

    g.select(".annotationCircle")
      .transition()
      .duration(500)
      .style("opacity",0)

    g.select(".syriaLine")
      .transition()
      .duration(20000)
      .ease("linear")
      .style("stroke-dashoffset", 0);

    g.select(".myanmarLine")
      .transition()
      .duration(700)
      .ease("linear")
      .style("stroke-dashoffset", 15000);

    hideMyanmar()

    g.selectAll(".myanmarcountry")
      .transition()
      .duration(500)
      .style("opacity",0)

    svg.selectAll(".myanmarannotation")
      .transition()
      .duration(500)
      .style("opacity",0)

    svg.selectAll(".syriaannotation")
      .transition()
      .duration(500)
      .style("opacity",0)

    svg.selectAll(".syriacountry")
      .transition()
      .duration(500)
      .style("opacity",0)    

    g.selectAll(".layersyria")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",0)


     g.select(".embargoMyanmar")
      .transition()
      .duration(700)
      .attr("width",0)

    g.select(".embargoSyria")
      .transition()
      .duration(700)
      .attr("width",0)
  }

  function showSyriaLyaer(){

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","none")
      .style("opacity",1)

    g.select("#eight")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","black")

    g.selectAll(".layersyria")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",1)

    svg.selectAll(".syriacountry")
      .transition()
      .duration(500)
      .style("opacity",1)

     g.select(".annotationCircle")
      .transition()
      .duration(500)
      .style("opacity",1)

    g.select(".koreaLine")
      .transition()
      .duration(700)
      .ease("linear")
      .style("stroke-dashoffset", 15000);

    g.select("#koreadot")
      .transition()
      .duration(1000)
      .ease("linear")
      .attr("r", 0)

    svg.selectAll(".koreacountry")
      .transition()
      .duration(500)
      .style("opacity",0)

    svg.selectAll(".koreamarker")
      .transition()
      .duration(500)
      .style("opacity",0)

    var barWidth = xAreaScale(new Date("2015")) - xAreaScale(new Date("2011"));

    g.select(".embargoSyria")
      .transition()
      .duration(700)
      .attr("width",barWidth)

    g.select(".koreaY")
      .transition()
      .duration(500)
      .style('opacity',0)
  }
  //hide syria layer
  function showKoreaLine(){

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","none")
      .style("opacity",1)

    g.select("#nine")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","black")

    g.select(".syriaY")
      .transition()
      .duration(500)
      .style('opacity',0)

    g.select(".koreaY")
      .transition()
      .duration(500)
      .style('opacity',1)

    g.selectAll(".titleCountry")
      .transition()
      .duration(500)
      .text(highlightNames.myanmar[5])

     g.select(".annotationCircle")
      .transition()
      .duration(500)
      .style("opacity",0)

    g.select(".koreaLine")
      .transition()
      .duration(20000)
      .ease("linear")
      .style("stroke-dashoffset", 0);

    g.select(".syriaLine")
      .transition()
      .duration(700)
      .ease("linear")
      .style("stroke-dashoffset", 15000);

    g.selectAll(".layersyria")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",0)

    g.select("#syriadot")
      .transition()
      .duration(1000)
      .ease("linear")
      .attr("r", 0)

    // svg.selectAll(".syriaannotation")
    //   .transition()
    //   .duration(500)
    //   .style("opacity",0)

    svg.selectAll(".syriacountry")
      .transition()
      .duration(500)
      .style("opacity",0)

    g.selectAll(".layerkorea")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",0)

    svg.selectAll(".koreaannotation")
      .transition()
      .duration(500)
      .style("opacity",0)

    g.select(".embargoSyria")
      .transition()
      .duration(700)
      .attr("width",0)

    g.select(".embargoKorea")
      .transition()
      .duration(700)
      .attr("width",0)
  }

  function showKoreaLayer(){

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","none")
      .style("opacity",1)

    g.select("#ten")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","black")

    g.selectAll(".titleCountry")
      .transition()
      .duration(500)
      .text(highlightNames.myanmar[5])

    g.select(".iranLine")
      .transition()
      .duration(700)
      .ease("linear")
      .style("stroke-dashoffset", 15000);

    var barWidth = xAreaScale(new Date("2015")) - xAreaScale(new Date("2006"));

    g.select(".embargoKorea")
      .transition()
      .duration(700)
      .attr("width",barWidth)

    g.selectAll(".layerkorea")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",1)

    g.selectAll(".layersyria")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",0)

    svg.selectAll(".koreaannotation")
      .transition()
      .duration(500)
      .style("opacity",1)

    g.select(".iran")
      .transition()
      .duration(500)
      .style('opacity',0)

    g.select(".iranY")
      .transition()
      .duration(500)
      .style('opacity',0)
  }

  function showIranLine(){

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","none")
      .style("opacity",1)

    g.select("#eleven")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","black")

    g.select(".iranY")
      .transition()
      .duration(500)
      .style('opacity',1)

    g.select(".koreaY")
      .transition()
      .duration(500)
      .style('opacity',0)

     g.selectAll(".titleCountry")
      .transition()
      .duration(500)
      .text(highlightNames.myanmar[6])

    g.select(".koreaLine")
      .transition()
      .duration(700)
      .ease("linear")
      .style("stroke-dashoffset", 15000);

     g.select(".iranLine")
      .transition()
      .duration(10000)
      .ease("linear")
      .style("stroke-dashoffset", 0);

    g.select(".embargoIran")
      .transition()
      .duration(700)
      .attr("width",0)

    g.select(".embargoKorea")
      .transition()
      .duration(700)
      .attr("width",0)

    g.selectAll(".layerkorea")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",0)

    svg.selectAll(".koreaannotation")
      .transition()
      .duration(500)
      .style("opacity",0)

    g.selectAll(".layersIran")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",0)

    g.selectAll(".iranAnnotation")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",0)
  }

  function showIranLayer(){

    g.selectAll(".locator")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","none")
      .style("opacity",1)

    g.select("#twelve")
      .transition()
      .duration(500)
      .ease("linear")
      .style("fill","black")

    var barWidth = xAreaScale(new Date("2015")) - xAreaScale(new Date("2007"));

    g.select(".embargoIran")
      .transition()
      .duration(700)
      .attr("width",barWidth)

    g.selectAll(".layersIran")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",1)

    g.selectAll(".iranAnnotation")
      .transition()
      .duration(500)
      .ease("linear")
      .style("opacity",1)
  }


  /**
   * UPDATE FUNCTIONS
   *
   * These will be called within a section
   * as the user scrolls through it.
   *
   * We use an immediate transition to
   * update visual elements based on
   * how far the user has scrolled
   *
   */
   function updateYaxis(){
    g.selectAll(".y.axis")
      .transition()
      .duration(750)
      .ease("sin-in-out")
      .call(yBarScale)
    }

    // function updateMyanmar(){
    // g.selectAll(".y.axis")
    //   .transition()
    //   .duration(750)
    //   .call(yAxisBar)
    // }




  /**
   * DATA FUNCTIONS
   *
   * Used to coerce the data into the
   * formats we need to visualize
   *
   */
   /**

  /**
   * getData - maps raw data to
   * array of data objects. There is
   * one data object for each word in the speach
   * data.
   *
   * This function converts some attributes into
   * numbers and adds attributes used in the visualization
   *
   * @param rawData - data read in from file
   */
   function getData(rawData){
    return rawData.map(function(d){
      d.year = parseDate(d.year)
      d.value = +d.value;
      return d;
    });
   }

   function dataFilter(lineData, country){
    return lineData.filter(
        function(d){return d.country != "Total" && d.recipient == country;}
        )
        return d;
   }










  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function(index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function(i) {
      activateFunctions[i]();

    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function(index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};


/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */
function display(data) {
  // create a new plot and
  // display it

  // console.log(data)
  var plot = scrollVis();
  d3.select("#vis")
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function(index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function(index, progress){
    plot.update(index, progress);
  });
}


// load data and display
d3.csv("data/master-clean.csv", display);

