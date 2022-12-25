const form = document.querySelector('#shortForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const link = document.querySelector('#link');
  console.log('Link: ', link.value);
  const data = {link : link.value};

  console.log(data);

  fetch('/links/short', {
    method : 'POST',
    headers : {'Content-Type': 'application/json'},
    body : JSON.stringify(data)
  }).then((res) => res.json())
    .then((res) => {
      const ul = document.querySelector('#links');
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`Short link: ${res.short}, Original: ${res.source}`));
      ul.appendChild(li);
    });
})