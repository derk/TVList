/**
 * Created by Gil on 07/03/2015.
 */
angular.module('starter').controller('mainCtrl', function($scope, $localstorage, $ionicPopup) {
    $scope.catagoryNames = ['series', 'movies', 'other'];
    $scope.catagory = [];
    var initCatagories = function(){
        angular.forEach($scope.catagoryNames, function(value){
            if (!$localstorage.isKeyDefined(value)){
                $localstorage.setObject(value, []);
            }
            $scope.catagory[value] = $localstorage.getObject(value);
        });
    };
    initCatagories();

    $scope.addItem = function(catagoryName, item){
        $scope.catagory[catagoryName].push(item);
        $localstorage.setObject(catagoryName, $scope.catagory[catagoryName]);
    };

    $scope.removeItem = function(catagoryName, index){
        $scope.catagory[catagoryName].splice(index, 1);
        $localstorage.setObject(catagoryName, $scope.catagory[catagoryName]);
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