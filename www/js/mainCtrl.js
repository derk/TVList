/**
 * Created by Gil on 07/03/2015.
 */
angular.module('starter').controller('mainCtrl', function($scope, $localstorage, $ionicPopup, Restangular) {
    var allCollections = Restangular.all('collections');
    $scope.catagoryNames = ['series', 'movies', 'other'];
    $scope.catagory = [];

    var syncCollection = function(catagoryName){
        $scope.catagory[catagoryName] = allCollections.all(catagoryName).getList().$object;
    };

    angular.forEach($scope.catagoryNames, function(catagoryName){
        syncCollection(catagoryName);
    });

    $scope.addItem = function(catagoryName, item){
        $scope.catagory[catagoryName].post(item).then(function(){
            syncCollection(catagoryName);
        });
    };

    $scope.removeItem = function(catagoryName, itemId){
        $scope.catagory[catagoryName].one(itemId).remove().then(function(){
            syncCollection(catagoryName);
        });
    };

    $scope.clearAll = function(){
        $ionicPopup.show({
            title: 'איפוס',
            template: 'כל המידע יאופס. האם אתה בטוח?',
            buttons: [
                { text: 'ביטול' },
                {
                    text: '<b>אישור</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $localstorage.clearLocalStorage();
                        initCatagories();
                    }
                }
            ]
        });
    };

    $scope.clearCatagory = function(catagoryName){
        $ionicPopup.show({
            title: 'מחיקה',
            template: 'כל המידע בקטגוריה הנוכחית ימחק. האם אתה בטוח?',
            buttons: [
                { text: 'ביטול' },
                {
                    text: '<b>אישור</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $localstorage.setObject(catagoryName, []);
                        $scope.catagory[catagoryName] = $localstorage.getObject(catagoryName);
                    }
                }
            ]
        });
    };
});