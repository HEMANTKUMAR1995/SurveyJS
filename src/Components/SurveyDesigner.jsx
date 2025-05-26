import React, { useEffect, useState } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { Action, Serializer } from "survey-core"; // <-- Import Action
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";

// Import the custom question (this must execute the registration logic)
import "./CustomControls/config/registerCustomWidget";

const SurveyDesigner = () => {
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const creatorInstance = new SurveyCreator({
            showLogicTab: true,
            isAutoSave: true,
        });

        creatorInstance.JSON = {
            title: "Custom Survey Designer CAQH",
            pages: [
                {
                    name: "page1",
                    title: "Custom page 1",
                    elements: []
                }
            ]
        };

        // Return an empty array to hide all action buttons (duplicate, required, delete, etc.)
      creatorInstance.questionActions = (model, options) => {
  return options.actions.filter(action => !["duplicate", "required", "delete"].includes(action.id));
};
        // creatorInstance.showPagesInToolbox = false;
        // creatorInstance.allowModifyPages = false;

        // Set the active page explicitly
        // creatorInstance.survey.currentPage = creatorInstance.survey.pages[0];

        // Add only your custom controls
        creatorInstance.toolbox.clearItems();

        // Add the custom question to the toolbox
        // creatorInstance.toolbox.addItem({
        //     name: "customdate",
        //     title: "Custom Date Control",
        //     iconName: "icon-edit",
        //     json: {
        //         type: "customdate",
        //         name: `customDateQuestion`,
        //         title: "Pick a date",
        //     },
        // });
        // creatorInstance.toolbox.addItem({
        //     name: "custominputcontrol",
        //     title: "Custom Text Input",
        //     iconName: "icon-edit",
        //     json: {
        //         type: "custominputcontrol",
        //         name: `customTextQuestion`,
        //         title: "Enter some text",
        //     },
        // });
        // creatorInstance.toolbox.addItem({
        //     name: "customageinput",
        //     title: "Age Input",
        //     iconName: "icon-edit",
        //     json: {
        //         type: "customageinput",
        //         name: `customAgeInput`,
        //         title: "Enter your age",
        //         inputType: "number",
        //     },
        // });


        // Form all the out of the box controls display only those needed
        // creatorInstance.toolbox.items.forEach(item => {
        //     console.log("Toolbox item name:", item.name);
        //     console.log("Default properties:", item.json);
        // });

        Serializer.addProperty("text", {
            name: "dbMapping",
            category: "general",
            showMode: "advanced",
            choices: [
                { value: "firstName", text: "First Name" },
                { value: "lastName", text: "Last Name" },
                { value: "email", text: "Email" }
            ],
            type: "dropdown",
            default: "",
            visibleIndex: 100
        });


        creatorInstance.toolbox.addItem({
            name: "file",
            title: "File Upload",
            iconName: "icon-file",
            json: { type: "file", name: `file${Date.now()}` }
        });
        creatorInstance.toolbox.addItem({
            name: "text",
            title: "Text Input",
            iconName: "icon-edit",
            json: { type: "text", name: `text${Date.now()}` }
        });
        creatorInstance.toolbox.addItem({
            name: "dropdown",
            title: "Dropdown",
            iconName: "icon-dropdown",
            json: { type: "dropdown", name: `dropdown${Date.now()}` }
        });

        // Add a custom "Continue" button to the toolbar using Action
        // const saveJsonAction = new Action({
        //     id: "save-json",
        //     title: "Continue",
        //     visible: true,
        //     showTitle: true,
        //     action: () => {
        //         const surveyJson = creatorInstance.JSON;
        //         const jsonStr = JSON.stringify(surveyJson, null, 2);
        //         const blob = new Blob([jsonStr], { type: "application/json" });
        //         const url = URL.createObjectURL(blob);
        //         const a = document.createElement("a");
        //         a.href = url;
        //         a.download = "survey.json";
        //         document.body.appendChild(a);
        //         a.click();
        //         document.body.removeChild(a);
        //         URL.revokeObjectURL(url);
        //     }
        // });
        // creatorInstance.toolbar.actions.push(saveJsonAction);

        // In your SurveyDesigner.jsx, inside the saveJsonAction:
        const saveJsonAction = new Action({
            id: "save-json",
            title: "Continue",
            visible: true,
            showTitle: true,
            action: () => {
                const surveyJson = creatorInstance.JSON;
                fetch("http://localhost:4000/api/survey", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(surveyJson)
                })
                    .then(res => res.json())
                    .then(data => {
                        alert("Survey JSON sent to backend!");
                    })
                    .catch(err => {
                        alert("Failed to send JSON: " + err.message);
                    });
            }
        });

        creatorInstance.toolbar.actions.push(saveJsonAction);

        // list of all the controls in the toolbox
        creatorInstance.toolbox.items.forEach(item => {
            console.log("Toolbox item name:", item.name);
            console.log("Default properties:", item.json);
        });

        setCreator(creatorInstance);
    }, []);

    if (!creator) return <div>Loading Survey Creator...</div>;

    return (
        <div style={{ height: "100vh" }}>
            <SurveyCreatorComponent creator={creator} />
        </div>
    );
};

export default SurveyDesigner;