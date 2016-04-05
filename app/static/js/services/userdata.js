'use strict';

angular.module('unisalad')
  .service('userData', ['$cookies', '$http', function ($cookies, $http) {
    this.hash = $cookies.get('hash')
    this.email = "empty@none.co.uk"
  	this.userId = 103912
  	this.forename = "forename"
  	this.surname = "surname"
  	this.university = "my uni"
  	this.picSrc = "images/user" + this.userId + "/picture.png"
  	this.postIds = [ "4", "41", "42", "8"]
  	this.posts = [
  		{
        "type": "ticket",
        "id": 4,
        "title": "crisis ticket",
        "postDate": "2015-02-22",
        "user": "Bob toodd",
        "number": 1,
        "cost": 12,
        "meet": "Lentonn pick up",
        "eventDate": "2015-03-19",
        "extraInfo": "Extra info about the ticket goes here"
      },
      {
        "type": "general",
        "id": 41,
        "title": "This is highly anon",
        "postDate": "2015-03-01",
        "pics": [],
        "extraInfo": "very sneaky post"
      }
  	]
    
    $http.defaults.headers.common.Authorization = this.email + "=" + this.password;
  }]);