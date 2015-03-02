(function (window, angular, undefined) {
    'use strict';



    angular
        .module('hc.ui.wizard', ['ui.router'])
        .value('XS_WIZARD_TEMPLATE_DIR', '') // user configurable
        .provider('router', function ($stateProvider) {

            var urlCollection;

            this.$get = function ($http, $state) {
                return {
                    setUpRoutes: function (name, state) {
                        $stateProvider.state(name, state);
                    }
                }
            };

        })
        .directive('hcWizard', ['$state', '$http', '$timeout', '$window', '$rootScope', function ($state, $http, $timeout, $rootScope) {

            return {
                restrict: 'E',
                transclude: true,

                scope: {
                    formmodelprefix: '@',
                    locationchangeurl: '@'
                },

                link: function (scope, element, attrs, ctrl, transclude) {

                    transclude(scope, function (clone, scope) {
                        element.append(clone);
                        var $form = element.find("form");
                        $form.append($("<div ui-view></div>"));
                    });
                },
                controller: function ($scope, $state, $http, $timeout, $window, $rootScope, router) {
                        $scope.steps = [];
                        $scope[$scope.formmodelprefix] = {};
                        $scope.formData = {};

                        // underlying step turner
                        var setStep = function (nextIndex) {
                            $scope.state = {
                                state: {
                                    previousStep: $scope.currentStep,
                                    currentStep: nextIndex
                                }
                            };

                            $scope.steps[$scope.currentStep].activeStep = false;
                            setCurrentStep(nextIndex);
                            if ($scope.onStepChange) {
                                $scope.onStepChange($scope.state);
                            }
                            $state.go($scope.steps[$scope.currentStep].name);
                        };


                        $scope.cancel = function () {

                        };

                        var setCurrentStep = function (index) {
                            $scope.currentStep = index;
                            $scope.steps[$scope.currentStep].activeStep = true;
                        };

                        // **************************************
                        // controller interface
                        //
                        this.addStep = function (step) {
                            $scope.steps.push(step);
                            if (step.name == 'acknowledgement') {
                                $scope.acknowledgeStep = true;
                            }

                            router.setUpRoutes(step.name, {
                                url: step.url,
                                templateUrl: step.template,
                                controller: step.controller,
                                sticky: true
                            });
                            if ($scope.steps.length === 1) {
                                setCurrentStep(0);
                                $state.go($scope.steps[0].name);

                            }
                        };
                        // **************************************
                        // $scope interface
                        //
                        $scope.goToStep = function (index) {
                            setStep(index);
                        };

                        $scope.nextStep = function (isFormInvalid) {
                            var form = $("hc-wizard form");
                            if ($scope.acknowledgeStep && $scope.isLast()) {
                                $scope.locationChange();
                            } else
                            if (isFormInvalid) {
                                $rootScope.$broadcast('onSubmit', $scope.currentStep);
                            } else {
                                if ($scope.isLastFormStep()) {
                                    var formDataAggregate = [];
                                    for (var i in $scope.formData) {
                                        formDataAggregate = formDataAggregate.concat($scope.formData[i]);
                                    }
                                    formDataAggregate.concat(form.serializeArray());
                                    $http({
                                            method: 'POST',
                                            url: form.attr('action'),
                                            data: $.param(formDataAggregate), // pass in data as strings
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded'
                                            } // set the headers so angular passing info as form data (not request payload)
                                        })
                                        .success(function (data) {
                                            if ($scope.acknowledgeStep) {
                                                changeStep($scope.currentStep + 1);
                                            } else {
                                                $scope.locationChange(); //ToDo Handle Location Change
                                            }

                                        })
                                        .error(function (data, status) {
                                            $scope.isErrors = true;
                                            var wizard = $("hc-wizard");
                                            data.errors.each(function (item) {
                                                var error = "<div class='inline-error'>" + error.label + "</div>";
                                                wizard.append($error);
                                            });
                                        });
                                } else {
                                    $scope.formData[$scope.currentStep] = form.serializeArray();
                                    setStep($scope.currentStep + 1);
                                }


                            }

                        };

                        $scope.prevStep = function () {
                            if ($scope.currentStep != 0) {
                                setStep($scope.currentStep - 1);
                            }

                        };
                        $scope.isLast = function () {
                            return $scope.currentStep === ($scope.steps.length - 1);
                        };

                        $scope.isLastFormStep = function () {
                            if ($scope.acknowledgeStep) {
                                return $scope.currentStep === (($scope.steps.length - 2));
                            } else {
                                return $scope.currentStep === ($scope.steps.length - 1);
                            }
                        }
                        $scope.isFirst = function () {
                            return $scope.currentStep === 0;
                        };
                        $scope.hasNext = function () {
                            return !$scope.isLast();
                        };
                        $scope.hasPrev = function () {
                            return !$scope.isFirst();
                        };

                        $scope.locationChange = function () {
                            $window.location.href = $scope.locationchangeurl;
                        }

                        $scope.step = function () {
                            return $scope.currentStep;
                        }

                    } // end controller
            }; // end return
    }])

    .directive('hcWizardStep', function () {

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
            link: function (scope, element, attr, hcWizard) {
                hcWizard.addStep(scope);
            }
        }; // end return

    })

    .directive('xsWizardControls', ['HC_WIZARD_TEMPLATE_DIR', function (XS_WIZARD_TEMPLATE_DIR) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: XS_WIZARD_TEMPLATE_DIR + '/xs-wizard-controls.html'
        }; // end return

    }]);



    var app = angular.module('app', ['hc.ui.wizard', 'ui.router']);

    app.value('HC_WIZARD_TEMPLATE_DIR', ''); // user configurable
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$provide',
        function (stateProvider, urlRouterProvider, httpProvider, provide) {

    }]);

})(window, window.angular);