# Angular MultiStep Form Wizard

[MultiStep Wizard] provides all the functionality for creating multistep wizard using AngularJS and allows you to have any style of your wizard.

## Getting Started

To use this wizard, first design the layout how your wizard will look like.
* Your layout should not contain only one empty form element
* Now wrap this layout with hc-wizard and add hc-wizard-step with the name and templateurl
* Number of hc-wizard step should be equal to the number of steps in the wizard
* If you want to have a acknowledgment step then set the last step's name in your hc-wizard as 'acknowledgement'

For example Layout is as follows.
```html
<div class="wizard">

	<form name="userForm" action="/handler" novalidate>

	</form>
	
	 <div class="col-xs-12">
      <div class="btn-group btn-group-sm pull-right">
            <button class="btn btn-small btn-default">Cancel</button>

            <button class="btn btn-small btn-primary">{{saveText || "Save"}}</button>

           <button class="btn btn-small btn-default">Next</button>

            </div>
        </div>
```

Now wrap this with hc-wizard

```html
<hc-wizard formmodelprefix="user" locationchangeurl="/movetonextpage">
                         
<hc-wizard-step name="info"  template="/hc-wizard/section1.html" controller="Section1Ctrl">
  
</hc-wizard-step>

<hc-wizard-step name="order"  template="/hc-wizard/section2.html" controller="Section2Ctrl">
 
</hc-wizard-step>

<hc-wizard-step name="payment"  template="/hc-wizard/section3.html" controller="Section3Ctrl">
 
</hc-wizard-step>

<hc-wizard-step name="confirmation" template="/hc-wizard/section4.html" controller="Section4Ctrl">

</hc-wizard-step>

<div class="wizard">

	<form name="userForm" action="/handler" novalidate>

	</form>
	
	 <div class="col-xs-12">
      <div class="btn-group btn-group-sm pull-right">
            <button class="btn btn-small btn-default" ng-click="previouStep()">Cancel</button>

            <button class="btn btn-small btn-primary">{{saveText || "Save"}}</button>

           <button ng-click="nextStep()" class="btn btn-small btn-default">Next</button>

            </div>
        </div>
```

HC-Wizard directive required attributes

* formmodelprefix : Set this if you are using binding your input fields in the form sections  via object
                    If your are using :-
                    ```html
                    <form>
                    <input ng-model="user.firstname"></input>
                    </form>
                    ```
                    use formmodelprefix="user"
* locationchangeurl : Set this to go to the desired after the wizard is complete


Functionality/API provided

* ## nextStep() : Moves the wizard to the next Step on ng-click
* ## prevStep() : Moves the wizard to the previous Step on ng-click
* ## step()     : Get the current step of the wizard
* ## gotostep() : Move to the desired step of the wizard
* ## hasNext()  : Returns boolean if next step is possible
* ## hasPrev()  : Returns boolean if previous step is possible


## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue]

## Creator

Angular Multi Step wizard was created by and is maintained by **Piyush Kapoor**, Senior Software Engineer at [Hcentive Techn ology].


## Copyright and License

Copyright 2013-2015 Piyush Kapoor.
