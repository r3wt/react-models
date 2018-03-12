module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.Select=exports.Textarea=exports.Input=exports.BaseInput=exports.FormError=exports.Form=exports.extendValidators=exports.validators=exports.withModels=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(1);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function determineValue(e){var value=e;if(e.hasOwnProperty('value')){value=e.value;}else if(e.hasOwnProperty('target')){value=e.target.value;}return value;}var validators={email:function email(value,cb){var input=document.createElement('input');input.type='email';input.value=value;var result=input.checkValidity();var parts=value.split('@');if(parts[1]){if(parts[1].indexOf('.')<=0){result=false;}}if(!result){cb('Invalid Email Address');}else{cb();}},minLengthCurried:function minLengthCurried(length){return function(v,cb){if(v.length<length){cb('Must be atleast '+length+' characters');}else{cb();}};},az_space:function az_space(value,cb){return function(v,cb){if(!/^[A-Za-z ]+$/.test(value)){cb('Only letters and spaces are allowed.');}else{cb();}};}};var extendValidators=function extendValidators(k,fn){validators[k]=fn;};var Form=function(_PureComponent){_inherits(Form,_PureComponent);function Form(){var _ref;var _temp,_this,_ret;_classCallCheck(this,Form);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Form.__proto__||Object.getPrototypeOf(Form)).call.apply(_ref,[this].concat(args))),_this),_this.errors=new Map(),_this.form=null,_this.reportError=function(field,message){console.log('Form.reportError');var errors=_this.errors.get(field)||[];errors.push(message);_this.errors.set(field,errors);},_this.clearError=function(field){console.log('Form.clearError');_this.errors.delete(field);},_this.submit=function(e){e.preventDefault();_this.runValidators();if(!_this.errors.size){_this.props.onSubmit();}else{_this.props.onError(_this.errors.values());}e.stopPropagation();},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Form,[{key:'componentDidMount',value:function componentDidMount(){this.form.reportError=this.reportError;this.form.clearError=this.clearError;}},{key:'componentWillUnmount',value:function componentWillUnmount(){this.errors.clear();}},{key:'runValidators',value:function runValidators(){this.form.querySelectorAll('[data-react-model]').forEach(function(el){el.runValidator();});}},{key:'render',value:function render(){var _this2=this;return _react2.default.createElement('form',{onSubmit:this.submit,ref:function ref(_ref2){return _this2.form=_ref2;},'data-react-model':true},this.props.children);}}]);return Form;}(_react.PureComponent);var FormError=function FormError(_ref3){var _ref3$className=_ref3.className,className=_ref3$className===undefined?'':_ref3$className,_ref3$error=_ref3.error,error=_ref3$error===undefined?'':_ref3$error,_ref3$style=_ref3.style,style=_ref3$style===undefined?{}:_ref3$style;return error?_react2.default.createElement('div',{className:className,style:style},error):null;};var BaseInput=function(_PureComponent2){_inherits(BaseInput,_PureComponent2);function BaseInput(){var _ref4;var _temp2,_this3,_ret2;_classCallCheck(this,BaseInput);for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}return _ret2=(_temp2=(_this3=_possibleConstructorReturn(this,(_ref4=BaseInput.__proto__||Object.getPrototypeOf(BaseInput)).call.apply(_ref4,[this].concat(args))),_this3),_this3.state={error:false,message:''},_this3.form=null,_this3.input=null,_this3.onChange=function(e){if(!_this3.form){_this3.form=_this3.input.closest('form[data-react-model]')||{reportError:function reportError(){},clearError:function clearError(){}};//some inputs may not be in a form, so noop
}_this3.props.onChange(e);var value=determineValue(e);if(_this3.props.required&&!value){var message='Required';_this3.setState({error:true,message:message});_this3.form.reportError(_this3.props.name,message);return;}_this3.validator(value,function(message){if(message){if(_this3.state.error!=true||_this3.state.message!=message){_this3.setState({error:true,message:message});_this3.form.reportError(_this3.props.name,message);}}else{if(_this3.state.error!==false||_this3.state.message!=''){_this3.setState({error:false,message:''});_this3.form.clearError(_this3.props.name);}}});},_temp2),_possibleConstructorReturn(_this3,_ret2);}_createClass(BaseInput,[{key:'setValidator',value:function setValidator(){var validator=Input.defaultProps.validate;if(typeof this.props.validate=='string'&&validators.hasOwnProperty(this.props.validate)){validator=validators[this.props.validate];}if(typeof this.props.validate=='function'){validator=this.props.validate;}this.validator=validator;}},{key:'componentDidMount',value:function componentDidMount(){var _this4=this;this.setValidator();this.input.runValidator=function(){return _this4.onChange({target:_this4.input});};}},{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){if(prevProps.validate!=this.props.validate){this.setValidator();}}}]);return BaseInput;}(_react.PureComponent);BaseInput.defaultProps={onChange:function onChange(){},value:'',name:'',type:'',placeholder:'',validate:function validate(e){var cb=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(errMsg){};cb();},required:false,label:'',classes:{formGroup:'',input:'',label:'',error:''}};var Input=function(_BaseInput){_inherits(Input,_BaseInput);function Input(){_classCallCheck(this,Input);return _possibleConstructorReturn(this,(Input.__proto__||Object.getPrototypeOf(Input)).apply(this,arguments));}_createClass(Input,[{key:'renderInput',value:function renderInput(_ref5){var _this6=this;var type=_ref5.type,name=_ref5.name,placeholder=_ref5.placeholder,value=_ref5.value,onChange=_ref5.onChange,className=_ref5.className;return _react2.default.createElement('input',_extends({ref:function ref(_ref6){return _this6.input=_ref6;}},{type:type,name:name,placeholder:placeholder,value:value,onChange:onChange,className:className},{'data-react-model':true}));}},{key:'render',value:function render(){var _props=this.props,type=_props.type,name=_props.name,placeholder=_props.placeholder,value=_props.value,label=_props.label,classes=_props.classes,children=_props.children;var _state=this.state,error=_state.error,message=_state.message;return _react2.default.createElement('div',{className:classes.formGroup+(error?' has-error':value==''?'':' has-valid')},_react2.default.createElement('label',{className:classes.label},label),this.renderInput({type:type,name:name,placeholder:placeholder,value:value,onChange:this.onChange,children:children,className:classes.input}),error&&_react2.default.createElement('p',{className:classes.error},'*',message));}}]);return Input;}(BaseInput);var Textarea=function(_Input){_inherits(Textarea,_Input);function Textarea(){_classCallCheck(this,Textarea);return _possibleConstructorReturn(this,(Textarea.__proto__||Object.getPrototypeOf(Textarea)).apply(this,arguments));}_createClass(Textarea,[{key:'renderInput',value:function renderInput(_ref7){var _this8=this;var name=_ref7.name,value=_ref7.value,placeholder=_ref7.placeholder,onChange=_ref7.onChange,className=_ref7.className;return _react2.default.createElement('textarea',_extends({ref:function ref(_ref8){return _this8.input=_ref8;}},{name:name,placeholder:placeholder,value:value,onChange:onChange,className:className},{'data-react-model':true}));}}]);return Textarea;}(Input);var Select=function(_Input2){_inherits(Select,_Input2);function Select(){_classCallCheck(this,Select);return _possibleConstructorReturn(this,(Select.__proto__||Object.getPrototypeOf(Select)).apply(this,arguments));}_createClass(Select,[{key:'renderInput',value:function renderInput(_ref9){var _this10=this;var name=_ref9.name,value=_ref9.value,placeholder=_ref9.placeholder,onChange=_ref9.onChange,children=_ref9.children,className=_ref9.className;return _react2.default.createElement('select',_extends({ref:function ref(_ref10){return _this10.input=_ref10;}},{name:name,placeholder:placeholder,value:value,onChange:onChange,className:className},{'data-react-model':true}),children);}}]);return Select;}(Input);var withModels=function withModels(c){c.prototype.model=function(name){var _this11=this;var type=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"text";return{onChange:function onChange(e){var value=determineValue(e);_this11.setState(_defineProperty({},name,value));},value:this.state[name],name:name,type:type};};c.prototype.checkbox=function(name){var _this12=this;var value=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return{onChange:function onChange(e){return _this12.setState(_defineProperty({},name,e.target.checked));},checked:this.state[name],type:'checkbox',name:name,value:value};};c.prototype.radio=function(name){var _this13=this;var value=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return{onChange:function onChange(e){return _this13.setState(_defineProperty({},name,value));},checked:this.state[name]===value,type:'radio',name:name,value:value};};return c;};exports.withModels=withModels;exports.validators=validators;exports.extendValidators=extendValidators;exports.Form=Form;exports.FormError=FormError;exports.BaseInput=BaseInput;exports.Input=Input;exports.Textarea=Textarea;exports.Select=Select;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);