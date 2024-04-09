function createlineChart(expenses) {
    const chart = document.querySelector('#myChart');
    const labels = expenses.map(expense => expense.category);
    const dataValues = expenses.map(expense => parseInt(expense.expense));

    const negativeDataValues = dataValues.map(value => -value);
    new Chart(chart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Expenses',
                    data: negativeDataValues,
                    borderColor: 'red',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return `-₹${Math.abs(value)}`;
                        }
                    }
                }]
            }
        }
    });
}



// Pie-Chart

function createChart(top3Expenses) {
    const piechart = document.querySelector('#Chart');

    const labels = top3Expenses.map(expense => expense.category);
    const dataValues = top3Expenses.map(expense => parseInt(expense.expense));
    const negativeDataValues = dataValues.map(value => -value);

    new Chart(piechart, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Expenses',
                    data: negativeDataValues,
                    backgroundColor: ['red', 'blue', 'green'],
                    borderColor: 'white',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            hover: {
                mode: 'index'
            }
        }
    });
}




