$('document').ready(() => {
	// Sum of dot readings
	let total = 0;
	// Should equal to the value set on style.css under the ".card-body > .img-fluid" transition;
	const APPEAR_DURATION = 1000; // milliseconds
	const ROLL_DURATION = 2000;   // milliseconds

	// Update the total label
	function updateResult() {
		$('#result > p').text('Total: ' + total);
	}

	// Selecting the reset button
	$('#reset').click(function() {
		total = 0;
		$(".card-body > img").removeClass("roll").addClass("hidden");
		$(".card-body > button").prop("disabled", false);
		$(".card > .card-header").removeClass("alert-success").addClass("alert-secondary").text("Unrolled");
		updateResult();
	})

	// Selecting all roll buttons
	const btnSelector = $(".card-body > button");
	// Setting the event handler for the 'Roll' buttons
	btnSelector.click(function() {
		btnClick($(this).attr('id'));
	})

	function btnClick(btnID) {
		// Get the dice image name based on the last number in the button's id
		let dice = $("#dice" + btnID[btnID.length - 1]);
		// Change the status of the alarm panel
		$('#' + btnID).prop("disabled", true); // Disable the button
		dice.removeClass("hidden"); // Display the dice
		// Disable reset button to prevent possible conflicts
		$("#reset").prop("disabled", true);
		let dots = Math.floor(Math.random() * 6 + 1); // Randomly generate the dice displayed number

		// Things inside happen right after rolling starts
		window.setTimeout(() => {
			// Display roll animation using CSS transitions
			dice.addClass("roll");
			// Update status card => Rolling
			dice.parent().parent().children(".card-header").addClass("alert-warning").removeClass("alert-secondary").text("Rolling");
		} , APPEAR_DURATION);

		// Things inside happen right after rolling finishes
		window.setTimeout(() => {
			// Return reset button to initial state after rolling is done
			$("#reset").prop("disabled", false);
			// Pick an image based on the previously generated number
			dice.attr("src", "img/dice" + dots + ".png");
			// Update status card => Rolled
			dice.parent().parent().children(".card-header").addClass("alert-success").removeClass("alert-warning").text("Rolled (" + dots + ")");
			// Change total global variable
			total += dots;
			updateResult();
			if (total == 24) {
				alert("Wow! You got a total of 24, The probability of getting that total is 1/6^4 which is 1 out of 1296 4-dice rolls.");
			};

		}, APPEAR_DURATION + ROLL_DURATION);
	};
});