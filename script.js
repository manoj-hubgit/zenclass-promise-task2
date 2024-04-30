//accessing the input and button.
const buttons = document.getElementsByClassName("button")[0];
const amount = document.getElementsByClassName("amount")[0];
const code = document.getElementsByClassName("code")[0];
//the function will start after the button is clicked.
buttons.addEventListener("click", function () {

  //if the input field is empty it will show alert.
  if (amount.value === "" || code.value === "") {
    alert("Enter the valid input");
  }
  // if the amount.value is not a number then it will show alert.
  if (isNaN(amount.value)) {
    code.value ="";
    amount.value ="";
    alert("Please enter a valid numeric amount");
  }
    //if the currency code input is in capital letter then it will cheng to lowercase.
    const currencyCode = code.value.toLowerCase();
    //using fetch to get data from api.
    //the api have template litrals to get currency code value.
    const response = fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode}.json`
    );
    response
      .then((data) => data.json()) 
      .then((result) => {
        //if we get usd in code.value .It will get the inr value in api for usd
        let indrupees = result[currencyCode].inr;
        let rupees = (indrupees * amount.value).toFixed(2);
        //whenever we get the result the search button will be disappear.
        buttons.style.display = "none";
        // console.log(rupees);
        //creating a h2 to display the amount in rupees
        let div = document.createElement("div");
        let para = document.createElement("h2");
        
        para.innerHTML = `${amount.value} ${code.value.toUpperCase()} is ${rupees} Rupees`;
        div.classList = "result ms-2 align-content-sm-center";
        let refresh = document.createElement("button");
        refresh.innerText = "Reset";
        refresh.classList = "btn btn-outline-primary ms-2 reset";
        refresh.type = "button";
        div.append(para, refresh);
        document.body.append(div);
        //To reset used windows refresh to reset.
        const reset = document.getElementsByClassName("reset")[0];
        reset.addEventListener("click", () => {
          window.location.reload();
        });
      });
});
