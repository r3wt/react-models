# react models
----
models for your react components. 

# api
----
`@withModels` - decorates your components with 3 convenience functions `model`,`checkbox`, and `radio`. nested paths have basic support, it may not work with arrays currently but support is planned. you simply call the function(s) in your markup and use the spread operator to apply it to the input components as necessary. should work with both dom inputs and custom components as well.

    `model(str statePath,str inputType)` - the statePath of the value, and the inputType, which defaults to 'text'
    `checkbox(str statePath,mixed checkedValue) - the statePath of the value, and the checkedValue is the value applied when the checkbox is selected.
    `radio(str statePath, mixed optionValue ) - the statepath of the value, and the optionValue is the value applied when the radio is selected.

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
                <input {...this.model('user.password',this.state.showPassword?'text':'password')}>
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