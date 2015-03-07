/**
 * Created by Gil on 07/03/2015.
 */
angular.module('ionic.utils', [])

    .factory('$localstorage', ['$window', function($window) {
        return {
            setString: function(key, value) {
                if (value !== 'undefined'){
                    $window.localStorage[key] = value;
                }
            },
            getString: function(key) {
                return $window.localStorage[key] || 'undefined';
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            isKeyDefined: function(key) {
                var value = $window.localStorage[key] || 'undefined';
                return value !== 'undefined';
            },
            clearLocalStorage: function() {
                $window.localstorage.clear();
            }
        }
    }]);