// https://catfact.ninja/facts

let previous = document.getElementById("previous");
let paginationValue = document.getElementById("paginationValue");
let next = document.getElementById("next");

let inputPage = 1;
let inputLimit;
let count = 0;
let pageNum = document.getElementById("pageNum");
let limit = document.getElementById("limitOption");
pageNum.addEventListener("input", (e) => {
  inputPage = e.target.value;
  paginationValue.innerText = inputPage;
  fetchingApi();
});
limit.addEventListener("input", (e) => {
  inputLimit = e.target.value;
  if (inputLimit > 34) {
    return;
  } else {
    fetchingApi();
  }
});
fetchingApi();

async function fetchingApi() {
  const params = new URLSearchParams({
    limit: 10,
    // offset: 6 * 10,
  });
  let firstResponse = await fetch(
    `https://catfact.ninja/facts?${params.toString()}&page=${inputPage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let secondResponse = await firstResponse.json();
  let responseData = secondResponse.data;
  let para = document.getElementById("mainSection");
  para.innerHTML = " ";
  let ul = document.createElement("ul");
  para.appendChild(ul);
  sliceLimit = responseData.slice(0, inputLimit || 10);
  sliceLimit.forEach((info) => {
    let li = document.createElement("li");
    li.setAttribute("style", "margin:15px");
    ul.appendChild(li);
    li.innerText = info.fact;
  });

  console.log(responseData.slice(0, inputLimit));
}

previous.addEventListener("click", () => {
  inputPage = inputPage - 1;
  paginationValue.innerText = inputPage || 1;

  fetchingApi();
});
next.addEventListener("click", () => {
  inputPage = inputPage + 1;
  paginationValue.innerText = inputPage;
  fetchingApi();
});
