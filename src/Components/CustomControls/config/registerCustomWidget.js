import { Serializer } from "survey-core";
import { ReactQuestionFactory } from "survey-react-ui";
import { CustomDateQuestionModel,CustomInputQuestionModel } from "./CustomDateQuestionModel";
import CustomDatePicker from "../CustomDatePicker";
import CustomTextInput from "../CustomTextInput";

Serializer.addClass(
  "customdate",
  [
     { name: "name:text", category: "general" },
    { name: "title:text", category: "general" },
    // { name: "customDate:text", category: "general" }
  ],
  () => new CustomDateQuestionModel("customdate"),
  "question"
);

// Register custom input control 
Serializer.addClass(
    "custominputcontrol",
    [
       { name: "name:text", category: "general" },
        { name: "title:text", category: "general" },
    ],
    () => new CustomInputQuestionModel("custominputcontrol"),
)

// Register custom input control to handle age question
Serializer.addClass(
  "customageinput",
  [
    { name: "name:text", category: "general" },
    { name: "title:text", category: "general" },
    { name: "inputType:text", default: "number", category: "general" }, // default to number
  ],
  () => new CustomInputQuestionModel("customageinput"),
  "question"
);

ReactQuestionFactory.Instance.registerQuestion("customageinput", (props) => {
  return (
    <CustomTextInput
      value={props.question.value}
      onChange={(val) => (props.question.value = val)}
      question={props.question}
    />
  );
});
ReactQuestionFactory.Instance.registerQuestion("customdate", (props) => {
  return (
    <CustomDatePicker
      value={props.question.value}
      onChange={(val) => (props.question.value = val)}
    />
  );
});
ReactQuestionFactory.Instance.registerQuestion("custominputcontrol", (props) => {
  return (
 <CustomTextInput
      value={props.question.value}
      onChange={(val) => (props.question.value = val)}
      question={props.question}
    />
  );
});

