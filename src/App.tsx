import React, { useState } from "react";

import TagInput from "./components/TagsInput/TagsInput";
import { tagsDummyData } from "./components/TagsInput/tagsDummyData";

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
        // containerBorderColor="red"
        // containerBorderWidth="5px"
      />
    </>
  );
};

export default App;
