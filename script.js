let container = document.querySelector('.container');
let dateInput = container.querySelector('.date-input .date-input-field');
let monthInput = container.querySelector('.date-input .month-input-field');
let yearInput = container.querySelector('.date-input .year-input-field');
let submitBtn = container.querySelector('.date-input .submit-btn');
let otherResultsBox = container.querySelector('.other-results');

let result = () => {
    let d1 = parseInt(dateInput.value);
    let m1 = parseInt(monthInput.value);
    let y1 = parseInt(yearInput.value);

    console.log(`Input values - Date: ${d1}, Month: ${m1}, Year: ${y1}`);

    if (isNaN(d1) || isNaN(m1) || isNaN(y1)) {
        console.error("Invalid input values");
        return;
    }

    let date = new Date();
    let d2 = date.getDate();
    let m2 = date.getMonth() + 1; // getMonth() is zero-based
    let y2 = date.getFullYear();

    let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (d1 > d2) {
        d2 = d2 + month[m2 - 1];
        m2 = m2 - 1;
    }
    if (m1 > m2) {
        m2 = m2 + 12;
        y2 = y2 - 1;
    }
    let d = d2 - d1;
    let m = m2 - m1;
    let y = y2 - y1;

    console.log(`Calculated values - Days: ${d}, Months: ${m}, Years: ${y}`);

    container.querySelector('.result .result-days div').innerHTML = d;
    container.querySelector('.result .result-months div').innerHTML = m;
    container.querySelector('.result .result-years div').innerHTML = y;

    getOtherResults();
}

let getOtherResults = () => {
    let day = parseInt(dateInput.value);
    let month = parseInt(monthInput.value) - 1; // Months are zero-based
    let year = parseInt(yearInput.value);

    const birthday = new Date(year, month, day).getTime();
    const comparisonTimeStamp = new Date().getTime();
    const difference = comparisonTimeStamp - birthday;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.4375); // Approximate month length
    const years = Math.floor(days / 365.25); // Considering leap years

    console.log(`Other results - Seconds: ${seconds}, Minutes: ${minutes}, Hours: ${hours}, Days: ${days}, Weeks: ${weeks}, Months: ${months}, Years: ${years}`);

    let li = `
        <table>
            <tr>
                <td>Months old</td>
                <td>${months.toLocaleString("en-US")}</td>
            </tr>
            <tr>
                <td>Weeks old</td>
                <td>${weeks.toLocaleString("en-US")}</td>
            </tr>
            <tr>
                <td>Days old</td>
                <td>${days.toLocaleString("en-US")}</td>
            </tr>
            <tr>
                <td>Hours old (approx)</td>
                <td>${hours.toLocaleString("en-US")}</td>
            </tr>
            <tr>
                <td>Minutes old (approx)</td>
                <td>${minutes.toLocaleString("en-US")}</td>
            </tr>
            <tr>
                <td>Seconds old (approx)</td>
                <td>${seconds.toLocaleString("en-US")}</td>
            </tr>
        </table>
    `;
    otherResultsBox.innerHTML = li;
}

submitBtn.addEventListener('click', () => {
    if (dateInput.value != '' && monthInput.value != '' && yearInput.value != '') {
        result();
    } else {
        console.error("One or more input fields are empty");
    }
});
