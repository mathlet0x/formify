/*!
 * jQuery formify 1.0.0
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function ( $ ) {
	var flags = ["disabled", "readonly", "novalidate", "required", "checked"];
	var ignoredAttributes = ['inputType', 'opts', 'type', 'content', 'label'];

	var FormBuilder = function() {};

	FormBuilder.prototype.elements = function() {};

	FormBuilder.prototype.elements.input = function(options, formBuilder) {
		var inputAllowedAttributes = [
			'name',
			'type',
			'inputType',
			'value',
			'placeholder',
			'disabled',
			'max',
			'maxlength',
			'min',
			'pattern',
			'readonly',
			'required',
			'size',
			'step',
			'content',
			'checked',
			'class',
			'id'
		];

		var inputAllowedTypes = [
			'text',
			'password',
			'submit',
			'radio',
			'checkbox',
			'button',
			'color',
			'date',
			'datetime',
			'datetime-local',
			'email',
			'month',
			'number',
			'range',
			'search',
			'file',
			'tel',
			'time',
			'url',
			'week'
		];

		$.each(options, function(index, value) {
    		if(inputAllowedAttributes.indexOf(index) == -1 
    				|| (index === "inputType" && inputAllowedTypes.indexOf(value) == -1)) {
    					throw 'Input attr error : ' + index;
    		}
		});

		return this.input.generate(options, formBuilder);
	};

	FormBuilder.prototype.renderFlags = function(options) {
		var opts = "";
		$.each(options, function(index, value) {
			if(flags.indexOf(index) !== -1) {
				if(value) {
					opts += index + " ";
				}
			}
		});
		return opts;
	}

	FormBuilder.prototype.renderFieldAttributes = function(options, formBuilder) {
		var render = "";
		render += options.inputType !== undefined ? 'type="' + options.inputType + '"' : '';
		$.each(options, function(index, value) {
			if(flags.indexOf(index) === -1 && ignoredAttributes.indexOf(index) === -1) {
				render += index+='="'+value+'"';
			}
		});
		render += " " + formBuilder.renderFlags(options); + " ";
		return render;
	}

	FormBuilder.prototype.renderFormAttributes = function(options) {
		var render = "";
		var formAllowedAttributes = [
			"autocomplete",
			"accept",
			"accept-charset",
			"enctype",
			"method",
			"name",
			"novalidate",
			"target",
			"action",
			"id",
			"class"
		]
		$.each(options, function(index, value) {
    		if(formAllowedAttributes.indexOf(index) == -1) {
    			throw 'Form attr error : ' + index;
    		} else if(index !== "novalidate") {
    			render += index+='="'+value+'"';
    		}
		});
		render += " " + this.renderFlags(options); + " ";		
		return render;
	}

	FormBuilder.prototype.elements.input.generate = function(options, formBuilder) {
		var content = options.content ? options.content : '';		
		return '<input ' + formBuilder.renderFieldAttributes(options, formBuilder) + '>' + content + '</input>';
	};

	FormBuilder.prototype.elements.select = function(options, formBuilder) {	
		var selectAllowedAttributes = [
			"autofocus",
			"disabled",
			"multiple",
			"name",
			"required",
			"type",
			"size",
			"id",
			"class",
			"opts"
		];

		$.each(options, function(index, value) {
    		if(selectAllowedAttributes.indexOf(index) == -1) {
    					throw 'Select attr error : ' + index;
    		}
		});

		return this.select.generate(options, formBuilder);
	};

	FormBuilder.prototype.elements.select.generate = function(options, formBuilder) {
		var opts = "";
		if(options.opts !== undefined) {
			$.each(options.opts, function(index, o) {
				opts += '<option value="' + o.value + '">' + o.name + '</option>';
			});
		}
		return '<select ' + formBuilder.renderFieldAttributes(options, formBuilder) + '> ' + opts + ' </select>';
	}

	FormBuilder.prototype.elements.textarea = function(options, formBuilder) {
		var textareaAllowedAttributes = [
			"autocomplete",
			"autofocus",
			"cols",
			"rows",
			"type",
			"content",
			"disabled",
			"maxlength",
			"minlength",
			"name",
			"placeholder",
			"readonly",
			"required",
			"selectionDirection",
			"selectionEnd",
			"selectionStart",
			"spellcheck",
			"wrap",
			"id",
			"class"
		];

		$.each(options, function(index, value) {
    		if(textareaAllowedAttributes.indexOf(index) == -1) {
    					throw 'Textarea attr error : ' + index;
    		}
		});

		return this.textarea.generate(options, formBuilder);
	};

	FormBuilder.prototype.elements.textarea.generate = function(options, formBuilder) {
		var content = options.content ? options.content : '';
		return '<textarea ' + formBuilder.renderFieldAttributes(options, formBuilder) + '>' + content + '</textarea>';
	}

	FormBuilder.prototype.elements.choice = function(options, formBuilder) {
		var choiceAllowedAttributes = [
			'name',
			'type',
			'choiceType',
			'opts'
		];

		$.each(options, function(index, value) {
    		if(choiceAllowedAttributes.indexOf(index) == -1) {
    					throw options.choiceType + ' attr error : ' + index;
    		}
		});

		return this.choice.generate(options, formBuilder);
	}

	FormBuilder.prototype.elements.choice.generate = function(options, formBuilder) {
		var opts = "";
		if(options.opts !== undefined) {
			$.each(options.opts, function(index, o) {
				opts += '<label><input type="'+ options.choiceType +'" name='+ options.name +' '+ formBuilder.renderFieldAttributes(o, formBuilder) +'>'+o.label+'</label>';
			});
		}
		return opts;
	}

	FormBuilder.prototype.buildElement = function(options) {
		return this.elements[options.type](options, this);
	};

    $.fn.formify = function(options) {
    	var formBuilder = new FormBuilder(); 
    	var render = '<form ' + formBuilder.renderFormAttributes(options.form) + '>';

		$.each(options.fields, function(index, el) {
			render += formBuilder.buildElement(el);
		});

    	render += '</form>';

    	this.append(render);

        return this;
    };
}( jQuery ));