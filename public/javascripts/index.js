const value = {
  default: 'Enter your hero id here:',
  current: 'Enter your hero id here:'
}
const input = document.querySelector('#myInput');
const submit = document.querySelector('#mySubmit');

const handleInput = (e) => {
  value.current = e.target.value;
  e.target.value = value.current;
}

const handleFocus = (e) => {
  if (
    value.current === value.default
  ) {
    value.current = '';
    e.target.value = value.current;
  }
}

const handleBlur = (e) => {
  if (
    !value.current.trim()
  ) {
    value.current = value.default;
    e.target.value = value.current;
  }
}

const handleSubmit = () => {
  if (
    value.current === value.default
  ) {
    return ;
  }
  window.location.href = 'http://localhost:3000/' + value.current;
};

if (
  input
) {
  input.value = value.default;
  input.addEventListener('input', handleInput);
  input.addEventListener('focus', handleFocus);
  input.addEventListener('blur', handleBlur);
}

if (
  submit
) {
  submit.addEventListener('click', handleSubmit);
}
