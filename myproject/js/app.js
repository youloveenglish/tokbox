// replace these values with those generated in your TokBox Account
var apiKey = "45954022";
var sessionId = "2_MX40NTk1NDAyMn5-MTUwNDcyMTkxMDA3NH5ub1ZOdmVyVVlJUmdNb3lqdVFrZWlnR0l-UH4";
var token = "T1==cGFydG5lcl9pZD00NTk1NDAyMiZzaWc9Y2U1MDBiYWU2YzYwYWQ5NGQwNTdkMzQwYTY3ZDUwMzE0N2MzYmNhMDpzZXNzaW9uX2lkPTJfTVg0ME5UazFOREF5TW41LU1UVXdORGN5TVRreE1EQTNOSDV1YjFaT2RtVnlWVmxKVW1kTmIzbHFkVkZyWldsblIwbC1VSDQmY3JlYXRlX3RpbWU9MTUwNDcyMjAyMiZub25jZT0wLjkwNTAwMTMwMjgyMDQyNTYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUwNTMyNjgyMSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
    var SERVER_BASE_URL = 'https://youloveenglish-videochat.herokuapp.com/';
    fetch(SERVER_BASE_URL + '/session').then(function(res) {
      return res.json()
    }).then(function(res) {
      apiKey = res.apiKey;
      sessionId = res.sessionId;
      token = res.token;
      initializeSession();
    }).catch(handleError);


  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
