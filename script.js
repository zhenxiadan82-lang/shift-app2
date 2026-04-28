const calendar = document.getElementById("calendar");
 
const submitButton = document.querySelector(".submit-btn");
 
const monthTitle = document.getElementById("month-title");
 
const prevMonthBtn = document.getElementById("prev-month");
 
const nextMonthBtn = document.getElementById("next-month");
 
const nameInput = document.getElementById("name-input");
 
let year = 2026;
let month = 4;
 
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
 
function renderCalendar() {
 
  calendar.innerHTML = "";
 
  monthTitle.textContent = `${year}年 ${month}月`;
 
  const daysInMonth = new Date(year, month, 0).getDate();
 
  for (let i = 1; i <= daysInMonth; i++) {
 
    const date = new Date(year, month - 1, i);
 
    const dayOfWeek = weekdays[date.getDay()];
 
    const day = document.createElement("div");
 
    day.classList.add("day");
 
    day.innerHTML = `
      <h2>${month}/${i} (${dayOfWeek})</h2>
 
      <button class="shift-btn" data-date="${month}/${i}" data-time="前半">
        前半 18:00〜22:00
      </button>
 
      <button class="shift-btn" data-date="${month}/${i}" data-time="後半">
        後半 22:00〜03:00
      </button>
    `;
 
    calendar.appendChild(day);
  }
 
  const buttons = document.querySelectorAll(".shift-btn");
 
  buttons.forEach(button => {
 
    button.addEventListener("click", () => {
 
      button.classList.toggle("active");
 
    });
 
  });
 
}
 
renderCalendar();
 
prevMonthBtn.addEventListener("click", () => {
 
  month--;
 
  if (month < 1) {
 
    month = 12;
    year--;
 
  }
 
  renderCalendar();
 
});
 
nextMonthBtn.addEventListener("click", () => {
 
  month++;
 
  if (month > 12) {
 
    month = 1;
    year++;
 
  }
 
  renderCalendar();
 
});
 
submitButton.addEventListener("click", () => {
 
  const name = nameInput.value.trim();
 
  if (!name) {
 
    alert("名前を入力してください");
 
    return;
 
  }
 
  const activeButtons = document.querySelectorAll(".active");
 
  const shifts = [];
 
  activeButtons.forEach(button => {
 
    shifts.push({
      date: button.dataset.date,
      time: button.dataset.time
    });
 
  });
 
  let allData = JSON.parse(localStorage.getItem("shiftData")) || [];
 
  const existingIndex = allData.findIndex(data => data.name === name);
 
  const newData = {
    name: name,
    shifts: shifts
  };
 
  if (existingIndex !== -1) {
 
    allData[existingIndex] = newData;
 
  } else {
 
    allData.push(newData);
 
  }
 
  localStorage.setItem("shiftData", JSON.stringify(allData));
 
  alert("提出しました！");
 
});
 