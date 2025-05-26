import { ReactQuestionFactory } from "survey-react-ui";
import { Serializer } from "survey-core";
import CustomDatePicker from "./CustomControls/CustomDatePicker";

// Register the custom question type
Serializer.addClass(
  "customdate",
  [
    { name: "title:text", category: "general" },
    { name: "customDate:text", category: "general" }
  ],
  function () {
    return {};
  },
  "question"
);

// Register the React component
ReactQuestionFactory.Instance.registerQuestion("customdate", (props) => {
  return (
    <CustomDatePicker
      value={props.question.value}
      onChange={(val) => (props.question.value = val)}
    />
  );
});


const creator = new SurveyCreator({
  showLogicTab: true,
  isAutoSave: true,
  questionTypes: ["customdate"], // optional
});

creator.toolbox.addItem({
  name: "customdate",
  title: "Custom Date",
  iconName: "icon-date",
  json: {
    type: "customdate",
    name: "customDateQuestion",
    title: "Pick a date",
  },
});
