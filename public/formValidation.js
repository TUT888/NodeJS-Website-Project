/* ------ Query form ------ */
function validateQueryForm() {
    // Patterns for validation
    let emailPattern = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    let notDigitPattern = /\D/;
    let phonePattern = /\d{10}/;
    let postcodePattern = /\d{4}/;
    let stateList = ["nsw", "vic", "qld", "wa", "sa", "tas"];
    let queryTypeList = ["queryProduct", "queryFeedback", "queryDelivery", "queryOther"];

    // Get the message element
    let inputFirstnameMess= document.getElementById("inputFirstnameMess");
    let inputSurnameMess= document.getElementById("inputSurnameMess");
    let inputMobileMess= document.getElementById("inputMobileMess");
    let inputEmailMess= document.getElementById("inputEmailMess");
    let inputAddressMess = document.getElementById("inputAddressMess");
    let inputCityMess= document.getElementById("inputCityMess");
    let inputStateMess= document.getElementById("inputStateMess");
    let inputPostcodeMess= document.getElementById("inputPostcodeMess");
    let inputQueryTypeMess = document.getElementById("inputQueryTypeMess");
    let inputQueryDetailMess = document.getElementById("inputQueryDetailMess");

    // Get the form element
    let formElement = document.forms["queryForm"];
    let inputFirstname = formElement["firstname"].value;
    let inputSurname = formElement["surname"].value;
    let inputMobile = formElement["mobile"].value;
    let inputEmail = formElement["email"].value;
    let inputAddress = formElement["address"].value;
    let inputCity = formElement["city"].value;
    let inputState = formElement["states"].value;
    let inputPostcode = formElement["postcode"].value;
    let inputQueryType = formElement["queryType"].value;
    let inputQueryDetail = formElement["queryDetail"].value;

    // Validate input firstname & lastname
    if ( inputFirstname=="" ) {
        showError(inputFirstnameMess, "You did not enter your firstname", false);
        return false;
    } else {
        hideError(inputFirstnameMess);
    }
    if ( inputSurname=="" ) {
        showError(inputSurnameMess, "You did not enter your surname", false);
        return false;
    } else {
        hideError(inputSurnameMess);
    }
    
    // Validate input phone number
    let charInPhone = notDigitPattern.exec(inputMobile);
    if (charInPhone) {
        showError(inputMobileMess, `Contains character '${charInPhone[0]}'. Numbers only!`, false);
        return false;
    } else if (inputMobile.length!=10 || !phonePattern.test(inputMobile) ) {
        showError(inputMobileMess, "Phone number should be in 10 digits", false);
        return false;
    } else {
        hideError(inputMobileMess);
    }

    // Validate input email
    if ( !emailPattern.test(inputEmail) ) {
        showError(inputEmailMess, "You have entered invalid email", false);
        return false;
    } else {
        hideError(inputEmailMess);
    }

    // Validate city
    if ( inputAddress=="" ) {
        showError(inputAddressMess, "You did not enter your address", false);
        return false;
    } else {
        hideError(inputAddressMess);
    }

    // Validate city
    if ( inputCity=="" ) {
        showError(inputCityMess, "You did not enter your city", false);
        return false;
    } else {
        hideError(inputCityMess);
    }

    // Validate state
    if ( !stateList.includes(inputState) ) {
        showError(inputStateMess, "Please choose a valid state", false);
        return false;
    } else {
        hideError(inputStateMess);
    }

    // Validate postcode
    let charInPostcode = notDigitPattern.exec(inputPostcode);
    if (charInPostcode) {
        showError(inputPostcodeMess, `Contains character '${charInPostcode[0]}'. Numbers only!`, false);
        return false;
    } else if (inputPostcode.length!=4 || !postcodePattern.test(inputPostcode) ) {
        showError(inputPostcodeMess, "Postcode should be in 4 digits", false);
        return false;
    } else {
        hideError(inputPostcodeMess);
    }

    // Validate query type
    if ( !queryTypeList.includes(inputQueryType) ) {
        showError(inputQueryTypeMess, "Please choose a valid query type", false);
        return false;
    } else {
        hideError(inputQueryTypeMess);
    }

    // Validate query detail
    if ( inputQueryDetail=="" ) {
        showError(inputQueryDetailMess, "Please enter your query in this field", false);
        return false;
    } else {
        hideError(inputQueryDetailMess);
    }
    return true;
    // document.getElementById("queryForm").submit();
}

function resetQueryForm() {
    // Get the message element
    document.getElementById("inputFirstnameMess").classList.add("d-none");
    document.getElementById("inputSurnameMess").classList.add("d-none");
    document.getElementById("inputMobileMess").classList.add("d-none");
    document.getElementById("inputEmailMess").classList.add("d-none");
    document.getElementById("inputAddressMess").classList.add("d-none");
    document.getElementById("inputCityMess").classList.add("d-none");
    document.getElementById("inputStateMess").classList.add("d-none");
    document.getElementById("inputPostcodeMess").classList.add("d-none");
    document.getElementById("inputQueryTypeMess").classList.add("d-none");
    document.getElementById("inputQueryDetailMess").classList.add("d-none");
}

function showError(element, message, isSuccess) {
    element.classList.remove("d-none");
    element.innerHTML = message;
    if (isSuccess) {
        element.classList.remove("text-danger");
        element.classList.add("text-success");
    } else {
        element.classList.remove("text-success");
        element.classList.add("text-danger");
    }
}

function hideError(element) {
    element.classList.add("d-none");
    element.classList.remove("text-danger");
}