/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/main");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Portofolio GIZ CM' }
        })
        .state('index.projects', {
            url: "/projects",
            templateUrl: "views/projects.html",
            data: { pageTitle: 'Projects' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.stats', {
            url: "/stats",
            templateUrl: "views/stats_cm.html",
            data: { pageTitle: 'GIZ in Cameroon Data' }
        })
        .state('index.aboutgizcm', {
            url: "/aboutgizcm",
            templateUrl: "views/aboutcmr.html",
            data: { pageTitle: 'About GIZ in Cameroon' }
        })
        .state('index.aboutgizcd', {
            url: "/aboutgizcd",
            templateUrl: "views/aboutchad.html",
            data: { pageTitle: 'About GIZ in Chad' }
        })
}
angular
    .module('inspinia')
    .constant('config_data', {  
        apiUrl: 'https://apps.lit-solutions.site/mappingtool/public/api',
        apiUrl_local: 'http://localhost/mappingtool/public/api',
        //baseUrl: '/',
        enableDebug: true
      })
    .config(config)
    
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
