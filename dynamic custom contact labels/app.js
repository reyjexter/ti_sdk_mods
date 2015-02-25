var win = Ti.UI.createWindow({
	backgroundColor: '#ffffff'
});


var button = Ti.UI.createButton({
	width: 200,
	height: 50,
	title: "Save to address book"
});

win.add(button);


function performAddressBookFunction() {
	var people = Ti.Contacts.getAllPeople();
	var contactsToSave = [];
	
	for (var i=0; i<people.length; i++) {
		contactsToSave.push(people[i]);
		Ti.Contacts.removePerson(people[i]);
	}
	
	Ti.Contacts.save(contactsToSave);
	contactsToSave = [];
	
	Ti.Contacts.createPerson({
	  	firstName: 'Rey',
	  	lastName: 'Bumalay',	
	  	phone: {
	  		mobile: ['+63 9176490093', '+63 9176490094'],
	  		'Toll Free': ['1 800 1000000']
	  	},
	 	url: {
	  		homepage: ['http://www.kup4u.com'],
	  		'Resume/CV/BIO': ['http://www.myresume.com'],
	  		'Schedule as a Service': ['http://www.service.com']
	  	}
	});
	
	alert("Successfully saved");
}

function addressBookDisallowed() {
	alert("Address book disallowed");
}
	

button.addEventListener('click', function(e) {
	
	if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED){
	    performAddressBookFunction();
	} else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN){
	    Ti.Contacts.requestAuthorization(function(e){
	        if (e.success) {
	            performAddressBookFunction();
	        } else {
	            addressBookDisallowed();
	        }
	    });
	} else {
	    addressBookDisallowed();
	}
});

win.open();
