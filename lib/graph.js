var graphs = {};

graphs.UndirectedGraph = function(){
  this.graph = {};
};

graphs.UndirectedGraph.prototype ={
  addVertex : function(vertex){
    this.graph[vertex] = this.graph[vertex] || [];
  },
  addEdge : function(from,to){
    if(!this.graph[from])return;
    if(!this.graph[to])this.addVertex(to);
    this.graph[from].push(to);
    this.graph[to].push(from);
    this.edges ++;
  },
  hasEdgeBetween : function(vertex,edge){
    return this.graph[vertex].indexOf(edge)>=0;
  },
  order : function(){
    return Object.keys(this.graph).length;
  },
  size : function(){
    var graph =this.graph;
    return Object.keys(graph).reduce(function(prev_value,next_value){
      return prev_value + (graph[next_value].length)/2;
    },0)
  },
  pathBetween : function(from,to,visiting){
    visiting = visiting || [];
    if(from == to) return visiting.concat(from);
    for(var index in this.graph[from]){
      var vertex = this.graph[from][index];
      if(visiting.indexOf(vertex)== -1){
        var visited = this.pathBetween(vertex,to,visiting.concat(from));
        if(visited[visited.length -1]==to) return visited;
      }
    }
    return [];
  },
  farthestVertex : function(vertex){
    var count = 0;
    var farthest_vertex;
    for(var index in this.graph){
    var result = this.pathBetween(vertex,index);
      if(count < result.length){
        count = result.length,farthest_vertex = index;
      }
    }
    return farthest_vertex;
  }
};

graphs.DirectedGraph = function(){
  this.graph = {};
};

graphs.DirectedGraph.prototype ={
  addVertex : function(vertex){
    this.graph[vertex] = this.graph[vertex] || [];
  },
  addEdge : function(vertex,edge){
    this.graph[vertex].push(edge);
  },
  hasEdgeBetween : function(vertex,edge){
    return this.graph[vertex].indexOf(edge)>=0;
  },
  order : function(){
    return Object.keys(this.graph).length;
  },
  size : function(){
    var graph =this.graph;
    return Object.keys(graph).reduce(function(prev_value,next_value){
      return prev_value + graph[next_value].length;
    },0)
  },
  pathBetween : function(from,to,visiting){
    visiting = visiting || [];
    if(from == to) return visiting.concat(from);
    for(var index in this.graph[from]){
      var vertex = this.graph[from][index];
      if(visiting.indexOf(vertex)== -1){
        var visited = this.pathBetween(vertex,to,visiting.concat(from));
        if(visited[visited.length -1]==to) return visited;
      }
    }
    return [];
  }
};

module.exports = graphs;
