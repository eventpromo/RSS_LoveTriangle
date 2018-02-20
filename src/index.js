/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */

function intersect(a, b) {
  return [...a].filter(x => b .has(x));
}

function getGraph(preferences = []){
  var graph = new Map();

  for(let i = 0; i < preferences.length; i++){
    if(preferences[i] <= 0){
      continue;
    }     
    
    var firstLover = i + 1;
    var secondLover = preferences[i];   
    
    if(!graph.has(firstLover)){
      graph.set(firstLover, new Set());
    }
    
    if(!graph.has(secondLover)){
      graph.set(secondLover, new Set());      
    }   
    
    graph.get(firstLover).add(secondLover);   
    graph.get(secondLover).add(firstLover); 
  }
  
  return graph;
}

function getId(elements){
  return elements.join('.');
}

module.exports = function getLoveTrianglesCount(preferences = []) {
  var graph = getGraph(preferences)  
  var triangles = new Set();
  for(let [key, [...set]] of graph) { 
    var first = new Set([key, ...set]);
    if(first.size >= 2){      
      set.forEach(function(i){ 
        var nextSet = graph.get(i); 
        var next = new Set([i, ...nextSet]);      
        var elements = intersect(first, next).sort();
        if(elements.length == 3){
          triangles.add(getId(elements))            
        }                         
      })
    }    
  }
  return triangles.size;
};
