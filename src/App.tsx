import React, { useState } from "react";

import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

import TagInput from "./components/TagsInput/TagsInput";
import { tagsDummyData } from "./components/TagsInput/tagsDummyData";

import Select from "./components/Select/Select";
import selectDummyData from "./components/Select/selectDummyData";

import Dialog from "./components/Dialog/Dialog";

import Toast from "./components/Toast/Toast";

const App = () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <>
      <TagInput
        tags={tags}
        tagsSuggestions={tagsDummyData}
        onTagAdd={(tag) => setTags([...tags, tag])}
        onTagRemove={(tagToRemove) =>
          setTags(tags.filter((tag) => tag !== tagToRemove))
        }
        // containerBorderColor="blue"
        // containerBorderWidth="3px"
        // componentSize="large"
        // tagsSuggestionsBorderColor="green"
        // tagsSuggestionsBorderWidth="2px"
        // backgroundColor="yellow"
        // placeholder="Hello"
        // tagsFontColor="purple"
        // errorBorderColor="red"
        // isDisabled={true}
        // tagsSuggestionsContainerPosition="top"
      />

      <Select
        selectOptions={selectDummyData}
        shouldCloseOnClear={false}
        // placeholder="Hi there!"
        // containerBorderColor="green"
        // containerBorderWidth="3px"
        // componentSize="large"
        // backgroundColor="pink"
        // isDisabled={true}
        // errorBorderColor="red"
        // iconColor="blue"
        // customIcon="circle-chevron-down"
      />

      <Dialog
        onAction={() => console.log("Action taken")}
        onCancel={() => console.log("Action cancelled")}
        dialogHeader="Delete user"
        dialogBody="Are you sure?"
        buttonText="Delete user!"
        actionButtonText="Delete"
        cancelButtonText="Cancel"
        buttonProps={{
          // border: "4px solid blue",
          fontFamily: "Red Hat Display",
          // backgroundColor: "pink",
          // padding: "15px",
        }}
        // actionButtonColor="red"
        // cancelButtonColor="blue"
        // overlayColor="pink"
        // dialogPosition="right-bottom"
        blockScroll={true}
        closeOnEsc={true}
        closeOnOverlayClick={true}
      />

      <Toast
        buttonText="Show toast"
        toastHeader="Example toast header"
        toastDescription="Example toast description"
        buttonProps={{ fontFamily: "Red Hat Display" }}
        // toastTimeout={1000}
        // toastBacgroundColor="blue"
        // toastFontColor="pink"
        // toastIcon="circle-chevron-down"
        // typeOfToast="warning"
        // toastPosition="top-right"
        // size="large"
        // boxShadow={true}
        // animationType="grow"
      />
    </>
  );
};

export default App;
