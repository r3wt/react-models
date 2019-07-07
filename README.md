# react models
----
easy and convenient models for your react components (inspired by `ng-model` from angular.js)

# api
----
`@withModels` - use this decorator on the compents you'd like to use models with. `model`,`checkbox`, and `radio` functions will be added to the component. nested paths have basic support, it may not work with arrays currently but support is planned. you simply call the function(s) in your markup and use the spread operator to apply it to the input components as necessary. should work with both dom inputs and custom components as well.

`this.model(str statePath,str inputType)` - the statePath of the value, and the inputType, which defaults to 'text'
`this.checkbox(str statePath,mixed checkedValue) - the statePath of the value, and the checkedValue is the value applied when the checkbox is selected.
`this.radio(str statePath, mixed optionValue ) - the statepath of the value, and the optionValue is the value applied when the radio is selected.

# component api
----
Several components are provided for you to get started with. 

`Form` - a form component. it can track child inputs and report errors.


example usage:
```js
import React,{Component} from 'react';
import {withModels} from 'react-models';

@withModels class Example extends Component {

    state = {
        user: {
            firstname:'',
            lastname:'',
            password:''
        },
        showPassword: false,
        subscribeToNewsletter:'yes'
    }

    render() {

        return (
            <div>
                <label>First Name</label>
                <input {...this.model('user.firstname')} />

                <label>Last Name</label>
                <input {...this.model('user.lastname')} />
                
                <label>Password</label>
                <input {...this.model('user.password',this.state.showPassword?'text':'password')} />
                <div>
                    <label>Show Password</label>
                    <input {...this.checkbox('showPassword',true)} />
                </div>
                <div>
                    <strong>Do you want to subscribe to our newsletter?</strong>
                    <label>
                    <input {...this.radio('subscribeToNewsletter','yes')} />
                    Yes
                    </label>
                    <label>
                    <input {...this.radio('subscribeToNewsletter','no')} />
                    No
                    </label>
                </div>
            </div>
        )

    }
}
```