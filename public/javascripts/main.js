$(document).ready(() => {
  $(".checkboxDone").click((event) => {
    let id = event.target.id;
    $(`#submitDone${id}`).click();
  });
});
