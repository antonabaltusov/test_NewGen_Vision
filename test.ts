type price = number | null;
type prices = [a: price, b: price];

interface course {
  name: string;
  prices: prices;
}

let courses: course[] = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [150, 200] },
  { name: "Courses in Italy", prices: [null, 200] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1: prices = [null, 200];
let requiredRange2: prices = [100, 350];
let requiredRange3: prices = [200, null];

function filter(courses: course[], options: prices): course[] {
  const a = courses.filter((course) => {
    let a: boolean =
      options[0] && course.prices[1] ? course.prices[1] >= options[0] : true;
    let b: boolean =
      options[1] && course.prices[0] ? course.prices[0] <= options[1] : true;
    return a && b;
  });
  return a;
}
const sortPrices = (a: price, b: price, nullInfinity?: boolean) => {
  if (a) {
    if (b) {
      return a - b;
    } else {
      return nullInfinity ? -1 : 1;
    }
  } else if (b) {
    return nullInfinity ? 1 : -1;
  } else {
    return 0;
  }
};
const sort = (courses: course[], reverse?: boolean): course[] => {
  const sortedCourses = courses.sort(
    (courseA: course, courseB: course): number => {
      const a = sortPrices(courseA.prices[1], courseB.prices[1], true);
      if (a) {
        return a;
      } else {
        return sortPrices(courseA.prices[0], courseB.prices[0]);
      }
    }
  );
  if (reverse) {
    return sortedCourses.reverse();
  } else {
    return sortedCourses;
  }
};
console.log(filter(courses, requiredRange1));
console.log(filter(courses, requiredRange2));
console.log(sort(filter(courses, requiredRange3), true));
