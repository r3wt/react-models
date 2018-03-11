import React,{PureComponent} from 'react';

function determineValue(e){
    var value = e;
    if(e.hasOwnProperty('value')){
        value = e.value;
    }
    else if(e.hasOwnProperty('target')){
        value = e.target.value;
    }
    return value;
}

const validators = {
    email(value,cb) {
        const input = document.createElement('input');
        input.type = 'email';
        input.value = value;
        var result = input.checkValidity();
        const parts = value.split('@');
        if(parts[1]){
            if(parts[1].indexOf('.') <= 0){
                result = false;
            }
        }
        if(!result){
            cb('Invalid Email Address')
        }else{
            cb()
        }
    },
    minLengthCurried(length){
        return (v,cb) => {
            if(v.length < length){
                cb(`Must be atleast ${length} characters`);
            }else{
                cb()
            }
        };
    },
    az_space( value, cb ) {
        return(v,cb) => {
            if( ! /^[A-Za-z ]+$/.test(value) ){
                cb('Only letters and spaces are allowed.')
            }else{
                cb()
            }
        }
    }
};

class Form extends PureComponent {

    errors = new Map()

    reportError = (field,message) => {
        console.log('Form.reportError')
        var errors = this.errors.get(field) || [];
        errors.push(message);
        this.errors.set(field,errors);
    }

    clearError = (field) => {
        console.log('Form.clearError');
        this.errors.delete(field);
    }

    componentDidMount(){
        this.form.reportError = this.reportError;
        this.form.clearError = this.clearError;
    }

    componentWillUnmount(){
        this.errors.clear();
    }

    submit = (e) => {
        e.preventDefault();

        this.runValidators();
        if(!this.errors.size) {
            this.props.onSubmit();
        }else{
            this.props.onError(this.errors.values());
        } 
        e.stopPropagation();
    }

    runValidators() {
        this.form.querySelectorAll('[data-react-model]').forEach((el)=>{
            el.runValidator();
        })
    }

    render(){
        return (
            <form onSubmit={this.submit} ref={ref=>this.form=ref} data-react-model>
                {this.props.children}
            </form>
        )
    }
}

class BaseInput extends PureComponent {

    static defaultProps = {
        onChange:()=>{},
        value:'',
        name:'',
        type:'',
        validate:(e,cb=(errMsg)=>{})=>{cb()},
        required: false,
        label:'',
        className:'form-group'
    };

    state = {
        error: false,
        message:''
    };

    form = null;

    el = null;

    input = null;

    noForm = {
        reportError:()=>{},
        clearError:()=>{}
    }

    setValidator(){
        var validator = Input.defaultProps.validate;
        if(typeof this.props.validate=='string' && validators.hasOwnProperty(this.props.validate)){
            validator = validators[this.props.validate];
        }
        if(typeof this.props.validate == 'function') {
            validator = this.props.validate;
        }
        this.validator = validator;
    }

    componentDidMount(){
        this.setValidator();
        this.input.runValidator = ()=> this.onChange({ target: this.input });
    }

    componentDidUpdate(prevProps){
        if(prevProps.validate != this.props.validate){
            this.setValidator();
        }
    }

    onChange = (e) => {
        if(!this.form){
            this.form = this.el.closest('form[data-react-model]') || this.noForm;//some inputs may not be in a form.
        }
        
        this.props.onChange(e);
        
        const value = determineValue(e);
        
        if(this.props.required && !value){
            const message = 'Required';
            this.setState({error:true,message});
            this.form.reportError(this.props.name,`${this.props.label||this.props.field} is required`)
            return;
        }
        this.validator(value,(message)=>{
            if(message){
                if(this.state.error!=true || this.state.message != message){
                    this.setState({error:true,message});
                    this.form.reportError(this.props.name,message);
                }
            }else{
                if(this.state.error!==false || this.state.message!=''){
                    this.setState({error:false,message:''});
                    this.form.clearError(this.props.name);
                }
            }
        });    
    }
}


class Input extends BaseInput {
    renderInput({type,name,value,onChange}) {
        return <input ref={ref=>this.input=ref} {...{type,name,value,onChange}} data-react-model />;
    }

    render() {
        const {type,name,value,label,className,children} = this.props;
        const {error,message} = this.state;
        return (
            <div ref={ref=>this.el=ref} className={className+(error?' has-error': value==''?'':' has-valid')}>
                <label>{label}</label>
                {this.renderInput({type,name,value,onChange:this.onChange,children})}
                {error && <small>*{message}</small>}
            </div>
        );
    }
}

class Textarea extends Input {
    renderInput({name,value,onChange}) {
        return <textarea {...{name,value,onChange}} data-react-model />;
    }
}

class Select extends Input {
    renderInput({name,value,onChange,children}) {
        return <select ref={ref=>this.input=ref} {...{name,value,onChange}} data-react-model>{children}</select>;
    }
}

const withModels = (c) => {

    c.prototype.model = function(name,type="text"){
        return {
            onChange: (e)=>{
                const value = determineValue(e);
                this.setState({[name]:value})
            },
            value: this.state[name],
            name,
            type
        };
    };

    c.prototype.checkbox = function(name,value=null){
        return {
            onChange: (e)=>this.setState({[name]:e.target.checked}),
            checked: this.state[name],
            type:'checkbox',
            name,
            value
        };
    };

    c.prototype.radio = function(name,value=null){
        return {
            onChange: (e)=>this.setState({[name]:value}),
            checked: this.state[name] === value,
            type:'radio',
            name,
            value
        }
    };

    return c;
};


export {withModels,validators,Form,BaseInput,Input,Textarea,Select};