import React, { useState } from "react";

import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

import TagInput from "./components/TagsInput/TagsInput";
import { tagsDummyData } from "./components/TagsInput/tagsDummyData";

import Select from "./components/Select/Select";
import selectDummyData from "./components/Select/selectDummyData";

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
        // componentSize="large"
        // containerBorderWidth="5px"
      />

      <Select
        selectOptions={selectDummyData}
        // placeholder="Dupa"
        shouldCloseOnClear={false}
        // containerBorderColor="red"
        // containerBorderWidth="5px"
        // componentSize="large"
        // backgroundColor="pink"
        // isDisabled={true}
        // errorBorderColor="red"
        // componentSize="small"
        // optionsContainerPosition="right"
        // iconColor="red"
        // backgroundColor="pink"
        // isDisabled={true}
        // customIcon="circle-chevron-down"
        // errorBorderColor="green"
      />
    </>
  );
};

export default App;
