import lifecycle from "page-lifecycle";

const setMidnightWatch = (updateForNewDay: CallableFunction) => {
  // Need to use browser lifecycle to check for new day because setTimeout isn't reliable
  lifecycle.addEventListener("statechange", () => {
    console.log("Checking for new day");
    updateForNewDay();
    setMidnightTimer(updateForNewDay.bind(this));
  });
};

let midnightTimeout: number;
const setMidnightTimer = (f: CallableFunction) => {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const timeToNext = next.getTime() - now.getTime();
  clearTimeout(midnightTimeout);
  midnightTimeout = setTimeout(() => {
    f();
    setMidnightTimer(f);
  }, timeToNext);
};

export { setMidnightWatch };
