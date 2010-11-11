(function( $ ) {

	var methods = {

		init: function( options ) {

			options = $.extend( {}, $.multipleChoicesQuestion.defaults, options || {} );

			return this.each(function() {
				var $this = $(this),
				name = $this.attr('id') + "_answer",
				html = "<div>";

				for ( var i in options.answers ) {
					html += '<input type="radio" name="' + name + '" />' + options.answers[i]; 
				}

				html += "</div>";

				var $answer = $(html).appendTo( $this ),
				$choices = $answer.find("input");

				$choices.bind("click.multipleChoice", options.afterChoice);
				$this.data("choices", {
					correctChoiceIndex: options.correctChoiceIndex
				});
			});

		},

		correct: function() {

			var $this = $(this[0]),
			data = $this.data("choices");

			return $this.find("input").filter(":checked").index() == data.correctChoiceIndex;

		}

	};

	$.fn.multipleChoicesQuestion = function( method ) {

		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof method === "object" || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( "O método " + method + " não existe no jQuery.multipleChoices" );
		}

	};

	$.multipleChoicesQuestion = {

		defaults: {
			answers: ["Sim", "Não", "Talvez"],
			correctChoiceIndex: 0,
			afterChoice: $.noop
		},

		setDefaults: function( defaults ) {
			$.extend( this.defaults, defaults );
		}

	};

})( jQuery );
