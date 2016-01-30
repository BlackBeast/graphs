var graphs = {};

graphs.Edge= function(edge_name,from,to,weight){
  this.edge_name = edge_name;
  this.from = from;
  this.to = to;
  this.weight = weight;
};

graphs.WeightedGraph = function(){
  this.graph = {};
};

var createDistance = function(vertices,from){
  var distance={};
  vertices.forEach(function (vertex){
    distance[vertex] = Infinity;
  })
  distance[from] = 0;
  return distance;
};

var minimalValuedVertex = function (vertices,distance){
  return vertices.reduce(function (leastWeighted,vertex) {
      if(distance[leastWeighted] < distance[vertex]){
        return leastWeighted;
      }
      return vertex;
  })
};

var getPath = function (from,to,parent,reversedPath){
  var reversedPath = reversedPath || [];
  if(parent[to] == from){
    var path = reversedPath.reverse();
    return path;
  }
  return getPath(from,parent[to].from,parent,reversedPath.concat(parent[to]));
};

graphs.WeightedGraph.prototype ={
  addVertex : function(vertex){
    this.graph[vertex] = this.graph[vertex] || [];
  },
  addEdge : function(edge){
    this.graph[edge.from].push(edge);
  },
  shortestPath : function(from,to){
    var vertices = Object.keys(this.graph);
    var edges = Object.assign({},this.graph);
    var distance = createDistance(vertices,from);
    var parent = {};
    parent[from] = from;
    while(vertices.length){
        var currVertex = minimalValuedVertex(vertices,distance);
        for (edge of edges[currVertex]) {
          var currWeight = distance[currVertex]+edge.weight;
          if(currWeight <= distance[edge.to]){
            distance[edge.to] = currWeight;
            parent[edge.to] = edge;
          }
        }
        delete edges[currVertex];
        vertices.splice(vertices.indexOf(currVertex),1);
    }
    return getPath(from,to,parent);
  }
};

module.exports =graphs;
