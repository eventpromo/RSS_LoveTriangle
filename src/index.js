/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */

function intersect(a, b) {
  return a.filter(x => new Set(b).has(x));
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
  var graph = getGraph(preferences);
  var arrays = [];
  graph.forEach(function(value, key, map){
    value.add(key);
    arrays.push([...value]);
  })
  arrays = arrays.filter(function(i){
    return i.length >= 3;
  }); 
  var triangles = new Set();   
  for(let i = 0; i < arrays.length - 1; i++){
    for(let j = i + 1; j < arrays.length; j++){
      var elements = intersect(arrays[i], arrays[j]).sort();
        if(elements.length == 3){
          triangles.add(getId(elements))            
        }  
    }
  }
  return triangles.size;
};
