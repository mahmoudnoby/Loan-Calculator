document.getElementById('loan_form').addEventListener('submit', function(e) {
  document.getElementById("resaults").style.display = "none";
  document.getElementById("loading").style.display = "block";
  setTimeout(calaculateResault, 2000)
  e.preventDefault();
});

function calaculateResault() {
//UI Elements 
  const amount = document.getElementById('amount');
  const interset = document.getElementById('interset');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterset = document.getElementById('total-interset');
  const principal = parseFloat(amount.value);
  const claculatedInterset = parseFloat(interset.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12 ;

  // compute monthly payment 

  const x = Math.pow(1 +claculatedInterset , calculatedPayment);
  const monthly = (principal*x*claculatedInterset)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value= (monthly * calculatedPayment).toFixed(2);
    totalInterset.value= ((monthly * calculatedPayment)-principal).toFixed(2);
    document.getElementById("resaults").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else
  {
    displayErrorMessage('Please  Check  Your Numbers')
  }
}

function displayErrorMessage(error) {
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading')
  const erroDiv = document.createElement('div');
  erroDiv.className= ('alert alert-danger');
  erroDiv.appendChild(document.createTextNode(error));
  card.insertBefore(erroDiv, heading);
  document.getElementById("loading").style.display = "none";

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}