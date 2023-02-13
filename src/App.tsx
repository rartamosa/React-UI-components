import React, { useState } from "react";
// @ts-ignore
import uniqid from "uniqid";

import { faSun } from "@fortawesome/free-solid-svg-icons";

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

// ACCORDION
import Accordion from "./components/Accordion/Accordion";
import accordionDummyData from "./components/Accordion/AccordionDummyData";

// TABLE
import Table from "./components/Table/Table";
import { TableRequiredData } from "./components/Table/TableProps";
import {
  dummyColumnNames,
  dummyTableRows,
} from "./components/Table/tableDummyData";

const App = () => {
  //  TAGS INPUT
  const [tags, setTags] = useState<string[]>([]);

  // DIALOG
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // TOAST
  const [toastList, onToastAdd, onToastRemove] = useToast(3000);

  // DIALOG
  const onActionLogic = (): void => {
    console.log("Action taken");
    setIsDialogOpen(false);
  };

  const onCancelLogic = (): void => {
    console.log("Action cancelled");
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* TAGS INPUT */}
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

      {/* SELECT */}
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
        // customIcon="sun"
      />

      {/* DIALOG */}
      <Button
        buttonProps={{ fontFamily: "Red Hat Display" }}
        onClick={() => setIsDialogOpen(true)}
      >
        Delete user
      </Button>
      <Dialog
        onAction={onActionLogic}
        onCancel={onCancelLogic}
        isDialogOpen={isDialogOpen}
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
            // typeOfToast: "error",
            // toastDescription: "Example toast description",
            // size: "large",
            // boxShadow: true,
            // toastIcon: "sun",
            // toastBacgroundColor: "pink",
            // toastFontColor: "black",
          })
        }
      >
        Generate toast
      </Button>
      <Toast // TODO animacja na odmountowanie komponentu
        toastList={toastList}
        animationType="slide"
        onToastRemove={onToastRemove}
        // toastsPosition="top-left"
      />

      {/* ACCORDION */}
      <Accordion // TODO animacja na odmountowanie komponentu
        accordionBody={accordionDummyData}
        // iconColor="red"
        // show="many"
        // customIconClosed="sun"
        // accordionBodyHeight="100px"
        // scroll={false}
        // containerBackgroundColor="red"
        // accordionBackgroundColor="pink"
        // defaultIndex={1} //TODO nie działa dla 0
        // defaultIndexes={[0, 1]}
      />

      {/* TABLE */}
      <Table
        // mainHeader="Example table main header"
        columnNames={dummyColumnNames}
        tableRows={dummyTableRows}
        // headerBackGroundColor="pink"
        // denseRows={true}
        // iconColor="blue"
        // footerIconsColor="orange"
        // borderColor="red"
        // borderWidth="10px"
      />
    </>
  );
};

export default App;
