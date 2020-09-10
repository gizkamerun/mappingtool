/**
 * INSPINIA - Responsive Admin Theme
 *
 */
// helpers 
function countObj(obj) { return Object.keys(obj).length; }

/**
 * MainCtrl - controller
 */
function MainCtrl($scope, MapService) {

    this.userName = 'Demo User';
    this.helloText = 'Welcome to the interactive map service of GIZ Cameroon';
    this.descriptionText = 'Learn more about GIZ Projects and activities in Cameroon, Chad, Gabon, DCR, Sao Tome & Pricipe.';
    this.projects = [];
    this.security_markers = [];
    this.incidents = [];


    this.query = "";

    // MapService.getMapUuid().then(function(response){
    //      $scope.maps = response; 
    //      console.log("hey",  this.maps); 
    //  }); 



    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        }
    });
};

function UsermapCtrl($scope) {

    this.userName = 'Demo User';
    this.helloText = 'Welcome to the interactive map service of GIZ Cameroon';
    this.descriptionText = 'Learn more about GIZ Projects and activities in Cameroon, Chad, Gabon, DCR, Sao Tome & Pricipe.';
    this.projects = [];
    this.security_markers = [];
    this.incidents = [];
    this.query = "";

    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        }
    });

    $scope.$on("leafletDirectiveMap.click", function(event, args) {
        var leafEvent = args.leafletEvent.latlng;
        console.log("Add a nmarker!!! 21321321 ");

        console.log(leafEvent);
        $scope.new_markers = {
            lat: leafEvent.lat,
            lng: leafEvent.lng,
            message: "My Added Marker"
        };

        var points = [];
        points.push($scope.new_markers);


        angular.extend($scope, {
            markers: { loc0: $scope.new_markers }
        });
    });

};
/**
 * modalDemoCtrl - Controller used to run modal view
 * used in Basic form view
 */
function ModalCtrl($scope, $uibModal) {
    this.project_data = {};

    $scope.open = function() {
        console.log($scope);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/common/modal_tmlp.html',
            controller: ModalInstanceCtrl

        });

        console.info("Click !!! ");
    };

    $scope.open1 = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example.html',
            controller: ModalInstanceCtrl
        });
    };

    $scope.open2 = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example.html',
            controller: ModalInstanceCtrl,
            windowClass: "animated fadeIn"
        });
    };

    $scope.open3 = function(size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example.html',
            size: size,
            controller: ModalInstanceCtrl
        });
    };

    $scope.open4 = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example.html',
            controller: ModalInstanceCtrl,
            windowClass: "animated flipInY"
        });
    };
};

function ModalInstanceCtrl($scope, $uibModalInstance) {

    $scope.ok = function() {
        $uibModalInstance.close();
    };

    $scope.cancel = function() {
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
    $scope.countData = countObj;
    var vm = this;
    // this.userName = 'Demo User';
    // this.helloText = 'Welcome to the interactive map service of GIZ Cameroon';
    // this.descriptionText = 'Learn more about GIZ Projects and activities in Camroon, Chad, Gabon, DCR, Sao Tome & Pricipe.';
    //this.projects = [];
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function(win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.projectdetails = function(project) {
        $scope.project = project;
        vm.project = project;
        // console.log(project);

        $scope.open = function() {
            console.log($scope);

            var modalInstance = $uibModal.open({
                templateUrl: 'views/project.details.html',
                scope: $scope,
                controller: ModalInstanceCtrl,

            });
            //$scope.$resolve = {_project: project};
            //console.info("Click !!! ");
        };
        $scope.open('lg');


    };

    // Add Markers after map is loaded 
    $scope.fetchProjects = function() {
        //$http.get("js/data.geo.json").success(function(data, status) {
        $http.get(config_data.apiUrl + "/projects.json").success(function(data, status) {
            $scope.projects = data.projects;
            MainCtrl.projects = data.projects;

        });
    };

    vm.projectList = $scope.fetchProjects().then();

};

function MapCtrl(config_data, $scope, $uibModal, $http, MapService) {



    $scope.projectdetails = function(event) {
        $scope.event = event;
        // console.log(project);

        $scope.open = function() {
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




    var mypointer = {
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
            attributionControl: true,
            tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            //tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            tileLayerOptions: {
                opacity: 0.7,
                detectRetina: true,
                reuseTiles: true,
                attribution: '© Leaflet / GIZ GmbH |  <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            },
            icon: {
                // url: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png',
                // retinaUrl: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon@2x.png',
                url: 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-star-solid&size=50&hoffset=0&voffset=-1',
                retinaUrl: 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-star-solid&size=50&hoffset=0&voffset=-1',
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
                        maxClusterRadius: 7, // <<------------------ Modify here.
                        attribution: '&copy; <a href="http://www.openfiremap.org">OpenFireMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
                message: "<em>My pointer </em><br> ",
                icon: {
                    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    iconSize: [40, 40],
                },
                focus: false,
                draggable: true
            },

            bry: {
                layer: "GIZ_Office_Cameroun",
                message: "<em>GIZ Regional Office</em><br><small>PN: xxx-xxxx-x</small>",
                icon: {
                    iconUrl: 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-star-solid&size=50&hoffset=0&voffset=-1', //'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Azure.png',
                    iconSize: [40, 40],
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
        $http.get(config_data.apiUrl + "/points/.json").success(function(data, status) {
            $scope.datapoints = data;
            $scope.regions = data.regions;
            angular.extend($scope, {
                markers: data.pointers
            });

        });


    };

    $scope.setCurrentfilter = function(filter = 'none') {
        $scope.myfilter = filter;
    };

    $scope.getMarker = function(id) {
        //$http.get("js/data.geo.json").success(function(data, status) {
        $http.get(config_data.apiUrl + "/points/a/" + id + ".json").success(function(data, status) {
            $scope.datapoints = data;
            $scope.regions = data.regions;
            $scope.setCurrentfilter($scope.regions[id]);
            angular.extend($scope, {
                markers: data.pointers
            });

        });


    };

    $scope.addMarkers();



};

function SecurityCtrl(config_data, $scope, $uibModal, $http, leafletBoundsHelpers) {


    var mycenter = {
        lat: 3.96632600024569,
        lng: 11.5500640869141,
        zoom: 6
    };
    var maxbounds = leafletBoundsHelpers.createBoundsFromArray([
        [10.2068130724846, 14.96337890625],
        [3.44762466664687, 10.26123046875]
    ]);

    maxbounds.pad = 1.0;

    // setup map 
    angular.extend($scope, {


        bounds: maxbounds,

        defaults: {
            maxZoom: 17,
            minZoom: 5,
            doubleClickZoom: false,
            scrollWheelZoom: true,
            attributionControl: true,
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
            events: {}
        },
        center: {
            lat: 7.40604771707627,
            lng: 15.22705078125, //11.50921,
            zoom: 6
        },
        pointer: mycenter,

        layers: {
            overlays: {
                AOG_Attack_on_Cicilians: {
                    name: "AOG Attack on Cicilians",
                    type: "markercluster",
                    visible: true,
                    layerOptions: {
                        maxClusterRadius: 5, // <<------------------ Modify here.
                        attribution: '&copy; <a href="http://www.openfiremap.org">OpenFireMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

                    }
                },

                Direct_Attacks: {
                    name: "Direct Attacks",
                    type: "markercluster",
                    visible: true,
                    layerOptions: {
                        maxClusterRadius: 2, // <<------------------ Modify here.
                        attribution: '&copy; <a href="http://www.openfiremap.org">OpenFireMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                },
                Criminality: {
                    name: "Criminality",
                    type: "markercluster",
                    visible: true,
                    layerOptions: {
                        maxClusterRadius: 7, // <<------------------ Modify here.
                        attribution: '&copy; <a href="http://www.openfiremap.org">OpenFireMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                }

            },
            baselayers: {
                // OpenStreetMap: {
                //     name: 'OpenStreetMap (XYZ)',
                //     url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                //     type: 'xyz'
                // },
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
            loc1: {
                lat: 10.9710601,
                lng: 13.9093499,
                layer: "AOG_Attack_on_Cicilians",
                region: "EN",
                division: "Mayo Tsanaga",
                subdivision: "Mayo Moskota",
                size: 1,
                sources: "Individuelle",
                message: "BH ont tu? un civil de mozogo ? la machette et battu 3 femmes.",
                location: "Mozogo",
                date: "07\/09\/2019"
            }


        }

    });

    // Event Handler 
    // $scope.$on("leafletDirectiveMap.click", function(event, args){
    //     var leafEvent = args.leafletEvent;

    //     // $scope.markers.push({
    //     //     lat: leafEvent.latlng.lat,
    //     //     lng: leafEvent.latlng.lng,
    //     //     message: "My Added Marker"
    //     // });

    //     console.log("Add new MArker on Click !!! ");


    // });

    // Add Markers after map is loaded 
    $scope.initMarkers = function() {
        //$http.get("js/data.geo.json").success(function(data, status) {
        var maxbounds = leafletBoundsHelpers.createBoundsFromArray([
            [10.2068130724846, 14.96337890625],
            [3.44762466664687, 10.26123046875]
        ]);

        maxbounds.pad = 1.0;

        $http.get(config_data.apiUrl + "/demo_incidents.json").success(function(data, status) {
            $scope.datapoints = data;
            MainCtrl.security_markers = data.points;
            this.incidents = $scope.datapoints.points || [];
            angular.extend($scope, {
                events: {},
                bounds: maxbounds,
                enable: ['dragend'],
                logic: 'emit',
                markers: MainCtrl.security_markers
            });

        });

        // $scope.$on("leafletDirectiveMap.click", function(event, args){
        //     var leafEvent = args.leafletEvent;
        //     MainCtrl.security_markers.push({
        //         lat: leafEvent.latlng.lat,
        //         lng: leafEvent.latlng.lng,
        //         message: "New Incident Marker"
        //     });

        //     angular.extend($scope, {
        //         events: {}, 
        //         bounds: maxbounds,
        //         markers: MainCtrl.security_markers
        //         });


        // });


    };

    $scope.countData = function(obj) { return Object.keys(obj).length; };

    $scope.initMarkers();

    $scope.renderMarkers = function(dataset) {
        console.log("New markers");
        console.log(dataset);
        this.incidents = dataset;
        MainCtrl.security_markers = this.incidents;

        angular.extend($scope, {
            events: {},
            bounds: maxbounds,
            markers: dataset

        });


    };


    $scope.updateMarkers = function(filename) {
        //$http.get("js/data.geo.json").success(function(data, status) {
        $http({
            method: 'get',
            url: config_data.apiUrl + "/incidents?file=" + filename,
            //data: filename,
            headers: { 'Content-Type': undefined },
        }).then(function successCallback(response) {
            // Store response data
            console.log(response);
            $scope.response = response.data.points;
            this.incidents = response.data.points;
            $scope.incidents = response.data.points;
            //$scope.loaded_file = response.data[0].saved_as; 
            $scope.renderMarkers(response.data.points);




        });
    };

    $scope.setSecMarker = function(id) {
        //$http.get("js/data.geo.json").success(function(data, status) {
        $http.get(config_data.apiUrl + "/points/a/" + id + ".json").success(function(data, status) {
            $scope.datapoints = data;
            $scope.regions = data.regions;
            $scope.setCurrentfilter($scope.regions[id]);
            angular.extend($scope, {
                markers: data.pointers
            });

        });


    };



    $scope.loadMarkers = function() {
        //action = "http://localhost/mappingtool/public/upload/load_data" method = "post"
        var fd = new FormData();
        var files = document.getElementById('fileToUpload').files[0];
        fd.append('file', files);
        console.log('load!!!');


        $http({
            method: 'post',
            //url: config_data.apiUrl + '/load_data',
            // url: "https://imap.dday.site" + 'upload/load_data',
            url: "http://localhost/mappingtool/public/upload",
            data: fd,
            headers: { 'Content-Type': undefined },
        }).then(function successCallback(response) {
            // Store response data
            console.log(response.data[0].saved_as);
            $scope.response = response.points;
            $scope.loaded_file = response.data[0].saved_as;
            setTimeout(function() {
                $scope.updateMarkers(response.data[0].saved_as);
            }, 3000);



        });




    };

}

function datatablesCtrl($scope, DTOptionsBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function(win) {
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

function usercrudCtrl($scope, $http, ProjectService, config_data) {

    angular.extend($scope, {
        // tiles: {
        //     url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        //     options: {
        //         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //     }
        // },
        // layers: {
        //     overlays: {
        //         AOG_Attack_on_Cicilians: {
        //             name: "AOG Attack on Cicilians",
        //             type: "markercluster",
        //             visible: true,
        //             layerOptions: {
        //                 maxClusterRadius: 5, // <<------------------ Modify here.
        //                 attribution: '&copy; <a href="http://www.openfiremap.org">OpenFireMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

        //             }
        //         },

        //         Direct_Attacks: {
        //             name: "Direct Attacks",
        //             type: "markercluster",
        //             visible: true,
        //             layerOptions: {
        //                 maxClusterRadius: 2, // <<------------------ Modify here.
        //                 attribution: '&copy; <a href="http://www.openfiremap.org">OpenFireMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //             }
        //         },
        //         Criminality: {
        //             name: "Criminality",
        //             type: "markercluster",
        //             visible: true,
        //             layerOptions: {
        //                 maxClusterRadius: 7, // <<------------------ Modify here.
        //                 attribution: '&copy; <a href="http://www.openfiremap.org">OpenFireMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //             }
        //         }

        //     },
        //     baselayers: {
        //         // OpenStreetMap: {
        //         //     name: 'OpenStreetMap (XYZ)',
        //         //     url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        //         //     type: 'xyz'
        //         // },
        //         // cloudmade: {
        //         //     name: 'GIZ Portfolio',
        //         //     type: 'xyz',
        //         //     url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
        //         //     layerParams: {
        //         //         key: '007b9471b4c74da4a6ec7ff43552b16f',
        //         //         styleId: 7
        //         //     }
        //         // },
        //         ArcGIS: {
        //             name: 'ArcGIS',
        //             url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        //             type: 'xyz'
        //         }

        //     }

        // },

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
                        maxClusterRadius: 7, // <<------------------ Modify here.
                        attribution: '&copy; <a href="http://www.openfiremap.org">OpenFireMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
        center: {
            lat: 7.40604771707627,
            lng: 15.22705078125, //11.50921,
            zoom: 6
        },
        events: {}
    });

    $scope.markers = new Array;
    $scope.newmarkers = new Array;
    $scope.currentMarker = {};
    $scope.myList = [];
    this.projects = [];
    $http.get(config_data.apiUrl + "/projects.json")
        .then(function(response) {
            this.projects = response.projectList;
        });
    var vm = this;
    vm.currentMarker = $scope.currentMarker;
    // ProjectService.getProjectList.then(function(data) {
    vm.ignit = function() {
        ProjectService.getProjectList()
            .success(function(response) {
                vm.projects = $scope.projects = response.projectList;
            })
            .error(function(msg) {
                console.error(msg);
            });
        console.log("Fetching Proj DATA !!! ");


        // Loading Deafults 
        initMarkers();
    }

    vm.ignit();


    // });

    $scope.$on("leafletDirectiveMap.mousedown", function(event, args) {
        var mouseButton = args.leafletEvent.originalEvent.button;

        if (mouseButton == 2) { // Right button
            var latlng = args.leafletEvent.latlng;
            reverseGeocoding(latlng);
        }
    });

    function reverseGeocoding(latlng) {
        var urlString = "http://nominatim.openstreetmap.org/reverse?format=json&lat=" + latlng.lat + "&lon=" + latlng.lng + "&zoom=18&addressdetails=1";
        $http.get(urlString)
            .then(addMarker);
    }

    // Add Markers after map is loaded 
    function initMarkers() {
        //$http.get("js/data.geo.json").success(function(data, status) {
        $http.get(config_data.apiUrl + "/points/.json").success(function(data, status) {
            $scope.datapoints = data;
            $scope.regions = data.regions;
            angular.extend($scope, {
                // markers: data.pointers
            });

        });


    };

    function addMarker(response) {
        var marker = {
            lat: parseFloat(response.data.lat),
            lng: parseFloat(response.data.lon),
            project: {},
            message: "Activity title",
            dueDate: new Date(),
            postalAddress: response.data.display_name
        };
        $scope.markers.push(marker);
        $scope.newmarkers.push(marker);
        vm.currentMarker = $scope.currentMarker = marker;
    }

    $scope.showInfo = function(index) {
        vm.currentMarker = $scope.currentMarker = $scope.newmarkers[index];

    }

    $scope.updateCurrentMarker = function(indexCurrentMarker) {
        $scope.currentMarker.focus = false;
        $scope.currentMarker = $scope.newmarkers[indexCurrentMarker];
        $scope.currentMarker.focus = true;
        vm.currentMarker = $scope.currentMarker;
    }

    $scope.removeMark = function(index) {
        if ($scope.newmarkers[index] === $scope.currentMarker) {
            $scope.currentMarker = {};
            $scope.currentMarker.focus = false;
            vm.currentMarker = $scope.currentMarker;
        }
        $scope.newmarkers.splice(index, 1);
    }

    $scope.store = function() {
        if ($scope.newmarkers.length > 0) {
            console.table($scope.newmarkers);

            console.info("passing data :" + $scope.newmarkers[$scope.newmarkers.length - 1]);

        }
        console.info();
        // empty
        $scope.newmarkers = [];
    }

}


angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('ModalCtrl', ModalCtrl)
    .controller('MapCtrl', MapCtrl)
    .controller('UsermapCtrl', UsermapCtrl)
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)
    .controller('ProjectCtrl', ProjectCtrl)
    .controller('SecurityCtrl', SecurityCtrl)
    .controller('datatablesCtrl', datatablesCtrl)
    .controller('usercrudCtrl', usercrudCtrl);