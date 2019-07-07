import React,{PureComponent} from 'react';

class Form extends PureComponent {

    static defaultProps = {
        onSubmit:()=>{},
        onError:(errors)=>{},
        getRef:(ref)=>{},
        validate:true
    }

    errors = new Map()

    reportError = (field,message) => {
        var errors = this.errors.get(field) || [];
        errors.push(message);
        this.errors.set(field,errors);
    }

    clearError = (field) => {
        this.errors.delete(field);
    }

    componentDidMount(){
        this.form.reportError = this.reportError;
        this.form.clearError = this.clearError;
        this.form.hasErrors = () => {
            return this.errors.size > 0;
        };
        this.form.getErrors = () => {
            return this.errors;
        };
        this.form.runValidators = ()=>this.runValidators();
        this.props.getRef(this.form);
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
        const forms = this.form.querySelectorAll('[data-react-model]');
        for(let i=0;i<forms.length;i++){
            forms[i].runValidator();
        }
    }

    render(){
        return (
            <form onSubmit={this.submit} ref={ref=>{
                this.form=ref;
                if(this.props.ref) {
                    this.props.ref(ref);//allow to get ref
                }
            }} noValidate={!this.props.validate} data-react-model>
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
        readOnly:false
    }

    state = {
        error: false,
        message:''
    }

    form = null

    el = null

    input = null;

    setValidator(){
        if(typeof this.props.validate !== 'function') {
            throw new Error('prop `validate` must be a function');
        }
        this.validator = this.props.validator;
    }

    nullForm = {
        reportError:()=>{},
        clearError:()=>{}
    }

    componentDidMount(){
        this.setValidator();
        this.input.runValidator = ()=> this.onChange({ target: this.input });
    }

    componentDidUpdate(prevProps){
        if(prevProps.validate !== this.props.validate){
            this.setValidator();
        }
    }

    onChange = (e) => {
        console.log('BaseInput.onChange() react-model');
        // console.log(e);
        if(!this.form){
            this.form = this.el.closest('form[data-react-model]');
        }
        this.props.onChange(e);
        var value = e;//components like react-select-me pass primitive values
        if(e.hasOwnProperty('value')){
            value = e.value;
        }
        else if(e.hasOwnProperty('target')){
            value = e.target.value;//normal inputs dont
        }
        
        if(this.props.required && !value){
            const message = 'Required';
            this.setState({error:true,message});
            this.form.reportError(this.props.name,`${this.props.label||this.props.field} is required`)
            return;
        } 
        else if(!this.props.required && !value) {
            this.setState({error:false,message:''});
            this.form.clearError(this.props.name);
        } else {
            this.validator(value,message=>{
                if(message){
                    if(this.state.error!==true || this.state.message !== message){
                        this.setState({error:true,message});
                        this.form.reportError(this.props.name,message);
                    }
                }else{
                    if(this.state.error!==false || this.state.message!==''){
                        this.setState({error:false,message:''});
                        this.form.clearError(this.props.name);
                    }
                }
            });   
        }
    }
}

function parsePath(path) {
    const paths = path.split('.');
    return paths.length > 1 ? paths : paths[0];
}

function getValue(ctx,name) {
    var context = ctx.state;
    const path = parsePath(name);
    if(isArray(path)) {
        let value = context;
        for(let i=0;i<path.length;i++) {
            value=value[path[i]];
        }
        return value;
    }else{
        return context[name];
    }
}

function getUpdate(ctx,name,value) {
    var context = ctx.state;
    const path = parsePath(name);
    if(isArray(path)) {
        const top = path.shift();
        var state = { [top]: {...context[top] } };
        var obj = state;
        obj = obj[top];
        for(let i=0;i<path.length-1;i++) {
            obj = obj[path[i]];
        }
        obj[path[path.length-1]] = value;
        return state;
    }else{
        return {[name]:value}
    }
}

const withModels = (c) => {

    c.prototype.model = function(name,type="text"){
        return {
            onChange: (e)=>{
                var val = e;//components like react select pass primitive values
                if(e.hasOwnProperty('target')){
                    val = e.target.value;//normal inputs dont
                }
                this.setState(getUpdate(this,name,val))
            },
            value: getValue(this,name),
            name,
            type
        };
    };

     c.prototype.checkbox = function(name,value=null){
        return {
            onChange: (e)=>this.setState(getUpdate(this,name,e.target.checked?value:'')),
            checked: getValue(this,name),
            type:'checkbox',
            name,
            value
        };
    };

    c.prototype.radio = function(name,value=null){
        return {
            onChange: (e)=>e.target.checked && this.setState(getUpdate(this,name,value)),
            checked:  getValue(this,name)===value,
            type:'radio',
            name,
            value
        }
    };

    return c;
};

const FormError = ({error}) => error ? <div class="alert">{error}</div> : null;

export { withModels, Form, FormError, BaseInput, Input, Textarea, Select };