const showHint = () => {
  hint.style.display = 'block';
  hintButton.style.display = 'none';
}

const hint = document.querySelector('#hint');
const hintButton = document.querySelector('#hintButton');
hintButton.addEventListener('click', showHint);
