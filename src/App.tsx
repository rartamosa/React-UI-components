import React, { useState, useEffect } from "react";

import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

// TAGS INPUT
import TagInput from "./components/TagsInput/TagsInput";
import { tagsDummyData } from "./components/TagsInput/tagsDummyData";

// SELECT
import Select from "./components/Select/Select";
import selectDummyData from "./components/Select/selectDummyData";

// DIALOG
import Dialog from "./components/Dialog/Dialog";

// TOAST
import { Button } from "./components/Basic Components/Buttons";
import Toast from "./components/Toast/Toast";
import useToast from "./components/Toast/useToast";
import ToastContainer from "./components/Toast/ToastContainer";

const App = () => {
  const [tags, setTags] = useState<string[]>([]);

  const [toastList, onToastAdd, onToastRemove] = useToast(3000);

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

      {/* TOAST */}
      <Button
        buttonProps={{ fontFamily: "Red Hat Display" }}
        onClick={() =>
          onToastAdd({
            toastHeader: "Example toast header",
            // typeOfToast: "warning",
            toastDescription: "Example toast description",
            // size: "small",
            // boxShadow: true,
            // toastIcon: "circle-chevron-down",
            // toastBacgroundColor: "pink",
            // toastFontColor: "black",
          })
        }
      >
        Generate toast
      </Button>
      <ToastContainer toastsPosition="top-left">
        <Toast
          toastList={toastList}
          animationType="grow"
          onToastRemove={onToastRemove}
        />
      </ToastContainer>
    </>
  );
};

export default App;
