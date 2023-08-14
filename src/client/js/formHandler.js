function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  if (formText.trim() === "") {
    window.alert("Please enter a value");
    return;
  }

  Client.checkForName(formText);

  console.log("::: Form Submitted :::");
  fetch(`http://localhost:8080/test?text=${formText}`)
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById("results").innerHTML = JSON.stringify(res);
    });
}

export { handleSubmit };
