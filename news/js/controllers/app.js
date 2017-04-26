var newsApp = angular.module('newsApp', ['ngRoute', 'ngStorage'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix("");

        $routeProvider.when("/", {
            templateUrl: "template/home.html",
            controller: 'HomeCtrl'
        });
        $routeProvider.when("/category/:category", {
            templateUrl: "template/source.html",
            controller: 'SourceCtrl'
        });
        $routeProvider.when("/featured", {
            templateUrl: "template/featured.html",
            controller: 'FeaturedNewsCtrl'
        });
        $routeProvider.when("/addition", {
            templateUrl: "template/addition.html",
            controller: 'AdditionNewsCtrl'
        });
        $routeProvider.when("/category/:category/source/:source", {
            templateUrl: "template/news.html",
            controller: 'NewsDetailCtrl'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    })

    .controller('CategoryCtrl', function ($scope) {
        $scope.categoryes = ['business', 'entertainment',
            'gaming', 'general',
            'music', 'politics',
            'science-and-nature',
            'sport', 'technology'];
    })

    .controller('HomeCtrl', function ($scope, $http, $routeParams) {
        $http.get(" https://newsapi.org/v1/sources")
            .then(function (response) {
                $scope.fullInfo = response.data;
            });
    })

    .controller('SourceCtrl', function ($scope, $http, $routeParams, $localStorage) {
        $scope.category = $routeParams.category;

        $http.get("https://newsapi.org/v1/sources?category=" + $scope.category)
            .then(function (response) {
                $scope.categoryInfo = response.data.sources;
            });

        if (!$localStorage.featured) {
            $localStorage.featured = [];
        }
        $scope.save = function (name) {
            var isElem = $localStorage.featured.some(function (localElemnt) {
                return name == localElemnt.name;
            });
            if (isElem) return;

            $localStorage.featured.push({
                "category": $scope.category,
                "name": name
            });
        }
    })

    .controller('FeaturedNewsCtrl', function ($scope, $http, $route, $localStorage) {

        function iterator(array) {
            var index = 0;
            $http.get("https://newsapi.org/v1/sources")
                .then(function (response) {
                    response.data.sources.forEach(function (element) {

                        var isElem = $localStorage.featured.some(function (localElemnt) {
                            return element.name == localElemnt.name;
                        })
                        if (isElem) {
                            $scope.categoryIn.push(element);
                        }
                    }, $scope);
                });
        }

        $scope.delete = function (name) {
            var indexRemove = findWithAttr($localStorage.featured, 'name', name);
            if (indexRemove == -1) return;
            $localStorage.featured.splice(indexRemove, 1);
            $route.reload();
        }

        if ($localStorage.featured) {
            $scope.categoryIn = [];
            iterator($localStorage.featured);
        }

        function findWithAttr(array, attr, value) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        }
    })

    .controller('AdditionNewsCtrl', function ($scope, $http, $route, $localStorage) {


        if (!$localStorage.mynews) {
            $localStorage.mynews = [];
        }
         $scope.myNewsLocal=[];
        $scope.save = function (name, description) {
            var isElem = $localStorage.featured.some(function (localElemnt) {
                return name == localElemnt.name;
            });
            if (isElem) return;

            $localStorage.mynews.push({
                "name": name,
                "description": description
            });
            $route.reload();
        }

        function iterator(array) {
            var index = 0;
            $localStorage.mynews.forEach(function (element) {

                var isElem = $localStorage.mynews.some(function (localElemnt) {
                    return element.name == localElemnt.name;
                })
                if (isElem) {
                    $scope.myNewsLocal.push(element);
                }
            }, $scope);
        }


        $scope.delete = function (name) {
            var indexRemove = findWithAttr($localStorage.mynews, 'name', name);
            if (indexRemove == -1) return;
            $localStorage.mynews.splice(indexRemove, 1);
            $route.reload();
        }

        if ($localStorage.mynews) {
            $scope.categoryIn = [];
            iterator($localStorage.mynews);
        }

        function findWithAttr(array, attr, value) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        }

    })

    .controller('NewsDetailCtrl', function ($scope, $http, $routeParams) {
        $scope.source = $routeParams.source;
        $http.get(" https://newsapi.org/v1/articles?source=" + $scope.source + "&apiKey=745d6769507e49769a20b1467d5181df")
            .then(function (response) {
                $scope.articleInfo = response.data.articles;
            });


    });


