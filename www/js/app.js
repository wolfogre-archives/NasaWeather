// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl',
          }
        },
        onEnter: function () {

        }
      })

      .state('tab.chats', {
        url: '/chats',
        cache:'false',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  })
  .directive('pvmap', function (projectData) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div><div id="container"></div><div id="myPageTop"><table><tr><td class="column2"><label>经纬度：</label></td></tr><tr><td class="column2"><input type="text" readonly="true" id="lnglat"></td></tr></table></div></div>',
      link: function (scope, elem, attrs) {
        var map = new AMap.Map("container", {
          resizeEnable: true
        });
        map.plugin(["AMap.ToolBar"], function () {
		        map.addControl(new AMap.ToolBar());
        });
        //为地图注册click事件获取鼠标点击出的经纬度坐标
        var clickEventListener = map.on('click', function (e) {
          document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat();
          projectData.addOrUpdateData(e.lnglat.getLng(),"lon");
          projectData.addOrUpdateData(e.lnglat.getLat(),"lat");
        });
        var auto = new AMap.Autocomplete({
          input: "tipinput"
        });
        AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
        function select(e) {
          if (e.poi && e.poi.location) {
            map.setZoom(15);
            map.setCenter(e.poi.location);
          }
        }
      }
    };
  })

  .service('projectData', function ($rootScope) {
    this.projectData = {};
    this.getData = function (propName) {
        if (this.projectData[propName]) {
            return this.projectData[propName];
        } else {
            return null;
        }
    };
    this.addOrUpdateData = function (data, propName) {
        this.projectData[propName] = data;
    };
});


