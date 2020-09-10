// services.js 

// Get Maps 
function MapService($http, config_data) {

    function getMapUuid($uuid) {
        $http({
            method: 'get',
            url: config_data.apiUrl + "/api/maps_by_uuid/",
            //data: filename,
            headers: { 'Content-Type': "application/json" },
        });
    }

    function getMap($id) {
        $http({
            method: 'get',
            url: config_data.apiUrl + "/maps/",
            //data: filename,
            headers: { 'Content-Type': "application/json" },
        }).then(function successCallback(response) {
            // Store response data
            // console.log(response);
            return response.maps;
        });
    }

    return {
        getMapUuid: getMapUuid,
        getMap: getMap

    };
}

// Get Projects 
function ProjectService($http, config_data) {


    var getProjectList = function() {
        return $http.get(config_data.apiUrl + "/projects.json");
        // .then(function(response) {
        //     return response.projectList;
        // })
        // .then(function(error) {
        //     console.log(error);
        //     return error;
        // })
    };
    // var getBooks = function() {
    //     $http.get("http://localhost/fuel-spa/public/api/v1/books")
    //         .then(function(response) {
    //             return response.data;
    //         })
    //         .then(function(error) {
    //             console.log(error);
    //             return error;
    //         })
    //     };

    return {
        getProjectList: getProjectList

    };



}


// module.service('MyService', function() {
// 	this.method1 = function() {
// 			//..
// 		}

// 	this.method2 = function() {
// 			//..
// 		}
// });

angular
    .module('inspinia')
    .factory('MapService', MapService)
    .factory('ProjectService', ProjectService);
//.service('MarkerService', MakerService);