app.factory('GeodataService', ['$http', '$q', function ($http, $q) {

    let getCountryBorders = function (country) {
        return $http.get('data/world-geojson/countries/' + country + '.json').then(function (response) {
            return response.data;
        });
    };

    let getAllStatistics = function () {
        return $http.get('https://covics-backend.herokuapp.com/predictions').then(function (response) {
            if (response.data && response.data) {
                let datum = response.data;
                datum.results.forEach(function (res) {
                    res.remaining_capacity = res.resources_capacity - res.resources_prediction_3w;
                    res.remaining_percent = 100 * (res.remaining_capacity / res.resources_capacity);
                });
                return datum;
            } else {
                return null;
            }
        });
    };

    return {
        "getCountryBorders": getCountryBorders,
        "getAllStatistics": getAllStatistics
    }


}]);