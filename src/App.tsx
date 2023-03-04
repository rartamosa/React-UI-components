import { useState } from "react";

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
      />

      {/* SELECT */}
      <Select selectOptions={selectDummyData} shouldCloseOnClear={false} />

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
        actionButtonText="Delete"
        cancelButtonText="Cancel"
        buttonProps={{
          fontFamily: "Red Hat Display",
        }}
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
          })
        }
      >
        Generate toast
      </Button>
      <Toast toastList={toastList} onToastRemove={onToastRemove} />

      {/* ACCORDION */}
      <Accordion accordionBody={accordionDummyData} />

      {/* TABLE */}
      <Table columnNames={dummyColumnNames} tableRows={dummyTableRows} />
    </>
  );
};

export default App;
