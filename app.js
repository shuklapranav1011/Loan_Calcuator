const loadIcon = document.querySelector('#loading');
const result = document.querySelector('#results');

loadIcon.style.display = "none";
result.style.display = "none";

document.querySelector('#load-form').addEventListener('submit', function(e){

    //hide results
    result.style.display = "none";

    //show loader
    loadIcon.style.display = "block";

    setTimeout(calculateResult,2000);
    e.preventDefault();
});

function calculateResult(){
     
    const amount = document.querySelector('#amount');
    const rate = document.querySelector('#rate');
    const year = document.querySelector('#year');
    
    if(amount.value <=0 || year.value <=0){
        showError();
    }
    else{

        const UImonth = document.querySelector('#month');
        const UIamount = document.querySelector('#total_amount');
        const UIinterest = document.querySelector('#total_interest');

        const principal = parseFloat(amount.value);
        const calculatedInterest = parseFloat(rate.value)/100/12;
        const calculatedPayments = parseFloat(year.value) * 12;

        //monthly payment
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest)/(x-1);

        if(isFinite(monthly)){

            UImonth.value = monthly.toFixed(2);
            UIamount.value = (monthly * calculatedPayments);
            UIinterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

            //show results hide loader
            loadIcon.style.display = "none";
            result.style.display = "block"; 
        }
        else{
            showError();
            amount.value = 0;
            rate.value = 0;
            year.value = 0;
            UIamount.value = 0;
            UIinterest.value = 0;
            UImonth.value = 0;
        }
    }
}

function showError(){
    loadIcon.style.display = "none";
    result.style.display = "none";
    const errorRow = document.createElement('div');
    errorRow.className = "row error";
    const errorCol = document.createElement('div'); 
    errorCol.className = "col s12 red lighten-3 white-text center-align";
    errorCol.style.padding = "30px";
    errorRow.appendChild(errorCol);
    const errorMsg = "Please correct your input";
    errorCol.appendChild(document.createTextNode(errorMsg));

    // inserting in dom
    const card = document.querySelector('.card-content');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorRow,heading);

    setTimeout(clearError,3000);
}

function clearError(){
    document.querySelector('.error').remove();
}


