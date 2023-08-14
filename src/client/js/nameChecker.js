function checkForName(inputText) {
  console.log("::: Running checkForName :::", inputText);
  let names = ["Picard", "Janeway", "Kirk", "Archer", "Georgiou"];

  if (names.includes(inputText) && typeof window !== "undefined") {
    window.alert("Welcome, Captain!");
  }

  return "Welcome";
}

export { checkForName };
