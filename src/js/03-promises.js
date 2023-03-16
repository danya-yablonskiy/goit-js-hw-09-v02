const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

function onSubmitForm(e){
  e.preventDefault();
  
}