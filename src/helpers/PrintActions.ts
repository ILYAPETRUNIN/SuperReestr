interface Table {
  headers: Array<string>;
  data: Array<any>;
}

export default abstract class PrintActions {
  private static addCell(row: HTMLTableRowElement, text: string) {
    const newText = document.createTextNode(text);
    const cell = row.insertCell();
    if (text) cell.appendChild(newText);
  }

  private static formTable(table: Table): HTMLTableElement {
    const resTable = document.createElement("table");

    const thead = resTable.createTHead().insertRow();
    const tbody = resTable.createTBody();

    table.headers.forEach((head: any) => {
      console.log(head);
      this.addCell(thead, head.label);
    });

    table.data.forEach((row: any) => {
      const currRow = tbody.insertRow();
      for (const key in row) {
        this.addCell(currRow, row[key]);
      }
    });
    return resTable;
  }

  static printTable(table: Table) {
    const resTable = this.formTable(table);
    resTable.border = "3";
    resTable.style.borderCollapse = "collapse";
    const WinPrint = window.open(
      "",
      "",
      "left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0"
    );
    if (WinPrint) {
      WinPrint.document.body.appendChild(resTable);
      WinPrint.print();
      WinPrint.addEventListener("afterprint", () => {
        WinPrint?.close();
      });
    }
  }
}
