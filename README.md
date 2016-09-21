# Jquery formify extension
A tiny jquery extension to build forms from JSON schema.
# Manual
Include the minified file in your project
````html
<script type="text/javascript" src="js/jquery.formify.min.js"></script>
````
# Usage
````javascript
$('#formify').formify(
		{
			form : {
				action : "http://127.0.0.1/form-validation.php",
				method : "POST",
			},
			fields : [
			{ 
				name : "firstname", 
			  	type : "input", 
			  	inputType : "text",
			  	placeholder : "Enter your firstname",
			  	class : "form-control"
			},
			{ 
				name : "lastname", 
			  	type : "input", 
			  	inputType : "text",
			  	placeholder : "Enter your lastname",
			  	class : "form-control"
			},
			{
				name : "address",
				type : "textarea",
				placeholder: "Enter your address",
				cols : 6,
				rows : 6,
			  	class : "form-control"
			},
			{
				name : "gender",
				type : "choice",
				choiceType : "radio",
				opts : [{label : "Male", value : "male", checked : true},
						{label: "Female", value : "female"},
						{label: "Shemale", value : "shemale"}]
			},
			{
				name : "Random choice",
				type : "select",
				opts : [{ name : "Choice 1", value : "choice1"}, 
						{name : "Choice 2", value : "choice2"}],
				class : "form-control"
			},		
			{
				type : "input",
				inputType: "submit",
				value: "Submit",
				class : "btn btn-primary"
			}
		]
	}
);
````
# ToDo
+ Implement ajax and check inputs on form validation