/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($scope) {

    this.userName = 'Demo User';
    this.helloText = 'Welcome to the interactive map service of GIZ Cameroon';
    this.descriptionText = 'Learn more about GIZ Projects and activities in Cameroon, Chad, Gabon, DCR, Sao Tome & Pricipe.';
    this.projects = [];
    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        }
    });
};

/**
 * modalDemoCtrl - Controller used to run modal view
 * used in Basic form view
 */
function ModalCtrl($scope, $uibModal) {
    this.project_data = {};

    $scope.open = function (  ) {
        console.log($scope);
 
        var modalInstance = $uibModal.open({
            templateUrl: 'views/common/modal_tmlp.html',
             controller: ModalInstanceCtrl
              
        });

        console.info("Click !!! ");
    };

    $scope.open1 = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example.html',
            controller: ModalInstanceCtrl
        });
    };

    $scope.open2 = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example.html',
            controller: ModalInstanceCtrl,
            windowClass: "animated fadeIn"
        });
    };

    $scope.open3 = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example.html',
            size: size,
            controller: ModalInstanceCtrl
        });
    };

    $scope.open4 = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example.html',
            controller: ModalInstanceCtrl,
            windowClass: "animated flipInY"
        });
    };
};

function ModalInstanceCtrl ($scope, $uibModalInstance) {

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    //this.project = $scope._project;


    $scope.states = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ];

};

// Fetch Projects data
function ProjectCtrl(config_data, $scope, $uibModal, $http, DTOptionsBuilder) {
    var vm = this;
    // this.userName = 'Demo User';
    // this.helloText = 'Welcome to the interactive map service of GIZ Cameroon';
    // this.descriptionText = 'Learn more about GIZ Projects and activities in Camroon, Chad, Gabon, DCR, Sao Tome & Pricipe.';
    //this.projects = [];
    $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withDOM('<"html5buttons"B>lTfgitp')
                .withButtons([
                    {extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},

                    {extend: 'print',
                        customize: function (win){
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ]);

    $scope.projectdetails = function(project){
        $scope.project = project;
        // console.log(project);

        $scope.open = function (  ) {
            console.log($scope);
    
            var modalInstance = $uibModal.open({
                templateUrl: 'views/common/modal_tmlp.html',
                scope: $scope,
                controller: ModalInstanceCtrl,
               
            });
            //$scope.$resolve = {_project: project};
            //console.info("Click !!! ");
        };
        $scope.open('sm');
         

    };

    // Add Markers after map is loaded 
    $scope.fetchProjects = function() {
        //$http.get("js/data.geo.json").success(function(data, status) {
        $http.get(config_data.apiUrl_local + "/projects.json").success(function(data, status) {
            $scope.projects = data.projects;
            MainCtrl.projects = data.projects;
        
        });
    };

    $scope.fetchProjects();
};

function MapCtrl(config_data, $scope, $uibModal, $http) {

    $scope.projectdetails = function(event ){
         $scope.event = event;
        // console.log(project);

        $scope.open = function (  ) {
            console.log($scope);
    
            var modalInstance = $uibModal.open({
                templateUrl: 'views/common/modal_tmlp.html',
                scope: $scope,
                controller: ModalInstanceCtrl,
               
            });
            //$scope.$resolve = {_project: project};
            console.info("Click !!! ");
        };
        $scope.open('sm');
         

    };


    var mypointer =  {
        lat: 3.96632600024569,
            lng: 11.5500640869141,
        zoom: 6
    };

var datapoints = {};
    
    // setup map 
    angular.extend($scope, {
        defaults: {
            maxZoom: 17,
            minZoom: 5,
            doubleClickZoom: false,
            scrollWheelZoom: true,
            attributionControl: false,
            tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            //tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            tileLayerOptions: {
                opacity: 0.7,
                detectRetina: true,
                reuseTiles: true,
                attribution: '© Leaflet / GIZ GmbH |  <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            },
            icon: {
                url: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png',
                retinaUrl: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon@2x.png',
                size: [25, 41],
                anchor: [12, 40],
                popup: [0, -40],
                shadow: {
                    url: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-shadow.png',
                    retinaUrl: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-shadow.png',
                    size: [41, 41],
                    anchor: [12, 40]
                }
            },
            center: {
            lat: 3.8404,
            lng: 13.80521,
            zoom: 6
            },
        },
        center: {
            lat: 7.40604771707627,
            lng: 15.22705078125, //11.50921,
            zoom: 6
        },
        pointer: mypointer,

        layers: {
            overlays: {
                GIZ_Office_Cameroun: {
                    name: "GIZ Country Office",
                    type: "markercluster",
                    visible: true,
                    layerOptions: {
                        maxClusterRadius: 7 // <<------------------ Modify here.
                    }
                },

                Projects: {
                    name: "Project HQ",
                    type: "markercluster",
                    visible: true,
                    layerOptions: {
                        maxClusterRadius: 7 // <<------------------ Modify here.
                    }
                },
                Antenna: {
                    name: "Antenna",
                    type: "markercluster",
                    visible: true,
                    layerOptions: {
                        maxClusterRadius: 7 // <<------------------ Modify here.
                    }
                }

            },
            baselayers: {
                OpenStreetMap: {
                    name: 'OpenStreetMap (XYZ)',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    type: 'xyz'
                },
                // cloudmade: {
                //     name: 'GIZ Portfolio',
                //     type: 'xyz',
                //     url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
                //     layerParams: {
                //         key: '007b9471b4c74da4a6ec7ff43552b16f',
                //         styleId: 7
                //     }
                // },
                ArcGIS: {
                    name: 'ArcGIS',
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
                    type: 'xyz'
                }
                
            }

        },
        markers: {
            pointer: {
                layer: "GIZ_Office_Cameroun",
                lat: 3.96632600024569,
                lng: 11.5500640869141,
                message: "<em>My pointer </em><br> " ,
                icon: {
                        iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        iconSize: [ 40, 40 ],
                    },
                focus: false,
                draggable: true
            },
            
            bry: {
                layer: "GIZ_Office_Cameroun",
                message: "<em>GIZ Regional Office</em><br><small>PN: xxx-xxxx-x</small>",
                icon: {
                        iconUrl: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Azure.png',
                        iconSize: [ 32, 32 ],
                    },
                focus: false,
                lat: 3.8952335923458854,
                lng: 11.515187719746109
            }
        }
    });

    // Add Markers after map is loaded 
    $scope.addMarkers = function() {
        //$http.get("js/data.geo.json").success(function(data, status) {
        $http.get(config_data.apiUrl + "/points.json").success(function(data, status) {
            datapoints_xhr = data;
            angular.extend($scope, {
                markers: data.pointers
                });
        
        });
    };

    $scope.addMarkers();

};

function datatablesCtrl($scope,DTOptionsBuilder){

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
     

}


angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('ModalCtrl', ModalCtrl)
    .controller('MapCtrl', MapCtrl)
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)
    .controller('ProjectCtrl', ProjectCtrl)
    .controller('datatablesCtrl', datatablesCtrl)