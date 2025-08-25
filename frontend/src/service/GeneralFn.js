import { format } from "date-fns";

export const ordinal_suffix_of = (i) => {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};

export const calculate_age = (dob) => {
  var today = new Date();
  var birthDate = new Date(dob); // create a date object directly from `dob` argument
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;
};
export const calculate_bmi = (weightLbs, heighttInc) => {
  if (weightLbs != "" && weightLbs != undefined && heighttInc != "" && heighttInc != undefined) {
    const weightKg = weightLbs.replace(" lbs", "") / 2.2046;
    const heightArr = heighttInc.replace("'", "").replace('"', "").split(" ");
    const heightMiter = heightArr[0] / 3.2808 + (heightArr[1] / 12) * 3.2808;
    return Math.round((weightKg / heightMiter) * heightMiter * 10) / 10;
  } else {
    return "--";
  }
};

export const showDate = (dbDate = "", dateFormat = "MM-dd-yyyy") => {
  return dbDate !== "" ? format(new Date(dbDate), dateFormat) : "";
};

export const checkLoginOrNotViewSection = () => {
  const ff_isLogin = localStorage.getItem("ff_isLogin");
  if (ff_isLogin) {
    return true;
  } else {
    return true;
  }
};
export const checkLoginOrNotRedirectUrl = (url = "#") => {
  const ff_isLogin = localStorage.getItem("ff_isLogin");
  if (ff_isLogin) {
    return url;
  } else {
    return url;
    // return '/login';
  }
};
