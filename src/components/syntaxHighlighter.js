import { useState } from "react";
import Loading from "./loading";

import { CopyBlock, dracula } from "react-code-blocks";

import { useFetch } from "../hooks/hooks";
import { SUPPORTED_LANGUAGES } from "../utils/constants";

const SyntaxHighlight = (props) => {
  const [file_url] = useState(props.file.raw_url);
  const [resp, loading] = useFetch(
    file_url,
    props.skip || false,
    `This gist's files has been skipped for performance reasons.
 Press ⚓Load Files to fetch the file content.`
  );
  const language = (props.file.language || "").toLowerCase();
  const supported = SUPPORTED_LANGUAGES.includes(language);
  const codeText = resp || "";

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={"syntax_highlighter"}>
            <CopyBlock
              text={codeText}
              language={supported ? language : "c"}
              theme={dracula}
            />
          </div>
          <p className={"filename"}>{props.file.filename}</p>
        </>
      )}
    </>
  );
};

export default SyntaxHighlight;
