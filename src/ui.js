export const makeTable = () => {
  // TODO From here: https://stackoverflow.com/questions/35617964/drawing-a-table-with-vanilla-js-and-loops
  const array = [
    ['Car', 'Top Speed', 'Price'],
    ['Chevrolet', '120mph', '$10,000'],
    ['Pontiac', '140pmh', '$20,000']
  ] // Creating a data array which a loop will source from

  const table = document.createElement('table');
  document.body.appendChild(table); // Drew the main table node on the document

  array.forEach(function (row) {
    const tr = table.insertRow(); //Create a new row

    row.forEach(function (column) {
      const td = tr.insertCell();
      td.innerText = column; // Take string from placeholder variable and append it to <tr> node
    });
  });
};