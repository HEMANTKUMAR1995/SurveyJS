// import { Question } from "survey-core";

// export class CustomDateQuestionModel extends Question {
//   getType() {
//     return "customdate";
//   }

//   // ✅ Avoid recursion by using getPropertyValue
//   getValueCore() {
//     return this.getPropertyValue("value");
//   }

//   // ✅ Avoid recursion by using setPropertyValue
//   setValueCore(newValue) {
//     this.setPropertyValue("value", newValue);
//   }
// }
// export class CustomInputQuestionModel extends Question {
//   getType() {
//     return "custominputcontrol";
//   }

//   // ✅ Avoid recursion by using getPropertyValue
//   getValueCore() {
//     return this.getPropertyValue("value");
//   }

//   // ✅ Avoid recursion by using setPropertyValue
//   setValueCore(newValue) {
//     this.setPropertyValue("value", newValue);
//   }
// }

import { Question } from "survey-core";

export class CustomDateQuestionModel extends Question {
  getType() {
    return "customdate";
  }

  getValueCore() {
    return this.getPropertyValue("value");
  }

  setValueCore(newValue) {
    this.setPropertyValue("value", newValue);
  }
}

export class CustomInputQuestionModel extends Question {
  constructor(name) {
    super(name);
    this.customType = name; // Store the type
  }

  getType() {
    return this.customType || "custominputcontrol";
  }

  getValueCore() {
    return this.getPropertyValue("value");
  }

  setValueCore(newValue) {
    this.setPropertyValue("value", newValue);
  }
}