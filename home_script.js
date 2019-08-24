$(document).ready(function(){

    function validateIFSC(ifsc) {
        var inputVal = ifsc;
        var numericReg = /^[A-Za-z]{4}\d{7}$/;
        if (!numericReg.test(inputVal)) {
            return false;
        }
        else {
            return true;
        }
    }

    function getBankDetails() {
        var ifscCode = $("#txtIFSCCode").val();
        if (ifscCode != '') {
            if (validateIFSC(ifscCode)) {
                $.ajax({
                    url: ' https://ifsc.razorpay.com/' + ifscCode,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        var widget = showResults(data)
                        $("#showDetails").html(widget);
                        $('#showDetails').show();
                    },
                    failure: function (date) {
                        alert('Invalid IFSC Code');
                        $('#showDetails').hide();
                        $('#txtIFSCCode').val('');
                    }
                });
            }
            else {
                alert('Please enter the Valid IFSC Code');
                $('#showDetails').hide();
                $('#txtIFSCCode').val('');
            }
        }
        else {
            alert('Please enter the IFSC Code');
            $('#showDetails').hide();
            $('#txtIFSCCode').val('');
        }

    }

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
    $("#btnSubmit").click(function () {
        getBankDetails();
    });
});
