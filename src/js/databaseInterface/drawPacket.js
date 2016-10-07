const d3 = require("d3");
const textures = require("textures");

function draw( domElement, packet ){
    var t = textures
        .lines()
        .lighter()
        .thicker()
        .stroke("orange");

    var svg = d3.select(domElement)
        .append("svg")
        .attr("width","100%")
        .attr("height","100%")
        .attr("viewBox", "0 0 100 100")
        .attr("preserveAspectRatio", "none")
        .attr("class","headerVisContainer");


    //Append Dest Mac address
    svg.call(t)
        .append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width","100")
        .attr("height","25")
        .style("fill",t.url());
    svg.call(t)
        .append("rect")
        .attr("x",0)
        .attr("y",25)
        .attr("width","50")
        .attr("height","25")
        .style("fill",t.url());
    //Append Src Mac address
    svg.append("rect")
        .attr("x",50)
        .attr("y",25)
        .attr("width","50")
        .attr("height","25");
    svg.append("rect")
        .attr("x",0)
        .attr("y",50)
        .attr("width","100")
        .attr("height","25");

}

module.exports.draw = draw;
