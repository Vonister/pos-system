export const exportData = (props) => {
  const { type, columns, data, title } = props;
  if (type === 'print') {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
  <html>
    <head>
      <title>&nbsp;</title>
      <style>
       @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@200;300;400;500;600;700;800;900&family=Merriweather:wght@300;400;700&display=swap');

        body {
         font-family: 'EB Garamond', serif;
        }

        .print-header {
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 2px solid #000;
          padding-bottom: 0.2rem;
        }

        .print-header h3,h4, h5, p {
          margin: 0;
          margin-block: 1px;
        }

        p {
          font-size: 12px;
          font-weight: 500;
        }

        .subtitle{
          font-family: 'Inter', sans-serif;
        }

        .bold{
          font-weight: 700;
        }

        .print-header img {
          position: absolute;
          left: 0;
        }

        .print-header .text-center {
          text-align: center;
        }

        .print-header .fw-bold {
          font-weight: bold;
        }

        .print-header .text-danger {
          color: red;
        }

        .print-header .text-primary {
          color: blue;
          text-decoration: underline;
        }

        .print-table {
          border-collapse: collapse;
          width: 100%;
          table-layout: fixed;
          font-size: 11px;
          font-family: 'Inter', sans-serif;
        }

        .print-table th {
          border-bottom: 1px solid #000;
          padding: 0.5rem;
          text-align: start;
          font-weight: 700;
          font-size: 12px;
        }

        .print-table td {
          padding: 0.3rem;
          padding-block: 0.5rem;
          border-bottom: 1px solid rgb(247, 247, 247);
        }

        .print-table tr:nth-child(even){
          background: #FAFAFA;
        }

        .print-title {
          text-align: center;
          margin-block: 0.5rem;
          text-transform: uppercase;
          font-weight: bold;
           font-family: 'Inter', sans-serif;
        }

        @media print{
          .print-table {
              text-align: center;
            }
          .print-table th{
              text-align: center;
          }
           .print-table th:first-child {
            text-align: start;
            background: red;
          }

          .print-table td:first-child {
            text-align: start;
          }

        }

      </style>
    </head>
    <body>
      <div class="print-header">
       
        <div class="text-center">
          <h4 class="fw-bold">Republic of the Philippines</h4>
          <h3 class="fw-bold">WcDonalds Philippines</h3>
          <h5 class="text-danger subtitle">The Most Trusted Restaurant</h5>
          <p class="bold">Tanauan City, Batangas, Philippines 4233</p>
          <p>Tel Nos.: +123456789</p>
          <p>E-mail Address: <span class="text-primary">wcdonalds@email.abc</span> | Website: <span class="text-primary">http://www.wcdonaldsmema.abc</span></p>
        </div>
      </div>
      <div class="print-title">
        ${title.props.children[1]}
      </div>
      <table class="print-table">
        <thead>
          <tr>
            ${columns.map((column) => `<th>${column.name}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (row) => `
            <tr>
              ${columns
                .map((column) => `<td>${column?.selector(row) || ''}</td>`)
                .join('')}
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
      <script type="text/javascript">
        window.onload = function() {
          setTimeout(function() {
             window.print();
          }, 300); 
        };

        window.onafterprint = function() {
          window.close();
        };
      </script>
    </body>
  </html>
`);

    printWindow.document.close();
  }

  if (type === 'csv') {
    function convertArrayOfObjectsToCSV(array) {
      let result;

      const columnDelimiter = ',';
      const lineDelimiter = '\n';
      const keys = Object.keys(data[0]);

      result = '';
      result += capitalizeWords(keys).join(columnDelimiter);
      result += lineDelimiter;

      array.forEach((item) => {
        let ctr = 0;
        keys.forEach((key) => {
          if (ctr > 0) result += columnDelimiter;

          result += item[key];

          ctr++;
        });
        result += lineDelimiter;
      });

      return result;
    }

    function capitalizeWords(words) {
      return words.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1);
        return firstLetter + restOfWord;
      });
    }

    function downloadCSV(array) {
      const link = document.createElement('a');
      let csv = convertArrayOfObjectsToCSV(array);
      if (csv == null) return;

      const currentDate = new Date()
        .toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, '');

      const filename = `${title.props.children[1]}_${currentDate}.csv`;

      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }

      link.setAttribute('href', encodeURI(csv));
      link.setAttribute('download', filename);
      link.click();
    }

    downloadCSV(data);
  }
};
