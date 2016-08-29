// Initialize app and store it to cardinalScout variable for futher access to its methods
var cardinalScout = new Framework7();

// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// "Session" arrays to store data
var currentMatchData = [];

var localStorage = window.localStorage;
if (window.localStorage.getItem("installed") == undefined) {
  localStorage.setItem("iHopeThisWorks", "[]");
  localStorage.setItem("matches", '[]');
  window.localStorage.setItem("installed", true);
}

// Add view
var mainView = cardinalScout.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true,
});

// Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
  // Get page data from event data and do something
  var page = e.detail.page;
  if (page.name === 'matchdata') {
    document.getElementById('matchRawData').innerHTML = localStorage.getItem("matches");
  } else if (page.name === 'scan') {
    document.getElementById('scannedMatchData').innerHTML = localStorage.iHopeThisWorks;
  }
});

function saveSettings() {
  if (document.settings.scoutername.value != "") {
    currentMatchData[0] = document.settings.scoutername.value;
    cardinalScout.alert("Thank you " + currentMatchData[0] + ".", "Saved");
    mainView.router.loadPage('index.html');
  } else {
    cardinalScout.alert('No, your name cannot be blank.', 'Error');
  }
}

function beginPreMatch() {
  if (JSON.parse(localStorage.matches).length >= 1) {
    cardinalScout.confirm('You already have 1 or more matches saved. QR codes only hold ~4296 alphanumeric characters and will not generate if it exceeds. It is recommended that you scan the qr and reset before proceeding.', 'Warning', function () {
      mainView.router.loadPage('templates/prematch.html');
    });
  } else {
    mainView.router.loadPage('templates/prematch.html');
  }
}

function savePreMatch() {
  if (document.prematch.teamnumber !="" && document.prematch.matchnumber.value != "") {
    currentMatchData[1] = document.prematch.teamnumber.value;
    currentMatchData[2] = document.prematch.matchnumber.value;
    currentMatchData[3] = document.prematch.alliance.value;
    mainView.router.loadPage('templates/auton.html');
  } else {
    cardinalScout.alert("No, you cannot match scout without a team or match number.","Error");
  }
}

function saveAuton() {
  currentMatchData[4] = document.autonMoving.startingPosition.value;
  currentMatchData[5] = document.autonMoving.defence.value;
  currentMatchData[6] = document.autonMoving.defenceAction.value;
  currentMatchData[7] = document.autonShooting.goal.value;
  currentMatchData[8] = document.autonShooting.success.value;
  currentMatchData[9] = document.autonNotes.notes.value;
  mainView.router.loadPage('templates/teleop.html');
}

function saveTeleop() {
  cardinalScout.confirm('Are you sure you\'re done?', 'Confirm',
  function () {

    if (typeof currentMatchData[0]==='undefined') {
      cardinalScout.prompt('You didn\'t save your name in settings. Please do so after this match.', 'What is your name?',function (name) {
        currentMatchData[0] = name;
        currentMatchData[10] = document.teleopDefences.portcullis.value;
        currentMatchData[11] = document.teleopDefences.chevaldefrise.value;
        currentMatchData[12] = document.teleopDefences.moat.value;
        currentMatchData[13] = document.teleopDefences.ramparts.value;
        currentMatchData[14] = document.teleopDefences.drawbridge.value;
        currentMatchData[15] = document.teleopDefences.sallyport.value;
        currentMatchData[16] = document.teleopDefences.rockwall.value;
        currentMatchData[17] = document.teleopDefences.roughterrain.value;
        currentMatchData[18] = document.teleopDefences.lowbar.value;
        currentMatchData[19] = document.crossingNotes.notes.value;
        currentMatchData[20] = document.highGoal.scored.value;
        currentMatchData[21] = document.highGoal.missed.value;
        currentMatchData[22] = document.lowGoal.scored.value;
        currentMatchData[23] = document.lowGoal.missed.value;
        currentMatchData[24] = document.shooterNotes.notes.value;
        currentMatchData[25] = document.endGame.tower.value;
        currentMatchData[26] = document.endGame.scaleAttempts.value;
        currentMatchData[27] = document.boulderFed.from.value;
        currentMatchData[28] = document.teleopComments.comments.value;

        var retrievedMatchData = JSON.parse(localStorage.getItem("matches"));
        retrievedMatchData[retrievedMatchData.length] = currentMatchData;
        localStorage.setItem("matches", JSON.stringify(retrievedMatchData));

        currentMatchData = [currentMatchData[0]];

        cardinalScout.alert('Thank you for scouting!', 'Successfully saved');
        mainView.router.loadPage('index.html');
      });
    } else {

    currentMatchData[10] = document.teleopDefences.portcullis.value;
    currentMatchData[11] = document.teleopDefences.chevaldefrise.value;
    currentMatchData[12] = document.teleopDefences.moat.value;
    currentMatchData[13] = document.teleopDefences.ramparts.value;
    currentMatchData[14] = document.teleopDefences.drawbridge.value;
    currentMatchData[15] = document.teleopDefences.sallyport.value;
    currentMatchData[16] = document.teleopDefences.rockwall.value;
    currentMatchData[17] = document.teleopDefences.roughterrain.value;
    currentMatchData[18] = document.teleopDefences.lowbar.value;
    currentMatchData[19] = document.crossingNotes.notes.value;
    currentMatchData[20] = document.highGoal.scored.value;
    currentMatchData[21] = document.highGoal.missed.value;
    currentMatchData[22] = document.lowGoal.scored.value;
    currentMatchData[23] = document.lowGoal.missed.value;
    currentMatchData[24] = document.shooterNotes.notes.value;
    currentMatchData[25] = document.endGame.tower.value;
    currentMatchData[26] = document.endGame.scaleAttempts.value;
    currentMatchData[27] = document.boulderFed.from.value;
    currentMatchData[28] = document.teleopComments.comments.value;

    var retrievedMatchData = JSON.parse(localStorage.getItem("matches"));
    retrievedMatchData[retrievedMatchData.length] = currentMatchData;
    localStorage.setItem("matches", JSON.stringify(retrievedMatchData));

    currentMatchData = [currentMatchData[0]];

    cardinalScout.alert('Thank you for scouting!', 'Successfully saved');
    mainView.router.loadPage('index.html');
    }
  });
}

function cancelTeleop() {
  cardinalScout.confirm('Are you sure you want to cancel match scouting?','Confirm', function () {
    currentMatchData = [];
    mainView.router.loadPage('index.html');
    });
}

function generateMatchQR() {
  document.getElementById("qrcode").innerHTML = "\n";
  new QRCode(document.getElementById("qrcode"), localStorage.getItem("matches"));
}

function resetMatchData() {
  cardinalScout.confirm('You are about to delete all match data. This cannot be undone. You cannot generate any QR codes using this data anymore. Are you absolutely sure?', 'Warning',
  function () {
    localStorage.setItem("matches", "[]");
    cardinalScout.alert('You have cleared all match data.', 'Reset Successful');
    mainView.router.back();
  });
}

function shareMatchData() {
  window.plugins.socialsharing.share(JSON.parse(localStorage.getItem("matches")).join("\n"),"Individual CSV");
}

// More session variables
var scannedData;
var retrievedData = [];

function scanQR() {
  cordova.plugins.barcodeScanner.scan(
      function (result) {
			  scannedData = JSON.parse(result.text);
				document.getElementById('recentScannedMatchData').innerHTML = scannedData.join("\n•");
				retrievedData = JSON.parse(localStorage.iHopeThisWorks);
				for (i=0; i<scannedData.length; i++) {
					retrievedData[retrievedData.length] = scannedData[i];
				}
				localStorage.setItem("iHopeThisWorks", JSON.stringify(retrievedData));
				document.getElementById('scannedMatchData').innerHTML = JSON.parse(localStorage.getItem("iHopeThisWorks")).join("\n•");
      },
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}

function shareScannedData() {
  window.plugins.socialsharing.share(JSON.parse(localStorage.iHopeThisWorks).join("\n"));
}

function resetAllScannedData() {
  cardinalScout.confirm('You are going to delete all scanned QR Data.', 'Are you sure?',
  function () {
    localStorage.setItem("iHopeThisWorks", "[]");
    document.getElementById('scannedMatchData').innerHTML = JSON.parse(localStorage.getItem("iHopeThisWorks")).join("\n•");
  });
}

function beginPitScout() {
  cardinalScout.alert("To be released in a future update.","CardinalScout");
}
