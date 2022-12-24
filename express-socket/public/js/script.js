
$(document).ready(() => {
  const socket = io.connect(); 
  const nickName = $('.login-form #nickname');
  const loginForm = $('.login-form');
  const messageForm = $('.message-form');
  const messagesList = $('.messages-list');
  const usersList = $('.users-list');
  const messageInput = $('.message-form .message');

  loginForm.submit((e) => {
    e.preventDefault();
    socket.emit('login', nickName.val());
  });

  messageForm.submit((e) => {
    e.preventDefault();
    socket.emit('message', messageInput.val());
    messageInput.val('');
  });

  // listners
  socket.on('login', (data) => {
    if(data.status === 'OK') {
      loginForm.hide();
      messageForm.removeClass('d-none');
      messagesList.removeClass('d-none');
      usersList.removeClass('d-none');
    }
  });

  socket.on('new message', (data) => {
    let newMSg = `
              <a class="list-group-item list-group-item-acton">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">${data.nickName}</h5>
                  <small class="text-muted">${new Date(data.time)}</small>
                </div>
                <p class="mb-1">${data.message}</p>
              </a>
    `;

    messagesList.children('ul').append(newMSg);
  });

  socket.on('users', (data) => {
    usersList.children('ul').html('');
    data.users.forEach(user => {
      usersList.children('ul').append(`<li class="list-group-item">${user}</li>`);
    });

  });
});