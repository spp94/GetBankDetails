$(document).ready(function(){
    // function to validate if IFSC Code is a valid one or not
    function validateIFSC(ifsc) {
        var inputVal = ifsc; // variable to store ifsc code
        var numericReg = /^[A-Za-z]{4}\d{7}$/; // regex to validate a valid IFSC Code
        if (!numericReg.test(inputVal)) { // checking if a ifsc code is a valid one or not   
            return false;  // return false if invalid ifsc code
        }
        else {
            return true; // returns true if valid ifsc code
        }
    }
    // function to fetch bank details using the IFSC Code 
    function getBankDetails() {
        // variable to store the IFSC Code entered by the user
        var ifscCode = $("#txtIFSCCode").val();
        // to validate if the IFSC code is entered by user or not
        if (ifscCode != '') {
            if (validateIFSC(ifscCode)) {
                // using the AJAX call to get all bank info using ifsc code as input parameter
                $.ajax({
                    url: ' https://ifsc.razorpay.com/' + ifscCode, // have used free api 'https://ifsc.razorpay.com' to fetch details
                    type: "GET",
                    dataType: "json",
                    success: function (data) { // if we get data successfully
                        var widget = showResults(data)  // variable to store the data as tabular html form
                        $("#showDetails").html(widget); // bind the data into html tabluar form
                        $('#showDetails').show(); // show the binded data to user
                    },
                    failure: function (date) { // if there is any issue while fetching details and AJAX call is failed
                        alert('Invalid IFSC Code'); // we give an alert saying that 'Invalid IFSC Code'
                        $('#showDetails').hide(); // hide the binded data from user
                        $('#txtIFSCCode').val(''); // empty the textbox value of IFSC Code
                    }
                });
            }
            else { // if user enters wrong IFSC Code
                alert('Please enter the Valid IFSC Code');  // we gave an alert saying 'Please enter the Valid IFSC Code' 
                $('#showDetails').hide(); // hide the binded data from user
                $('#txtIFSCCode').val(''); // empty the textbox value of IFSC Code
            }
        }
        else { // if user didn't entered any value in textbox
            alert('Please enter the IFSC Code'); // we gave an alert saying 'Please enter the IFSC Code' 
            $('#showDetails').hide(); // hide the binded data from user
            $('#txtIFSCCode').val(''); // empty the textbox value of IFSC Code
        }

    }
    // function to convert AJAX function returned data into html tabular form
    function showResults(data) {
        var text = "<br><br>" + "<table id = 'tblDetails'>" +
                "<tr><td><h4>Bank: </td><td>" + data.BANK + "</h4></td></tr>" +
                "<tr><td><h4>Branch Name: </td><td>" + data.BRANCH + "</h4></td></tr>" +
                "<tr><td><h4>Address: </td><td>" + data.ADDRESS + "</h4></td></tr>" +
                "<tr><td><h4>Contact: </td><td>" + data.CONTACT + "</h4></td></tr>" +
                "<tr><td><h4>City: </td><td>" + data.CITY + "</h4></td></tr>" +
                "<tr><td><h4>District: </td><td>" + data.DISTRICT + "</h4></td></tr>" +
                "<tr><td><h4>State: </td><td>" + data.STATE + "</h4></td></tr>" +
                "<tr><td><h4>Bank Code: </td><td>" + data.BANKCODE + "</h4></td></tr>";
        +"</table>"
        return text;
    }
    // function called on click of Search Button
    $("#btnSubmit").click(function () { 
        getBankDetails(); // calling function so as to fetch the bank details
    });
});
