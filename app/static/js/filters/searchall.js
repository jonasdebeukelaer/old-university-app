'use strict';

/**
 * @ngdoc filter
 * @name yomantutApp.filter:searchAll
 * @function
 * @description
 * # searchAll
 * Filter in the yomantutApp.
 */
angular.module('unisalad')
  .filter('searchAll', function () {
    return function(input, searchText){
      var returnArray = [];
      if(searchText != ''){
        console.log(searchText);
       	var searchTextSplit = searchText.toLowerCase().split(' ');
          for(var x = 0; x < input.length; x++){
            var count = 0;
            for(var y = 0; y < searchTextSplit.length; y++){
              
              if(input[x]['item'].toLowerCase().indexOf(searchTextSplit[y]) !== -1 
                || input[x]['meet'].toLowerCase().indexOf(searchTextSplit[y]) !== -1 
                || input[x]['user'].toLowerCase().indexOf(searchTextSplit[y]) !== -1){
                  count++;
                }
            }
              if(count == searchTextSplit.length){
                returnArray.push(input[x]);   
            }
          }
          return returnArray;
 		} else{
 			
            return input;
 		}
    }
  });
