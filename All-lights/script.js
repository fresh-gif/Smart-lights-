var firebaseConfig = {
    apiKey: "AIzaSyBCj46mc4a_Q16K_IugcdRhE--UwLgv3Ug",
	authDomain: "authentication-app-b028b.firebaseapp.com",
	databaseURL: "https://authentication-app-b028b-default-rtdb.firebaseio.com",
	projectId: "authentication-app-b028b",
	storageBucket: "authentication-app-b028b.appspot.com",
	messagingSenderId: "1085046599528",
	appId: "1:1085046599528:web:fc65a4072f511d948030dd",
	measurementId: "G-JPER6CQJFJ"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

$(document).ready(function () {
    var database = firebase.database();
    var Led1Status;
    var powerValue = 0;
    var powerInterval;
    const toggleSwitch = document.getElementById("toggle");

    // Function to update the power value in the database
    function updatePowerInDatabase() {
		database.ref("Powerusage per Room/Kitchen/power").set(powerValue);
	}

    // Function to start incrementing power
    

    // Function to stop incrementing power
    

    database.ref("Led1Status").on("value", function (snap) {
        Led1Status = snap.val();
        if (Led1Status === "on") {
            $(".Light1Status").text("The light is off");
            document.getElementById("unact").style.display = "none";
            document.getElementById("act").style.display = "block";
            startPowerIncrement();
            toggleSwitch.checked = true;
        } else {
            $(".Light1Status").text("The light is on");
            document.getElementById("unact").style.display = "block";
            document.getElementById("act").style.display = "none";
            toggleSwitch.checked = false;
        }
    });

    // Retrieve and display the power value from the database on page load
    // Retrieve and display the power value from the "Kitchen/power" location in the database
	database.ref("Powerusage per Room/Kitchen/power").on("value", function (snap) {
		powerValue = snap.val() || 0;
		$("#power").text(powerValue);
	});


    $(".toggle-btn").click(function () {
        var firebaseRef = database.ref().child("Led1Status");

        if (Led1Status === "on") {
            firebaseRef.set("off");
            Led1Status = "off";
            toggleSwitch.checked = false;
        } else {
            firebaseRef.set("on");
            Led1Status = "on";
            toggleSwitch.checked = true;
        }
    });
});
