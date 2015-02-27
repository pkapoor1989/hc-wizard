(function (window, angular, undefined) {  'use strict';


                                        
  angular
    .module('hc.ui.wizard', ['ui.router'])
    .value('XS_WIZARD_TEMPLATE_DIR', '') // user configurable

    .directive('hcWizard', ['$state', '$http', '$timeout', '$window',function($state,$http,$timeout) {

      return {
        restrict: 'E',
          transclude:true,
          template:'<div ng-transclude></div>',

        scope: {
          formmodelprefix: '@',
		  locationchangeurl: '@'
        },

        controller: function($scope,$state,$http,$timeout,$window) {
          $scope.steps = [];
		  $scope[$scope.formmodelprefix] = {};
		  $scope.formData = {};

          // underlying step turner
          var setStep = function(nextIndex) {
            $scope.state = {state: { previousStep: $scope.currentStep, 
			                         currentStep: nextIndex 
								   }
							};
							
            $scope.steps[$scope.currentStep].activeStep = false;
            setCurrentStep(nextIndex);
            if($scope.onStepChange) {
				$scope.onStepChange($scope.state);
			}
			$state.go($scope.steps[$scope.currentStep].name);
          };
		  
		  
          $scope.cancel = function () {
			  
          };
		  
          var setCurrentStep = function(index) {
            $scope.currentStep = index;
            $scope.steps[$scope.currentStep].activeStep = true;
          };
		  
          // **************************************
          // controller interface
          //
          this.addStep = function(step) {
            $scope.steps.push(step);
			if (step.name == 'acknowledgement') {
				$scope.acknowledgeStep = true;
			}
			
			app.stateProvider.state(step.name,
                {
                      url: step.url,
                      templateUrl:  step.template,
					  sticky:true
                 });
            if($scope.steps.length===1) {
				setCurrentStep(0);
				$state.go($scope.steps[0].name);
				
			}
          };
          // **************************************
          // $scope interface
          //
          $scope.goToStep = function(index) {
            setStep(index);
          };
		  
          $scope.nextStep = function(isFormInvalid) {
			 var form = $("hc-wizard form");
			if ($scope.acknowledgeStep && $scope.isLast()){
				$scope.locationChange();
			} else
		    if (isFormInvalid) {
				$rootScope.$broadcast('onSubmit', $scope.step);
			} else {
				if ($scope.isLastFormStep()) {
					var formDataAggregate = [];
					for (var i in $scope.formData) {
						formDataAggregate = formDataAggregate.concat($scope.formData[i]);
					}
					formDataAggregate.concat(form.serializeArray());
					$http({
                         method  : 'POST',
                         url     : form.attr('action'),
                         data    : $.param(formDataAggregate),  // pass in data as strings
                         headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                      })
                     .success(function(data) {
						     if ($scope.acknowledgeStep) {
								 changeStep($scope.currentStep + 1);
							 } else {
								 $scope.locationChange();//ToDo Handle Location Change
							 }
                             
                   })
				   .error(function(data,status){
					   $scope.isErrors = true;
				   });
				} else {
					$scope.formData[$scope.currentStep] = form.serializeArray();
					setStep($scope.currentStep+1);
				}
				
				
		    }
				
			};
            
          $scope.prevStep = function () {
			  if ($scope.currentStep != 0) {
				    setStep($scope.currentStep - 1);
			  }
  
          };
          $scope.isLast = function() {
            return $scope.currentStep === ($scope.steps.length - 1);
          };
		  
		  $scope.isLastFormStep = function() {
			  if ($scope.acknowledgeStep) {
				  return $scope.currentStep === (($scope.steps.length - 2));
			  } else {
				  return $scope.currentStep === ($scope.steps.length - 1);
			  }
		  }
          $scope.isFirst = function() {
            return $scope.currentStep === 0;
          };
          $scope.hasNext = function() {
            return ! $scope.isLast();
          };
          $scope.hasPrev = function() {
            return ! $scope.isFirst();
          };
		  
		  $scope.locationChange =  function() {
			   $window.location.href = $scope.locationchangeurl;
		  }
		  
        } // end controller
      }; // end return
    }])

    .directive('hcWizardStep', function() {

      return {
        restrict: 'E',
        transclude: true,
        replace: true,

        scope: {
          title: '@',
		  url: '@',
		  template: '@',
		  name: '@',
		  controller: '@'
        },

        require: '^hcWizard',
        link: function(scope, element, attr, hcWizard) {
          hcWizard.addStep(scope); 
        }
      }; // end return

    })

    .directive('xsWizardControls', ['HC_WIZARD_TEMPLATE_DIR', function(XS_WIZARD_TEMPLATE_DIR) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: XS_WIZARD_TEMPLATE_DIR + '/xs-wizard-controls.html'
      }; // end return

    }]);
                                        
                                        
                                        
          var app = angular.module('app',['hc.ui.wizard','ui.router']);
		   
           app.value('HC_WIZARD_TEMPLATE_DIR', ''); // user configurable
		   app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$provide',
        function (stateProvider, urlRouterProvider, httpProvider, provide) {
 
             app.stateProvider = stateProvider;
			 }]);

})(window, window.angular);
