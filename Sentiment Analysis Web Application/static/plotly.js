// Ensure the script runs after the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Read the JSON data embedded in the HTML
    const dataElement = document.getElementById('data');
    const data = JSON.parse(dataElement.textContent);

    const positiveCount = data.positive || 0;
    const neutralCount = data.neutral || 0;
    const negativeCount = data.negative || 0;
    const categories = data.categories || {};
    const topFiveCategories = data.top_five_categories || [];

    // Only render charts if there is data
    if (positiveCount > 0 || neutralCount > 0 || negativeCount > 0) {
        // Ensure the config object is defined
        const config = { responsive: true };
        /*===== Charts =====*/
        // Bar Chart
        const barChartTrace = {
            x: ["Positive", "Neutral", "Negative"],
            y: [positiveCount, neutralCount, negativeCount],
            name: "Sentiment Analysis Results",
            type: "bar",
            marker: {
                color: "#ea335d",
            },
        };


        /* 18.48 the const barChartTrace1 way can be use in sidebar graph with different category */

        const barChartData = [barChartTrace];
        const layout = {
            barmode: "stack",
            title: 'User Review Sentiment',
            paper_bgcolor: "#172042",
            plot_bgcolor: "#172042",
            showlegend: false,
            margin: {
                l: 30,
                r: 30,
                b: 30,
                t: 30,
                pad: 1,
            },
            font: {
                color: "#6b6f8a",
            }
        };

        Plotly.newPlot("barChart", barChartData, layout, config);

        /*19.25 linegraph*/

        const pieChartData = [
            {
                values: [positiveCount, neutralCount, negativeCount],
                lables: ["Positive", "Neutral", "Negative"],
                type: "pie",
            },
        ];

        const pieChartLayout = {
            title: 'User Review Sentiment',
            paper_bgcolor: "#172042",
            plot_bgcolor: "#172042",
            piecolorway: ["#ea335d", "#03dcee", "#178add"],
            showlegend: false,
            margin: {
                l: 10,
                r: 10,
                b: 10,
                t: 30,
                pad: 1,
            },
            height: 300,
            width: 300,
            font: {
                color: "#6b6f8a",
            }
        };

        Plotly.newPlot("pieChart", pieChartData, pieChartLayout);

        // Sort categories by frequency (descending order)
        topFiveCategories.sort((a, b) => b[1] - a[1]);

        // Horizontal Bar Chart for Top 5 Categories
        const horizontalBarChartData = [{
            y: topFiveCategories.map(cat => cat[0]),
            x: topFiveCategories.map(cat => cat[1]),
            type: 'bar',
            orientation: 'h',
            marker: {
                color: "#ea335d"
            },
            textposition: 'auto',
            hoverinfo: 'x+y',
            hoverlabel: {
                bgcolor: "#172042",
                font: { color: "#6b6f8a" }
            }
        }];

        const horizontalBarChartLayout = {
            title: 'Top 5 Categories',
            paper_bgcolor: "#172042",
            plot_bgcolor: "#172042",
            font: {
                color: "#6b6f8a"
            },
            xaxis: {
                title: {
                    text: 'Number of Reviews',
                    standoff: 20
                },
                automargin: true,  // This helps manage space for the axis title
                tickfont: {
                    color: "#6b6f8a"
                },
                color: "#6b6f8a"
            },
            yaxis: {
                autorange: 'reversed',
                color: "#6b6f8a"
            },
            margin: {
                l: 150,
                r: 30,
                b: 30,
                t: 30,
                pad: 4
            },
            height: 400,
            bargap: 0.3,
            showlegend: false
        };

        Plotly.newPlot("horizontalBarChart", horizontalBarChartData, horizontalBarChartLayout, config);

        const donutChartData = [{
            values: topFiveCategories.map(cat => cat[1]),
            labels: topFiveCategories.map(cat => cat[0]),
            type: 'pie',
            hole: 0.4,
            marker: {
                colors: ['#ea335d', '#03dcee', '#178add', '#40b14e', '#f39c12']
            },
            textinfo: 'percent',
            insidetextorientation: 'radial',
            hoverinfo: 'label+value',
            hoverlabel: {
                bgcolor: "#172042",
                font: { color: "#6b6f8a" }
            }
        }];

        const donutChartLayout = {
            title: 'Top 5 Categories Distribution',
            paper_bgcolor: "#172042",
            plot_bgcolor: "#172042",
            font: {
                color: "#6b6f8a"
            },
            legend: {
                orientation: 'h',
                xanchor: 'center',
                y: -0.1,
                x: 0.5
            },
            margin: {
                l: 30,
                r: 30,
                b: 30,
                t: 40,
                pad: 4
            },
            height: 400,
            showlegend: true
        };

        Plotly.newPlot("donutChart", donutChartData, donutChartLayout, config);
    }
});