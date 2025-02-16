// https://catfact.ninja/facts

let previous = document.getElementById("previous");
let paginationValue = document.getElementById("paginationValue");
let next = document.getElementById("next");
const loader = document.getElementById('loader')

const paginationListHolder = document.getElementById('pagination-list-holder')


let inputPage = 1;
let inputLimit;
let count = 0;
// let pageNum = document.getElementById("pageNum");
let limit = document.getElementById("limitOption");
// pageNum.addEventListener("input", (e) => {
//   inputPage = e.target.value;
//   paginationValue.innerText = inputPage;
//   fetchingApi();
// });
limit.addEventListener("input", (e) => {
  inputLimit = e.target.value;
  if (inputLimit > 34) {
    return;
  } else {
    fetchingApi();
  }
});
fetchingApi();

const createPaginationNumberBtn = (linkObj, currentPage) => {
  const linkAnchor = document.createElement('a')
  linkAnchor.href = linkObj.url
  linkAnchor.innerText = linkObj.label
  linkAnchor.style.padding = '1rem'
  if (linkObj.active) {
    linkAnchor.style.border = '1px solid black'
  }
  linkAnchor.target = '_blank'
  return linkAnchor
}


async function fetchingApi() {
  loader.style.display = 'block'
  const params = new URLSearchParams({
    limit: 10,
    // offset: 6 * 10,
  });
  let firstResponse = await fetch(
    `https://catfact.ninja/facts?${params.toString()}&page=${10}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let catFactsResponseData = await firstResponse.json();
  let responseData = catFactsResponseData.data;
  let para = document.getElementById("mainSection");
  para.innerHTML = " ";
  let ul = document.createElement("ul");
  para.appendChild(ul);
  sliceLimit = responseData.slice(0, inputLimit || 10);
  loader.style.display = 'none'

  sliceLimit.forEach((info) => {
    let li = document.createElement("li");
    li.setAttribute("style", "margin:15px");
    ul.appendChild(li);
    li.innerText = info.fact;
  });

  const paginationLinks = catFactsResponseData.links
  const currentPage = catFactsResponseData.current_page
  paginationLinks.forEach((link) => {
    const paginationAnchorElement = createPaginationNumberBtn(link, currentPage)
    paginationListHolder.appendChild(paginationAnchorElement)
  }
  )
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
