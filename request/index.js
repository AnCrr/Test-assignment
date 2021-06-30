async function getResponse() {
  // send request and get data from the server
  let response = await fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0',)
  // turn data to json array
  let content = await response.json();

  let table = document.querySelector('.elements')

  let key;
  // process our array by pushing it`s elements into the table
  for (key in content) {
    table.innerHTML +=
      `<tr class="element">
        <td>${content[key].Cur_Name}</td>
        <td>${content[key].Cur_Scale} ${content[key].Cur_Abbreviation}</td>
        <td>${content[key].Cur_OfficialRate}</td>
      </tr>`
  }

}
getResponse()